import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import Income from "../Models/income.model.js";
import Expense from "../Models/expense.model.js";
import generateTokenAndSendCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
    try {
        const { username, fullname, password, confirm_password, platform = 'web' } = req.body;

        if (!username, !fullname, !password, !confirm_password) {
            return res.status(400).json({ error: "Please provide in all fields." });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ error: "Confirm password does not match." });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, fullname, password: hashPassword });

        if (newUser) {
            const token = generateTokenAndSendCookie(newUser._id, res, platform);
            await newUser.save();
            if (platform === 'web') {
                res.status(201).json({
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username
                });
            }
            res.status(201).json({
                token,
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username
                }
            });
        }
    } catch (error) {
        console.log(`Error in signup: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password, platform = 'web' } = req.body;

        const user = await User.findOne({ username });

        if (!username || !password) {
            return res.status(400).json({ error: "Please provide in all fields." });
        }

        if (!user) {
            return res.status(400).json({ error: "User not found, do you want to signup?" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(400).json({ error: "Incorrect Password." });
        }

        if (isCorrectPassword) {
            const token = generateTokenAndSendCookie(user._id, res, platform);
            if (platform === 'web') {
                res.status(200).json({
                    _id: user._id,
                    fullname: user.fullname,
                    username: user.username
                });
            }
            res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    username: user.username
                }
            });
        }

    } catch (error) {
        console.log(`Error in login: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const authUser = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id).select("-password");
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(401).json({ error: "Unauthorized" });
    } catch (error) {
        console.log(`Error in authUser: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout success" });
    } catch (error) {
        console.log(`Error in logout: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id).select("-password");
        const { fullname, username } = req.body;

        if (!fullname || !username) {
            return res.status(400).json({ error: "Please provide in all fields." });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

        user.fullname = fullname;
        user.username = username;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log(`Error in update user: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id);
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "Please provide in all fields." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Confirm password does not match." });
        }

        const isCorrectPassword = await bcrypt.compare(currentPassword, user.password);

        if (!isCorrectPassword) {
            return res.status(400).json({ error: "Incorrect Password." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashPassword;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log(`Error in change password: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id);
        await Income.deleteMany({ userId: user._id });
        await Expense.deleteMany({ userId: user._id });
        await User.findByIdAndDelete(user._id);
        res.clearCookie("token");
        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.log(`Error in delete user: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const checkPassword = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id);
        const { password } = req.body;
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (isCorrectPassword) {
            return res.status(200).json({ message: "Password is correct" });
        }
        return res.status(400).json({ error: "Incorrect Password." });
    } catch (error) {
        console.log(`Error in check password: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export { signup, login, authUser, logout, updateUser, changePassword, deleteUser, checkPassword };
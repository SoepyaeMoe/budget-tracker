import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import generateTokenAndSendCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
    try {
        const { username, fullname, password, confirm_password } = req.body;

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
            generateTokenAndSendCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username
            });
        }
    } catch (error) {
        console.log(`Error in signup: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

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
            generateTokenAndSendCookie(user._id, res);
            res.status(200).json({
                _id: user._id,
                fullname: user.fullname,
                username: user.username
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

export { signup, login, authUser, logout };
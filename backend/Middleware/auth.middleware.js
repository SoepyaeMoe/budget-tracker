import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token." });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(`Error in auth middleware: ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export default authMiddleware;
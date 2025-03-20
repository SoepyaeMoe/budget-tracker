import jwt from 'jsonwebtoken';

const generateTokenAndSendCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        expiresIn: 15 * 24 * 60 * 60 * 100 //15 days in millisecond
    });
}

export default generateTokenAndSendCookie;
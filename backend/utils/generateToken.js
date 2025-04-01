import jwt from 'jsonwebtoken';

const generateTokenAndSendCookie = (userId, res, platform) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    if (platform === 'web') {
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict',
            expiresIn: 15 * 24 * 60 * 60 * 100 //15 days in millisecond
        });
    }

    return token;
}

export default generateTokenAndSendCookie;
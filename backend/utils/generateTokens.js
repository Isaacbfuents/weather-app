import jwt from 'jsonwebtoken';
import 'dotenv/config';

import saveRefreshToken from './saveRefreshToken.js';

function generateAccessToken(user) {
    const accessToken = jwt.sign({sub: user.sub}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return(accessToken);
}

function generateRefreshToken(user, ipAddress, userAgent) {
    const refreshToken = jwt.sign({sub: user.sub}, process.env.REFRESH_TOKEN_SECRET);
    saveRefreshToken(refreshToken, user._id, user.sub, ipAddress, userAgent);
    return(refreshToken);
}


export {
    generateAccessToken, 
    generateRefreshToken
}
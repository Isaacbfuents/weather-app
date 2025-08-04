import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';
import RefreshToken from '../models/RefreshToken.js';

async function handleSession(req, res) {
    const auth0User = req.oidc.user;

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
        let user = await User.findOne({sub: auth0User.sub});
        let isNew = false;
        if(!user) {
            // Create user
            user = new User({
                email: auth0User.email,
                name: auth0User.name,
                picture: auth0User.picture,
                emailVerified: auth0User.email_verified,
                sub: auth0User.sub
            })
            await user.save();
            isNew = true;
        } else {
            // User exists
            user.name = auth0User.name;
            user.picture = auth0User.picture;
            user.emailVerified = auth0User.email_verified;
            await user.save();
        }
        
        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user, ipAddress, userAgent);
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // false solo para dev, en produccion true.
            sameSite: 'None',
            path: '/api/auth',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(200).json({message: isNew ? 'User created correctly.' : 'User updated correctly.', user, accessToken});

        

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Server error."})
    }
}

async function refreshAccessToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decoded.sub)
        console.log('Refresh token obtenido x la cookie y que busca al de la db: ', refreshToken)
        const token = await RefreshToken.findOne({ refreshToken, sub: decoded.sub });
        console.log(token)
    } catch (error) {
        console.log('Error validating the refresh token.', error)
    }
}

export {
    handleSession,
    refreshAccessToken
}
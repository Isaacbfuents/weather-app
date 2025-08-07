import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";


async function handleAuthCallback(req, res, session) {
    const auth0User = req.oidc.user;
    console.log(session)
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';
    console.log(auth0User);
    console.log(ipAddress);
    console.log(userAgent);
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

        // res.status(200).json({message: isNew ? 'User created correctly.' : 'User updated correctly.', user, accessToken});

        res.redirect("http://localhost:5173/home");
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Server error."})
    }
}


export default handleAuthCallback;
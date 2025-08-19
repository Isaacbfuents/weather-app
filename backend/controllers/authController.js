import 'dotenv/config';
import User from '../models/User.js';

async function handleSession(req, res) {
    // Get payload de access token
    const authInfo = req.auth.payload;
    const userInfo = {
        sub: authInfo.sub,
        name: authInfo['https://nimbustime.com/name'] || '',
        email: authInfo['https://nimbustime.com/email'] || '',
        emailVerified: authInfo['https://nimbustime.com/email_verified'] || '',
        picture: authInfo['https://nimbustime.com/picture'] || ''
    }
    
    try {
        const user = await User.findOneAndUpdate(
            { sub: userInfo.sub},
            userInfo,
            { new: true, upsert: true}
            );

        return res.status(200).json({
            name: user.name,
            picture: user.picture
        });

    } catch (error) {
        console.log('Error handling user session', error);
        return res.status(500).json({ message: 'Server erorr.'})
    }
    
    
}


export {
    handleSession,
}
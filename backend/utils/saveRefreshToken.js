import RefreshToken from "../models/RefreshToken.js";


async function saveRefreshToken(token, userId, userSub, ipAddress, userAgent) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    try { 
        // Save the refresh token in the db
        console.log('Refresh token que se guardo en la db: ', token);
        const refreshToken = new RefreshToken({refreshToken: token, user: userId, sub: userSub, expiresAt, ipAddress, userAgent});
        await refreshToken.save();
        console.log('Refresh token saved correctly.')
    } catch (error) {
        console.log('An error has occur when saving the refresh token in the server.', error);
    }
}

export default saveRefreshToken;
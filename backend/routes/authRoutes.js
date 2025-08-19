import express from 'express';
import { handleSession } from '../controllers/authController.js';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'; 

const router = express.Router();


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: 'http://api.nimbustime',
    issuerBaseURL: 'https://dev-f5eb02fg8yfg3a3y.us.auth0.com/',
});


// handleSession after login or register
router.post('/session', checkJwt, handleSession);






router.get('/profile', (req, res) => {
    console.log(req.oidc.user);
    res.send(JSON.stringify(req.oidc.user));
});


export default router;
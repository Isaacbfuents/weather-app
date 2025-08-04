import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import { handleSession, refreshAccessToken } from '../controllers/authController.js';

const router = express.Router();

// handleSession after login or register
router.get('/session', requiresAuth(), handleSession);

// Refresh the access token
router.post('/refresh', refreshAccessToken)

router.get('/profile', requiresAuth(), (req, res) => {
    console.log(req.oidc.user);
    res.send(JSON.stringify(req.oidc.user));
});


export default router;
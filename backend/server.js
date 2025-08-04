import express, { json } from 'express';
import connectDB from './config/db.js';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;
import { handleAutocomplete, getWeather } from './utils.js';
import authRoutes from './routes/authRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js'
import handleAuthCallback from './controllers/authCallback.js';
import { handleSession } from './controllers/authController.js';
const app = express();

// Auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN
}

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Can read json files
app.use(express.json());

// Configuracion de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

connectDB();


app.use('/api/auth', authRoutes);

app.use('/api/weather', weatherRoutes);

app.get('/api/autocomplete', handleAutocomplete);

app.get('/api/weather', getWeather);




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
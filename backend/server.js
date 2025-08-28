import express, { json } from 'express';
import connectDB from './config/db.js';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'; 


import { handleAutocomplete, getWeather, getPlaceCoordinates } from './utils.js';
import authRoutes from './routes/authRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js'


const app = express();

// Can read json files
app.use(express.json());

// Configuracion de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());

connectDB();



// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://api.nimbustime',
  issuerBaseURL: 'https://dev-f5eb02fg8yfg3a3y.us.auth0.com/',
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = requiredScopes('read:messages');

    app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
      res.json({
message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
      });
    });



app.use('/auth', authRoutes);

app.use('/weather', weatherRoutes);

app.get('/autocomplete',checkJwt, handleAutocomplete);

app.get('/coordinates', getPlaceCoordinates)
// app.get('/api/weather', getWeather);




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
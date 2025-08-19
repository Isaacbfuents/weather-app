import express from 'express';
import { getWeather } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/current', getWeather);


export default router;
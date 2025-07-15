import express, { json } from 'express';
import 'dotenv/config';
import { getGeo, getWeather } from './utils.js';

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get('/weather', getGeo, getWeather);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
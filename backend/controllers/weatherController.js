import 'dotenv/config';

async function getWeather (req, res) {
    const { lat, lon } = req.query;
    
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;

    try {
        const response = await fetch(url)
        const weatherData = await response.json();

        res.status(200).json(weatherData)
    } catch (error) {
        console.log(error);
    }
}

export {
    getWeather
}
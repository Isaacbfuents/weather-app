import 'dotenv/config';

// Get the coordenates
function getGeo(req, res, next) {
    try {
        const cityName = req.query.city;
        const countryCode = req.query.country;
      
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${process.env.API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                req.weatherInfo = data;
                next();
            })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Get the weather through the coordinates
function getWeather(req, res) {

    try {
        const weatherInfo = req.weatherInfo;
        const latitud = weatherInfo[0].lat;
        const longitud = weatherInfo[0].lon;
    
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${process.env.API_KEY}` 

        fetch(url)
            .then(response => response.json())
            .then(weather => res.send(weather))
    } catch (error) {
        console.log(error)
    }
    

    
}
export {
    getGeo, 
    getWeather
}
import 'dotenv/config';
import User from './models/User.js';

// Autocomplete function
async function handleAutocomplete(req, res) {
    const sub = req.auth.payload.sub;
    
    // Make sure a user exists with that sub
    const userExists = await User.findOne({ sub })
    
    if(!userExists) {
        return res.status(403).json({ 
            error: "User not registered",
            message: "You need to create an account before using this feature." 
        })
    }
    // If user exists
    const query = req.query.q;
    
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${process.env.MAPBOX_TOKEN}`;

    try {
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const features = data.features;
                res.send(features);
            })
    } catch (error) {
        console.log(error)
    }

}

// Get the weather through the coordinates
async function getWeather(req, res) {
    const { lat, lon } = req.query;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`

    await fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
}
export {
    handleAutocomplete, 
    getWeather
}
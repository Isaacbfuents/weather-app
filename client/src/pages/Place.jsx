import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { saveLastSearch, getHistory } from '../utils/localStorage.js'

function Place() {
    let { name, id } = useParams();
    
    const { getAccessTokenSilently } = useAuth0();

    const [ weather, setWeather ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get access token
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: 'http://api.nimbustime'
                    },
                })

                const searchHistory = getHistory();
                const locHistory = searchHistory.length > 0 ? searchHistory.find(loc => loc.name === name) : null;

                // If the locInfo doesn't exists in LocalStorage
                if( !locHistory || locHistory.name !== name ) {
                    // Get location info
                    const locInfo = await fetchLocInfo(token);
                    
                    // Format the locInfo
                    const locObj = {
                        name, 
                        lat: locInfo.properties.coordinates.latitude,
                        lon: locInfo.properties.coordinates.longitude
                    }

                    // Get weather
                    await fetchWeather(locObj, token);
                } else {
                    // Get weather
                    await fetchWeather(locHistory, token);
                }

            } catch (error) {
                console.log('Error in Place useEffect:', error)
            }
        }
    
        fetchData();
        
        
    }, [getAccessTokenSilently, name, id])
    
    const fetchLocInfo = async (token) => {
        const url = `http://localhost:3000/autocomplete?q=${id}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return(response.data[0]);
        } catch (error) {
            console.log("Error fetching coordinates:",error);
        }
    }

    const fetchWeather = async (locInfo, token) => {
        const { lon, lat } = locInfo;

        const url = `http://localhost:3000/weather?lat=${lat}&lon=${lon}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setWeather(response.data);
        console.log(response.data);

        // Save location info (name, lat, lon) after fetching weatherApi
        const locObj = {
            name,
            lat: response.data.lat,
            lon: response.data.lon
        }

        saveLastSearch(locObj);
    }

    return (
        <div>
            <p> {name}, {id}</p>
            
        </div>
    )
}

export default Place;
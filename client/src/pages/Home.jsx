import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/LogoutBtn';
import SearchInput from '../components/SearchInput';


function Home() {
    
    const { getAccessTokenSilently } = useAuth0();
    const [ accessToken, setAccessToken] = useState(null);
    const [ locationAllowed, setLocationAllowed ] = useState(null);
    const [ locHistory, setLocHistory] = useState([]);


    // Fetch token when page is rendered
    useEffect( () => { 
        const history = JSON.parse( localStorage.getItem("locationsHistory")) || [];
        setLocHistory(history);
    }, [getAccessTokenSilently])


    const fetchWeather = async (coordinates) => {
        try {
            const { latitude, longitude } = coordinates;
            const url = `http://localhost:3000/weather?lat=${latitude}&lon=${longitude}`
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(response)
        } catch (error) {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                  audience: 'http://api.nimbustime'
                },
            });
            setAccessToken(token);
            console.log(error);
        }
    }

    const handleOnClick = async () => {
        const url = 'http://localhost:3000/auth/session';
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                  audience: 'http://api.nimbustime'
                },
              });
            console.log(accessToken)
    
            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            console.log(response)
        } catch (error) {
           console.log(error) 
        }  
    }

    

    return (
        <div className='flex'>
            
            < SearchInput />
            <button onClick={handleOnClick} className='m-4 p-4'>Fetch api</button>    
            < LogoutButton />     
        </div>
        
    )
}

export default Home;
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function SearchInput() {

    const { getAccessTokenSilently } = useAuth0();
    const [ accessToken, setAccessToken ] = useState(null);
    const debounceTimer = useRef(null);


    useEffect(() => {
        const fetchToken = async () => {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                  audience: 'http://api.nimbustime'
                },
            }); 
            setAccessToken(token);   
        }

        fetchToken();
    }, [getAccessTokenSilently])


    const handleOnInput = async (e) => {
        const inputValue = e.target.value;
        clearTimeout(debounceTimer.current);

        
        debounceTimer.current = setTimeout( async () => {
            if( inputValue.length >= 3 ) {
                try {
                    const url = `http://localhost:3000/autocomplete?q=${inputValue}`;
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log(response.data);
                } catch (error) {
                    if(error.response?.status === 401) {
                        // Token expirado --> pedir nuevo
                        const newToken = await getAccessTokenSilently({
                            authorizationParams: {
                                audience: "http://api.nimbustime",
                            },
                        });
                        setAccessToken(newToken);
                    }
                    console.log(error);
                }
                
            }
        }, 500)
        
    }


    return (
        <div>
            <input placeholder='Search a city...' onInput={handleOnInput}></input>
        </div>
    )
}


export default SearchInput;
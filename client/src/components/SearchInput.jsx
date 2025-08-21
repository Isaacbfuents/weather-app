import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function SearchInput() {

    const { getAccessTokenSilently } = useAuth0();

    const [ accessToken, setAccessToken ] = useState(null);
    const [query, setQuery] = useState("");
    const [ suggestions, setSuggestions] = useState([]);
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ optionSelected, setOptionSelected ] = useState(false);

    const debounceTimer = useRef(null);
    const wrapperRef = useRef(null);
    
    // Get token from auth0 when render
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

    // Fetch api for autocomplete suggestions when query change and optionSelected = false
    useEffect( () => {
        if( !optionSelected ) {
            fetchAutocomplete();
        }
        if(query.trim().length < 3) {
            setSuggestions([])
        }
    }, [query, optionSelected])

    // Close suggestions if user clicks outside the ref
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Function for fetch api
    const fetchAutocomplete = async () => {
        clearTimeout(debounceTimer.current);
        
        debounceTimer.current = setTimeout( async () => {
            if( query.trim().length >= 3 ) {
                try {
                    const url = `http://localhost:3000/autocomplete?q=${query}`;
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    getSuggestions(response.data);
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
                    setSuggestions([]);
                    setShowSuggestions(false);
                    console.log(error);
                }
                
            }
        }, 500)
    }
    
    // Format the search options --> suggestions data
    const getSuggestions = (searchOptions) => {
        if( searchOptions.length > 0 ) {
            let suggestionArray = [];
            searchOptions.forEach((item) => {
                const { name, place_formatted } = item.properties;
                const locationInfo = {
                    locName: name,
                    locFormatted: place_formatted
                }
                suggestionArray.push(locationInfo);
            })
            setSuggestions(suggestionArray);
            setShowSuggestions(true);
        }
    }

    // Handle the location selected
    const handleSelect = (locInfo) => {
        const formatted = `${locInfo.locName}, ${locInfo.locFormatted}`;
        setQuery(formatted);
        setOptionSelected(true);
        setShowSuggestions(false)
    }

    return (
        <div ref={wrapperRef}>
            <input 
            id="searchInput" 
            className='' 
            type='text' 
            autoComplete="off" 
            placeholder='Search a city...' 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onFocus={() => setShowSuggestions(true)}
            ></input>
            { showSuggestions && suggestions.length > 0 && (
            <ul id="suggestions" className="absolute bg-white border-1 border-gray-300 m-0 p-[4px] z-10 rounded-md ">
                { suggestions.map((item, index) => (
                    <div key={index}>
                    <li onClick={() => handleSelect(item)} className="px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"> 
                        <span className="font-medium">{item.locName}</span>
                        <p className="text-sm">{item.locFormatted}</p>
                    </li>

                    {/* Divider si NO es el ultimo item */}
                    { index !== suggestions.length - 1 && (
                        <div className="border-b-1 border-gray-100 my-1"></div>
                    )}


                    </div>
                ))}
            </ul> )}
            
        </div>
    )
}


export default SearchInput;
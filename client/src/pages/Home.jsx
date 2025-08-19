import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/LogoutBtn';
import SearchInput from '../components/SearchInput';

function Home() {
    
    const { getAccessTokenSilently } = useAuth0();

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
        <div>
            
            < SearchInput />
            <button onClick={handleOnClick}>Fetch api</button>    
            < LogoutButton />     
        </div>
        
    )
}

export default Home;
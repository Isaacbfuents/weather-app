import { useState } from 'react'
import axios from 'axios';


function App() {

  function handleGet() {
    axios.get('http://localhost:3000/api/auth/session', {}, { withCredentials: true })

  }
  function handleClick() {
    try {
      axios.post('http://localhost:3000/api/auth/refresh', {}, { withCredentials: true });
      console.log('Peticion correcta, cookies enviadas.')
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div>
      <button onClick={handleGet}>Get cookie</button>
      <button onClick={handleClick}>Send Cookie</button>
    </div>
  )
}

export default App

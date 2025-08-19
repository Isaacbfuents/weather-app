import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-f5eb02fg8yfg3a3y.us.auth0.com"
    clientId="ZHKJBb6BqSqw9rZKmBqxWsfcZDQF7c0P"
    authorizationParams={{
      redirect_uri: 'http://localhost:5173/home',
      audience: 'http://api.nimbustime',
      scope: 'read:current_user update:current_user_metadata'
    }}
    >
      <App />
    </Auth0Provider>,
  </StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Import GoogleOAuthProvider
import { GoogleOAuthProvider } from '@react-oauth/google';  
import App from './App'; 

{/**Client ID and secrect generated in google console */}
const CLIENT_ID = '500919968051-vk45pf1l94rmbmul66q6cvd3ipi1f6p5.apps.googleusercontent.com';  

ReactDOM.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>  
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

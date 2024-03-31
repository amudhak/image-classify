import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
/*import { GoogleOAuthProvider } from '@react-oauth/google';*/

/*var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<GoogleOAuthProvider clientId="your clientID">*/
  <React.StrictMode>
    <App />
  </React.StrictMode>
  /*</GoogleOAuthProvider>*/
);

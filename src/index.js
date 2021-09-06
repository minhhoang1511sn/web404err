import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseProvider from './context/firebase';
import UserProvider from './context/user';
import './index.css'

ReactDOM.render(
  <FirebaseProvider>
    <UserProvider >
      
    <App />
    </UserProvider>
  </FirebaseProvider>  
  
  ,
  document.getElementById('root')
);

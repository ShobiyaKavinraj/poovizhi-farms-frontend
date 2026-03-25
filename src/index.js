// index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals'; 

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <WishlistProvider>
      <CartProvider>
          <App />
        </CartProvider>
        </WishlistProvider>
  </UserProvider>
  </React.StrictMode>
);


reportWebVitals();

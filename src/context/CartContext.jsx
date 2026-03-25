// src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
   const [cartSidebarOpen, setCartSidebarOpen] = useState(false); 

  const token = localStorage.getItem('token'); 
  const API_URL = 'https://poovizhi-farms-backend.onrender.com/api/cart';

  // 🔃 Fetch cart from backend
  useEffect(() => {
    if (token) {
      axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setCart(res.data);
      })
      .catch(err => console.error('Error fetching cart:', err));
    } else {
      const local = localStorage.getItem('cart');
      if (local) {
        setCart(JSON.parse(local));
      }
    }
  }, [token]);

  // ➕ Add to cart
  const addToCart = async (product) => {
    try {
      let updatedCart;
      if (token) {
        const res = await axios.post(API_URL, product, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        updatedCart = res.data;
      } else {
        updatedCart = [...cart, product];
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // ❌ Remove from cart
  const removeItemFromCart = async (productId) => {
    try {
      let updatedCart;
      if (token) {
        const res = await axios.delete(`${API_URL}/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        updatedCart = res.data;
      } else {
        updatedCart = cart.filter(item => item._id !== productId);
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // ✏️ Update quantity
  const updateItemQuantity = async (productId, quantity) => {
    try {
      let updatedCart;
      if (token) {
        const res = await axios.put(`${API_URL}/${productId}`, { quantity }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        updatedCart = res.data;
      } else {
        updatedCart = cart.map(item =>
          item._id === productId ? { ...item, quantity } : item
        );
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItemFromCart, updateItemQuantity,cartSidebarOpen,
      setCartSidebarOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

/*import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // Assuming you have a UserContext

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = useUser(); // Assuming useUser returns { userId } or null
  const userId = user?.userId; // Safely access userId
  const API_URL = 'http://localhost:5000/api/cart';

  // Fetch cart from API or localStorage on mount
  useEffect(() => {
    if (userId) {
      axios
        .get(`${API_URL}/${userId}`)
        .then(res => {
          setCart(res.data);
          localStorage.setItem('cart', JSON.stringify(res.data));
        })
        .catch(err => console.error('Error fetching cart:', err));
    } else {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
    }
  }, [userId]);

  // Function to add an item to the cart
  const addToCart = async (product) => {
    try {
      let updatedCart;
      if (userId) {
        const response = await axios.post(`${API_URL}/${userId}`, product);
        updatedCart = response.data;
      } else {
        updatedCart = [...cart, product];
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Function to remove an item from the cart
  const removeItemFromCart = async (itemId) => {
    try {
      let updatedCart;
      if (userId) {
        const response = await axios.delete(`${API_URL}/${userId}/${itemId}`);
        updatedCart = response.data;
      } else {
        updatedCart = cart.filter(item => item._id !== itemId);
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Function to update item quantity in the cart
  const updateItemQuantity = async (itemId, quantity) => {
    try {
      let updatedCart;
      if (userId) {
        const response = await axios.put(`${API_URL}/${userId}/${itemId}`, { quantity });
        updatedCart = response.data;
      } else {
        updatedCart = cart.map(item =>
          item._id === itemId ? { ...item, quantity } : item
        );
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItemFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;*/
import React, { useState, useEffect,useLocation } from 'react';
import './head2.css';
import { FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf } from "react-icons/fa";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import './loginStyle.css';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';


function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  
  const { wishlist = []} = useWishlist();
  const { cart = [] } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname === '/search') {
      navigate('/');
    } else {
      navigate('/search');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false); // Update the state to reflect the user is logged out
    navigate('/'); // Redirect to the homepage or login page
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const switchForm = (form) => {
    setCurrentForm(form);
  };
useEffect(() => {
    const count = Array.isArray(cart)
      ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
      : 0;
    setCartCount(count);
  }, [cart]);

 useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  return (
    <div className="header-container">
      <div className='main'>
        <div className='header-left'>
          <h1 className='heading'>
            <FaLeaf size={28} color="#2e7d32" />
            Poovizhi Farms
          </h1>

          <div className='header-center'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/aboutUs">About Us</Link></li>
              <li><Link to="/contactUs">Contact Us</Link></li>
            </ul>
            <Outlet />
          </div>
        </div>

        <div className="header-right">
          <div className='icons-container'>
            <FaSearch
              size={20}
              className="search-icon"
              onClick={handleSearchClick}
              style={{ cursor: 'pointer',color: 'green' }}
            />
          </div>

          <Link to="/wishlist" className="wishlist-icon">
            <FaHeart size={22} />
            {wishlist.length > 0 && (
              <span className="wishlist-count">{wishlist.length}</span>
            )}
          </Link>
          


          <Link to="/cart" className="cart-icon" style={{ position: 'relative' }}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span
                /*style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                }}*/
              >
                {cartCount}
              </span>
            )}
          </Link>

          {!isLoggedIn && (
            
  <div className="user-icon" onClick={() => setShowLogin(true)}>
    <FaUser size={22} className="login-icon" />
  </div>
)}
{isLoggedIn && (
  <div className="user-icon" onClick={toggleDropdown}>
    <FaUser size={22} className="login-icon" />
    {isDropdownOpen && (
      <div className="dropdown-menu">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/address">Address</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    )}
  </div>
)}

        </div>
      </div>
      



      {/* ✅ Modal rendered inside return block */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
            
            {currentForm === "login" && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          switchForm={switchForm}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowLogin(false);
          }}
        />
      )}
            {currentForm === "forgot" && (
              <ForgotPasswordForm switchForm={switchForm} />
            )}
            
              {currentForm === "signup" && (
                <SignupForm
                  switchForm={switchForm}
                  onClose={() => setShowLogin(false)}
                  onSignupSuccess={() => {
                    setIsLoggedIn(true);      // Show dropdown
                    setShowLogin(false);      // Close modal
                  }}
                />
              )}
              
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

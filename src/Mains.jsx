import React, { useState, useEffect } from 'react';
import './styleMain.css';
import {
  FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf,
  FaHome, FaBoxOpen, FaInfoCircle, FaPhone
} from "react-icons/fa";
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import './loginStyle.css';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';

function Mains() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { wishlist = [] } = useWishlist();
  const { cart = [] } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const count = Array.isArray(cart)
      ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
      : 0;
    setCartCount(count);
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      setIsDropdownOpen(false);
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchClick = () => {
    navigate(location.pathname === '/search' ? '/' : '/search');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const switchForm = (form) => {
    setCurrentForm(form);
  };

  return (
    <div className="header-container">
      <div className="main">
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>

        <div className='header-left'>
          <h1 className='heading'>
            <FaLeaf size={24} color="#2e7d32" /> Poovizhi Farms
          </h1>
        </div>

        <div className="header-center">
          <ul>
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/products"><FaBoxOpen /> Products</Link></li>
            <li><Link to="/aboutUs"><FaInfoCircle /> About Us</Link></li>
            <li><Link to="/contactUs"><FaPhone /> Contact Us</Link></li>
          </ul>
        </div>

        <div className="header-top-icons">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart size={22} />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      <div className="header-bottom-icons">
        <FaSearch size={20} className="search-icon" onClick={handleSearchClick} />

        <Link to="/wishlist" className="wishlist-icon">
          <FaHeart size={22} />
          {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
        </Link>

        {!isLoggedIn ? (
          <div className="user-icon" onClick={() => setShowLogin(true)}>
            <FaUser size={22} />
          </div>
        ) : (
          <div className="user-icon" onClick={toggleDropdown}>
            <FaUser size={22} />
            {isDropdownOpen && (
              <div className="dropdown-menus">
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

      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <button className="sidebar-close" onClick={() => setMenuOpen(false)}>✕</button>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}><FaBoxOpen /> Products</Link></li>
          <li><Link to="/aboutUs" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About Us</Link></li>
          <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}><FaPhone /> Contact Us</Link></li>
        </ul>
      </div>

      {menuOpen && <div className="sidebar-backdrop show" onClick={() => setMenuOpen(false)} />}

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
            {currentForm === "forgot" && <ForgotPasswordForm switchForm={switchForm} />}
            {currentForm === "signup" && (
              <SignupForm
                switchForm={switchForm}
                onClose={() => setShowLogin(false)}
                onSignupSuccess={() => {
                  setIsLoggedIn(true);
                  setShowLogin(false);
                }}
              />
            )}
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Mains;

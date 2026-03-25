import React, { useState, useEffect } from 'react';
import './main.css';
import {
  FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf,
  FaHome, FaBoxOpen, FaInfoCircle, FaPhone, FaMapMarkerAlt,
  FaSignOutAlt, FaWhatsapp
} from "react-icons/fa";
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
import '../Forms/loginStyle.css';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

function Main({ onSearch, onWishlistAdd, onCartOpen }) {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { wishlist = [], setSidebarOpen } = useWishlist();
  const { cart = [], setCartSidebarOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth token
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Update cart count
  useEffect(() => {
    const count = Array.isArray(cart)
      ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
      : 0;
    setCartCount(count);
  }, [cart]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  // Listen for login/logout events
  useEffect(() => {
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChanged', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchClick = () => onSearch(''); // trigger global search sidebar
  const handleWishlistClick = () => {
    setSidebarOpen(true);
    if (onWishlistAdd) onWishlistAdd();
  };
  const handleCartClick = () => {
    setCartSidebarOpen(true);
    if (onCartOpen) onCartOpen();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/');
  };

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const switchForm = (form) => setCurrentForm(form);

  return (
    <div className="header-container">
      <div className="main">
        {/* Hamburger menu (mobile) */}
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Logo */}
        <div className="header-left">
          <h1 className="heading">
            <FaLeaf size={24} color="#2e7d32" />
            Poovizhi Farms
          </h1>
        </div>

        {/* Navigation */}
        <div className="header-center">
          <ul>
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/products"><FaBoxOpen /> Products</Link></li>
            <li><Link to="/aboutUs"><FaInfoCircle /> About Us</Link></li>
            <li><Link to="/contactUs"><FaPhone /> Contact Us</Link></li>
          </ul>
        </div>

        {/* Right icons */}
        <div className="header-right">
          <FaSearch size={20} className="search-icon" onClick={handleSearchClick} />

          <div className="wishlist-icon" onClick={handleWishlistClick} style={{ cursor: "pointer" }}>
            <FaHeart size={22} />
            {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
          </div>

          <div className="cart-icon" onClick={handleCartClick} style={{ cursor: "pointer" }}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </div>

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
                    <li><Link to="/dashboard"><FaUser /> Dashboard</Link></li>
                    <li><Link to="/address"><FaMapMarkerAlt /> Address</Link></li>
                    <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar (mobile) */}
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

      {/* Mobile bottom nav */}
      <div className="mobile-bottom-nav">
        <div className="nav-item" onClick={handleSearchClick}>
          <FaSearch size={22} />
          <span className="nav-label">Search</span>
        </div>

        <div className="nav-item wishlist-icon" onClick={handleWishlistClick}>
          <FaHeart size={22} />
          {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
          <span className="nav-label">Wishlist</span>
        </div>

        <div className="nav-item cart-icon" onClick={handleCartClick}>
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          <span className="nav-label">Cart</span>
        </div>

        <Link to="/products" className="nav-item products-icon">
          <FaBoxOpen size={22} />
          <span className="nav-label">Products</span>
        </Link>

        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="nav-item whatsapp-icon">
          <FaWhatsapp size={22} />
          <span className="nav-label">WhatsApp</span>
        </a>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
            {currentForm === "login" && (
              <LoginForm
                onClose={() => setShowLogin(false)}
                switchForm={switchForm}
                onLoginSuccess={() => {
                  window.dispatchEvent(new Event('authChanged'));
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
                  window.dispatchEvent(new Event('authChanged'));
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

export default Main;
// import React, { useState, useEffect } from 'react';
// import './main.css';
// import {
//   FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf,
//   FaHome, FaBoxOpen, FaInfoCircle, FaPhone, FaMapMarkerAlt,
//   FaSignOutAlt, FaWhatsapp
// } from "react-icons/fa";
// import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
// import LoginForm from '../Forms/LoginForm';
// import SignupForm from '../Forms/SignupForm';
// import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
// import '../Forms/loginStyle.css';
// import { useWishlist } from '../../context/WishlistContext';
// import { useCart } from '../../context/CartContext';
// import SearchResults from '../Search/SearchResults';

// function Main() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentForm, setCurrentForm] = useState("login");
//   const [cartCount, setCartCount] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isSearchSidebarOpen, setSearchSidebarOpen] = useState(false);

//   const { wishlist = [], setSidebarOpen } = useWishlist();
//   const { cart = [], setCartSidebarOpen } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Helper to check auth
//   const checkAuth = () => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//     setIsDropdownOpen(false);
//   };

//   // Check token on first load
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // Update cart count
//   useEffect(() => {
//     const count = Array.isArray(cart)
//       ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
//       : 0;
//     setCartCount(count);
//   }, [cart]);

//   // Prevent background scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = showLogin ? "hidden" : "auto";
//   }, [showLogin]);

//   // Listen for login/logout events
//   useEffect(() => {
//     window.addEventListener('storage', checkAuth);
//     window.addEventListener('authChanged', checkAuth);

//     return () => {
//       window.removeEventListener('storage', checkAuth);
//       window.removeEventListener('authChanged', checkAuth);
//     };
//   }, []);

//   // Close menu when route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   // Close menu on ESC
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') setMenuOpen(false);
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   const handleSearchClick = () => setSearchSidebarOpen(true);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.dispatchEvent(new Event('authChanged'));
//     navigate('/');
//   };

//   const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

//   const switchForm = (form) => setCurrentForm(form);

//   return (
//     <div className="header-container">
//       <div className="main">
//         {/* Hamburger menu (mobile) */}
//         <div
//           className={`hamburger ${menuOpen ? 'open' : ''}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Logo */}
//         <div className="header-left">
//           <h1 className="heading">
//             <FaLeaf size={24} color="#2e7d32" />
//             Poovizhi Farms
//           </h1>
//         </div>

//         {/* Navigation */}
//         <div className="header-center">
//           <ul>
//             <li><Link to="/"><FaHome /> Home</Link></li>
//             <li><Link to="/products"><FaBoxOpen /> Products</Link></li>
//             <li><Link to="/aboutUs"><FaInfoCircle /> About Us</Link></li>
//             <li><Link to="/contactUs"><FaPhone /> Contact Us</Link></li>
//           </ul>
//         </div>

//         {/* Right icons */}
//         <div className="header-right">
//           <FaSearch size={20} className="search-icon" onClick={handleSearchClick} />

//           <div
//             className="wishlist-icon"
//             onClick={() => setSidebarOpen(true)}
//             style={{ cursor: "pointer" }}
//           >
//             <FaHeart size={22} />
//             {wishlist.length > 0 && (
//               <span className="count-badge">{wishlist.length}</span>
//             )}
//           </div>

//           <div
//             className="cart-icon"
//             onClick={() => setCartSidebarOpen(true)}
//             style={{ cursor: "pointer" }}
//           >
//             <FaShoppingCart size={22} />
//             {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//           </div>

//           {!isLoggedIn ? (
//             <div className="user-icon" onClick={() => setShowLogin(true)}>
//               <FaUser size={22} />
//             </div>
//           ) : (
//             <div className="user-icon" onClick={toggleDropdown}>
//               <FaUser size={22} />
//               {isDropdownOpen && (
//                 <div className="dropdown-menus">
//                   <ul>
//                     <li><Link to="/dashboard"><FaUser /> Dashboard</Link></li>
//                     <li><Link to="/address"><FaMapMarkerAlt /> Address</Link></li>
//                     <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Sidebar (mobile) */}
//       <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
//         <button className="sidebar-close" onClick={() => setMenuOpen(false)}>✕</button>
//         <ul>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link></li>
//           <li><Link to="/products" onClick={() => setMenuOpen(false)}><FaBoxOpen /> Products</Link></li>
//           <li><Link to="/aboutUs" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About Us</Link></li>
//           <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}><FaPhone /> Contact Us</Link></li>
//         </ul>
//       </div>

//       {menuOpen && <div className="sidebar-backdrop show" onClick={() => setMenuOpen(false)} />}

//       {/* Mobile bottom nav */}
//       <div className="mobile-bottom-nav">
//         <div className="nav-item" onClick={handleSearchClick}>
//           <FaSearch size={22} />
//           <span className="nav-label">Search</span>
//         </div>

//         <div
//           className="nav-item wishlist-icon"
//           onClick={() => setSidebarOpen(true)}
//           style={{ cursor: "pointer" }}
//         >
//           <FaHeart size={22} />
//           {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//           <span className="nav-label">Wishlist</span>
//         </div>

//         <div
//           className="nav-item cart-icon"
//           onClick={() => setCartSidebarOpen(true)}
//           style={{ cursor: "pointer" }}
//         >
//           <FaShoppingCart size={22} />
//           {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//           <span className="nav-label">Cart</span>
//         </div>

//         <Link to="/products" className="nav-item products-icon">
//           <FaBoxOpen size={22} />
//           <span className="nav-label">Products</span>
//         </Link>

//         <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="nav-item whatsapp-icon">
//           <FaWhatsapp size={22} />
//           <span className="nav-label">WhatsApp</span>
//         </a>
//       </div>

//       {/* Login Modal */}
//       {showLogin && (
//         <div className="modal-overlay" onClick={() => setShowLogin(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
//             {currentForm === "login" && (
//               <LoginForm
//                 onClose={() => setShowLogin(false)}
//                 switchForm={switchForm}
//                 onLoginSuccess={() => {
//                   window.dispatchEvent(new Event('authChanged'));
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//             {currentForm === "forgot" && <ForgotPasswordForm switchForm={switchForm} />}
//             {currentForm === "signup" && (
//               <SignupForm
//                 switchForm={switchForm}
//                 onClose={() => setShowLogin(false)}
//                 onSignupSuccess={() => {
//                   window.dispatchEvent(new Event('authChanged'));
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       {/* Search Sidebar */}
//       {isSearchSidebarOpen && (
//         <SearchResults onClose={() => setSearchSidebarOpen(false)} />
//       )}

//       <Outlet />
//     </div>
//   );
// }

// export default Main;
// import React, { useState, useEffect } from 'react';
// import './main.css';
// import {
//   FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf,
//   FaHome, FaBoxOpen, FaInfoCircle, FaPhone, FaMapMarkerAlt,
//   FaSignOutAlt, FaWhatsapp
// } from "react-icons/fa";
// import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
// import LoginForm from '../Forms/LoginForm';
// import SignupForm from '../Forms/SignupForm';
// import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
// import '../Forms/loginStyle.css';
// import { useWishlist } from '../../context/WishlistContext';
// import { useCart } from '../../context/CartContext';
// import SearchResults from '../Search/SearchResults';

// function Main() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentForm, setCurrentForm] = useState("login");
//   const [cartCount, setCartCount] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
// const { setSidebarOpen } = useWishlist();
//  const { setCartSidebarOpen } = useCart();
// const [isSearchSidebarOpen, setSearchSidebarOpen] = useState(false);

//   const { wishlist = [] } = useWishlist();
//   const { cart = [] } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check token on first load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   // Update cart count
//   useEffect(() => {
//     const count = Array.isArray(cart)
//       ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
//       : 0;
//     setCartCount(count);
//   }, [cart]);

//   // Prevent background scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = showLogin ? "hidden" : "auto";
//   }, [showLogin]);

//   // Listen for login/logout events
//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('token');
//       setIsLoggedIn(!!token);
//       setIsDropdownOpen(false);
//     };

//     checkLogin();
//     window.addEventListener('storage', checkLogin); // For other tabs
//     window.addEventListener('authChanged', checkLogin); // For same tab instant updates

//     return () => {
//       window.removeEventListener('storage', checkLogin);
//       window.removeEventListener('authChanged', checkLogin);
//     };
//   }, []);

//   // Close menu when route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   // Close menu on ESC
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') setMenuOpen(false);
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // const handleSearchClick = () => {
//   //   navigate(location.pathname === '/search' ? '/' : '/search');
//   // };
// const handleSearchClick = () => {
//     setSearchSidebarOpen(true);
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.dispatchEvent(new Event('authChanged')); // Tell Main.js immediately
//     navigate('/');
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const switchForm = (form) => {
//     setCurrentForm(form);
//   };

//   return (
//     <div className="header-container">
//       <div className="main">
//         {/* Hamburger menu (mobile) */}
//         <div
//           className={`hamburger ${menuOpen ? 'open' : ''}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Logo */}
//         <div className="header-left">
//           <h1 className="heading">
//             <FaLeaf size={24} color="#2e7d32" />
//             Poovizhi Farms
//           </h1>
//         </div>

//         {/* Navigation */}
//         <div className="header-center">
//           <ul>
//             <li><Link to="/"><FaHome /> Home</Link></li>
//             <li><Link to="/products"><FaBoxOpen /> Products</Link></li>
//             <li><Link to="/aboutUs"><FaInfoCircle /> About Us</Link></li>
//             <li><Link to="/contactUs"><FaPhone /> Contact Us</Link></li>
//           </ul>
//         </div>

//         {/* Right icons */}
//         <div className="header-right">
//           <FaSearch size={20} className="search-icon" onClick={handleSearchClick} />

//           {/* <Link to="/wishlist" className="wishlist-icon"  onClick={() => setSidebarOpen(true)}>
//             <FaHeart size={22} />
//             {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//           </Link> */}
//           <div
//       className="wishlist-icon"
//       onClick={() => setSidebarOpen(true)}
//       style={{ cursor: "pointer" }}
//     >
//       <FaHeart size={22} />
//       {wishlist.length > 0 && (
//         <span className="count-badge">{wishlist.length}</span>
//       )}
//     </div>

//           {/* <Link to="/cart" className="cart-icon">
//             <FaShoppingCart size={22} />
//             {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//           </Link> */}
// <div
//       className="cart-icon"
//       onClick={() => setCartSidebarOpen(true)}
//       style={{ cursor: "pointer" }}
//     >
//       <FaShoppingCart size={22} />
//       {cart.length > 0 && <span className="count-badge">{cart.length}</span>}
//     </div>

//           {!isLoggedIn ? (
//             <div className="user-icon" onClick={() => setShowLogin(true)}>
//               <FaUser size={22} />
//             </div>
//           ) : (
//             <div className="user-icon" onClick={toggleDropdown}>
//               <FaUser size={22} />
//               {isDropdownOpen && (
//                 <div className="dropdown-menus">
//                   <ul>
//                     <li><Link to="/dashboard"><FaUser /> Dashboard</Link></li>
//                     <li><Link to="/address"><FaMapMarkerAlt /> Address</Link></li>
//                     <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Sidebar (mobile) */}
//       <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
//         <button className="sidebar-close" onClick={() => setMenuOpen(false)}>✕</button>
//         <ul>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link></li>
//           <li><Link to="/products" onClick={() => setMenuOpen(false)}><FaBoxOpen /> Products</Link></li>
//           <li><Link to="/aboutUs" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About Us</Link></li>
//           <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}><FaPhone /> Contact Us</Link></li>
//         </ul>
//       </div>

//       {menuOpen && <div className="sidebar-backdrop show" onClick={() => setMenuOpen(false)} />}

//       {/* Mobile bottom nav */}
//       <div className="mobile-bottom-nav">
//         <div className="nav-item" onClick={handleSearchClick}>
//           <FaSearch size={22} />
//           <span className="nav-label">Search</span>
//         </div>

//         <div
//   className="nav-item wishlist-icon"
//   onClick={() => setSidebarOpen(true)}
//   style={{ cursor: "pointer" }}
// >
//   <FaHeart size={22} />
//   {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//   <span className="nav-label">Wishlist</span>
// </div>

// <div
//   className="nav-item cart-icon"
//   onClick={() => setCartSidebarOpen(true)}
//   style={{ cursor: "pointer" }}
// >
//   <FaShoppingCart size={22} />
//   {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//   <span className="nav-label">Cart</span>
// </div>

//         <Link to="/products" className="nav-item products-icon">
//           <FaBoxOpen size={22} />
//           <span className="nav-label">Products</span>
//         </Link>

//         <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="nav-item whatsapp-icon">
//           <FaWhatsapp size={22} />
//           <span className="nav-label">WhatsApp</span>
//         </a>
//       </div>

//       {/* Login Modal */}
//       {showLogin && (
//         <div className="modal-overlay" onClick={() => setShowLogin(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
//             {currentForm === "login" && (
//               <LoginForm
//                 onClose={() => setShowLogin(false)}
//                 switchForm={switchForm}
//                 onLoginSuccess={() => {
//                   window.dispatchEvent(new Event('authChanged')); // Tell Main.js immediately
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//             {currentForm === "forgot" && <ForgotPasswordForm switchForm={switchForm} />}
//             {currentForm === "signup" && (
//               <SignupForm
//                 switchForm={switchForm}
//                 onClose={() => setShowLogin(false)}
//                 onSignupSuccess={() => {
//                   window.dispatchEvent(new Event('authChanged')); // Tell Main.js immediately
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       <Outlet />
//     </div>
//   );
// }

// export default Main;
// import React, { useState, useEffect } from 'react';
// // import './styleMain.css';
// import './main.css';
// import {
//   FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf,
//   FaHome, FaBoxOpen, FaInfoCircle, FaPhone, FaMapMarkerAlt,
//   FaSignOutAlt, FaWhatsapp
// } from "react-icons/fa";
// import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
// import LoginForm from '../Forms/LoginForm';
// import SignupForm from '../Forms/SignupForm';
// import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
// import '../Forms/loginStyle.css';
// import { useWishlist } from '../../context/WishlistContext';
// import { useCart } from '../../context/CartContext';

// function Main() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentForm, setCurrentForm] = useState("login");
//   const [cartCount, setCartCount] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { wishlist = [] } = useWishlist();
//   const { cart = [] } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     const count = Array.isArray(cart)
//       ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
//       : 0;
//     setCartCount(count);
//   }, [cart]);

//   useEffect(() => {
//     document.body.style.overflow = showLogin ? "hidden" : "auto";
//   }, [showLogin]);

//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('token');
//       setIsLoggedIn(!!token);
//       setIsDropdownOpen(false);
//     };
//     checkLogin();
//     window.addEventListener('storage', checkLogin);
//     return () => window.removeEventListener('storage', checkLogin);
//   }, []);

//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') setMenuOpen(false);
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   const handleSearchClick = () => {
//     navigate(location.pathname === '/search' ? '/' : '/search');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const switchForm = (form) => {
//     setCurrentForm(form);
//   };

//   return (
//     <div className="header-container">
//       <div className="main">

//         {/* Hamburger menu (mobile) */}
//         <div
//           className={`hamburger ${menuOpen ? 'open' : ''}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Logo (centered on mobile) */}
//         <div className="header-left">
//           <h1 className="heading">
//             <FaLeaf size={24} color="#2e7d32" />
//             Poovizhi Farms
//           </h1>
//         </div>
//  <div className="header-center">
//     {/* Navigation Menu */}
//     <ul>
//       <li><Link to="/"><FaHome /> Home</Link></li>
//       <li><Link to="/products"><FaBoxOpen /> Products</Link></li>
//       <li><Link to="/aboutUs"><FaInfoCircle /> About Us</Link></li>
//       <li><Link to="/contactUs"><FaPhone /> Contact Us</Link></li>
//     </ul>
//   </div>
//         {/* Header Right (one unified version) */}
//         <div className="header-right">
//           <FaSearch size={20} className="search-icon" onClick={handleSearchClick} />

//           <Link to="/wishlist" className="wishlist-icon">
//             <FaHeart size={22} />
//             {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//           </Link>

//           <Link to="/cart" className="cart-icon">
//             <FaShoppingCart size={22} />
//             {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//           </Link>

//           {!isLoggedIn ? (
//             <div className="user-icon" onClick={() => setShowLogin(true)}>
//               <FaUser size={22} />
//             </div>
//           ) : (
//             <div className="user-icon" onClick={toggleDropdown}>
//               <FaUser size={22} />
//               {isDropdownOpen && (
//                 <div className="dropdown-menus">
//                   <ul>
//                     <li><Link to="/dashboard"><FaUser /> Dashboard</Link></li>
//                     <li><Link to="/address"><FaMapMarkerAlt /> Address</Link></li>
//                     <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

       
//       </div>

//       {/* Sidebar (mobile) */}
//       <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
//         <button className="sidebar-close" onClick={() => setMenuOpen(false)}>✕</button>
//         <ul>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link></li>
//           <li><Link to="/products" onClick={() => setMenuOpen(false)}><FaBoxOpen /> Products</Link></li>
//           <li><Link to="/aboutUs" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About Us</Link></li>
//           <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}><FaPhone /> Contact Us</Link></li>
//         </ul>
//       </div>

//       {menuOpen && <div className="sidebar-backdrop show" onClick={() => setMenuOpen(false)} />}
// {/* mobile navbar */}
//       <div className="mobile-bottom-nav">
//   <div className="nav-item" onClick={handleSearchClick}>
//     <FaSearch size={22} />
//     <span className="nav-label">Search</span>
//   </div>

//   <Link to="/wishlist" className="nav-item wishlist-icon">
//     <FaHeart size={22} />
//     {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//     <span className="nav-label">Wishlist</span>
//   </Link>

//   <Link to="/cart" className="nav-item cart-icon">
//     <FaShoppingCart size={22} />
//     {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//     <span className="nav-label">Cart</span>
//   </Link>

//   <Link to="/products" className="nav-item products-icon">
//     <FaBoxOpen size={22} />
//     <span className="nav-label">Products</span>
//   </Link>

//   <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="nav-item whatsapp-icon">
//     <FaWhatsapp size={22} />
//     <span className="nav-label">WhatsApp</span>
//   </a>
// </div>



//       {/* Login Modal */}
//       {showLogin && (
//         <div className="modal-overlay" onClick={() => setShowLogin(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
//             {currentForm === "login" && (
//               <LoginForm
//                 onClose={() => setShowLogin(false)}
//                 switchForm={switchForm}
//                 onLoginSuccess={() => {
//                   setIsLoggedIn(true);
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//             {currentForm === "forgot" && <ForgotPasswordForm switchForm={switchForm} />}
//             {currentForm === "signup" && (
//               <SignupForm
//                 switchForm={switchForm}
//                 onClose={() => setShowLogin(false)}
//                 onSignupSuccess={() => {
//                   setIsLoggedIn(true);
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       <Outlet />
//     </div>
//   );
// }

// export default Main;
// import React, { useState, useEffect } from 'react';
// // import './HeaderStyle.css';
// import './styleMain.css'
// import {
//   FaSearch, FaHeart, FaUser, FaShoppingCart, FaLeaf,
//   FaHome, FaBoxOpen, FaInfoCircle, FaPhone, FaMapMarkerAlt, FaSignOutAlt,FaWhatsapp
// } from "react-icons/fa";
// import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
// import LoginForm from '../Forms/LoginForm';
// import SignupForm from '../Forms/SignupForm';
// import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
// import '../Forms/loginStyle.css';
// import { useWishlist } from '../../context/WishlistContext';
// import { useCart } from '../../context/CartContext';



// function Main() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentForm, setCurrentForm] = useState("login");
//   const [cartCount, setCartCount] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { wishlist = [] } = useWishlist();
//   const { cart = [] } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     const count = Array.isArray(cart)
//       ? cart.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
//       : 0;
//     setCartCount(count);
//   }, [cart]);

//   useEffect(() => {
//     document.body.style.overflow = showLogin ? "hidden" : "auto";
//   }, [showLogin]);

//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('token');
//       setIsLoggedIn(!!token);
//       setIsDropdownOpen(false);
//     };
//     checkLogin();
//     window.addEventListener('storage', checkLogin);
//     return () => {
//       window.removeEventListener('storage', checkLogin);
//     };
//   }, []);

//   // Auto-close sidebar on route change
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   // Close sidebar on Escape key
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') setMenuOpen(false);
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   const handleSearchClick = () => {
//     navigate(location.pathname === '/search' ? '/' : '/search');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const switchForm = (form) => {
//     setCurrentForm(form);
//   };

//   return (
//     <div className="header-container">
//       <div className="main">

//         {/* Hamburger for mobile */}
//         <div
//           className={`hamburger ${menuOpen ? 'open' : ''}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//          {/* Logo - centered on mobile  */}
//         <div className='header-left'>
//           <h1 className='heading'>
//             <FaLeaf size={24} color="#2e7d32" />
//             Poovizhi Farms
//           </h1>
//          </div> 
       
// {/* Right icons (mobile: only user icon) */}
// <div className="header-right">
//   {!isLoggedIn ? (
//     <div className="user-icon" onClick={() => setShowLogin(true)}>
//       <FaUser size={22} />
//     </div>
//   ) : (
//     <div className="user-icon" onClick={toggleDropdown}>
//       <FaUser size={22} />
//       {isDropdownOpen && (
//         <div className="dropdown-menus">
//           <ul>
//             <li><Link to="/dashboard"><FaUser /> Dashboard</Link></li>
//             <li><Link to="/address"><FaMapMarkerAlt /> Address</Link></li>
//             <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   )}
// </div>


//         {/* Center Navigation (visible on desktop) */}
//         <div className="header-center">
//           <ul>
//             <li><Link to="/"><FaHome /> Home</Link></li>
//             <li><Link to="/products"><FaBoxOpen /> Products</Link></li>
//             <li><Link to="/aboutUs"><FaInfoCircle /> About Us</Link></li>
//             <li><Link to="/contactUs"><FaPhone /> Contact Us</Link></li>
//           </ul>
//         </div>

//         {/* Right Icons */}
//         <div className="header-right">
//           <FaSearch size={20} className="search-icon" onClick={handleSearchClick} />

//           <Link to="/wishlist" className="wishlist-icon">
//             <FaHeart size={22} />
//             {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//           </Link>

//           <Link to="/cart" className="cart-icon">
//             <FaShoppingCart size={22} />
//             {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//           </Link>

//           {!isLoggedIn ? (
//             <div className="user-icon" onClick={() => setShowLogin(true)}>
//               <FaUser size={22} />
//             </div>
//           ) : (
//             <div className="user-icon" onClick={toggleDropdown}>
//               <FaUser size={22} />
//               {isDropdownOpen && (
//                 <div className="dropdown-menus">
                 
//                   <ul>
//   <li><Link to="/dashboard"><FaUser /> Dashboard</Link></li>
//   <li><Link to="/address"><FaMapMarkerAlt /> Address</Link></li>
//   <li onClick={handleLogout}><FaSignOutAlt  /> Logout</li>
// </ul>

//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Sidebar (mobile nav) */}
//       <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
//         <button className="sidebar-close" onClick={() => setMenuOpen(false)}>✕</button>
//         <ul>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link></li>
//           <li><Link to="/products" onClick={() => setMenuOpen(false)}><FaBoxOpen /> Products</Link></li>
//           <li><Link to="/aboutUs" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About Us</Link></li>
//           <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}><FaPhone /> Contact Us</Link></li>
//         </ul>
//       </div>

//       {/* Backdrop */}
//       {menuOpen && <div className="sidebar-backdrop show" onClick={() => setMenuOpen(false)} />}
// {/* mobile nav */}
//         <div className="mobile-bottom-nav">
//   <FaSearch size={20} onClick={handleSearchClick} className="search-icon" />

//   <Link to="/wishlist" className="wishlist-icon">
//     <FaHeart size={20} />
//     {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
//   </Link>

//   <Link to="/cart" className="cart-icon">
//     <FaShoppingCart size={20} />
//     {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//   </Link>

//   <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-icon">
//     <FaWhatsapp size={20} />
//   </a>
// </div>


//       {/* Login Modal */}
//       {showLogin && (
//         <div className="modal-overlay" onClick={() => setShowLogin(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
//             {currentForm === "login" && (
//               <LoginForm
//                 onClose={() => setShowLogin(false)}
//                 switchForm={switchForm}
//                 onLoginSuccess={() => {
//                   setIsLoggedIn(true);
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//             {currentForm === "forgot" && <ForgotPasswordForm switchForm={switchForm} />}
//             {currentForm === "signup" && (
//               <SignupForm
//                 switchForm={switchForm}
//                 onClose={() => setShowLogin(false)}
//                 onSignupSuccess={() => {
//                   setIsLoggedIn(true);
//                   setShowLogin(false);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       <Outlet />
//     </div>
//   );
// }

// export default Main;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WishList.css';

const WishlistIcon = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistCount(savedWishlist.length);
  }, [location]); // Update count when route changes

  return (
    <div className="wishlist-header-icon">
      <Link to="/wishlist" className="wishlist-link">
        ❤️
        {wishlistCount > 0 && <span className="wishlist-count-badge">{wishlistCount}</span>}
      </Link>
    </div>
  );
};

export default WishlistIcon;

import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import './wishlistSidebar.css';

const WishlistSidebar = () => {
  const { wishlist, removeFromWishlist, sidebarOpen, setSidebarOpen } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`wishlist-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`wishlist-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="wishlist-header">
          <h2>Your Wishlist <FaHeart style={{ color: 'red', marginLeft: '8px' }} /></h2>
          <button className="close" onClick={() => setSidebarOpen(false)}>×</button>
        </div>

        <div className="wishlist-items">
          {wishlist.length === 0 ? (
            <p className="empty">Your wishlist is empty.</p>
          ) : (
            wishlist.map((item, index) => (
              <div key={index} className="wishlist-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="actions">
                    <button onClick={() => addToCart(item)} className="cart-btn">Add to Cart</button>
                    <button onClick={() => removeFromWishlist(item.productId, item.selectedVariantIndex)} className="remove-btn">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="sidebar-footer">
            <button
              className="view-wishlist-btn"
              onClick={() => {
                navigate('/wishlist');
                setSidebarOpen(false);
              }}
            >
              View Wishlist Page
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistSidebar;

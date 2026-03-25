import React, { useState, useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './wishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initial = {};
    wishlist.forEach(item => {
      const qty = parseInt(item.quantity);
      initial[item._id] = isNaN(qty) ? 1 : qty;
    });
    setQuantities(initial);
  }, [wishlist]);

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  const handleAddToCart = (item) => {
    const itemWithQuantity = {
      ...item,
      quantity: quantities[item._id] || 1,
    };
    addToCart(itemWithQuantity);
    removeFromWishlist(item._id, item.selectedVariantIndex, true);
    alert(`${item.name} added to cart 🛒`);
  };

  
  const handleViewDetails = (item) => {
  const id = item.productId || item._id;
  navigate(`/products/${id}?variant=${item.selectedVariantIndex}`);
};

  const handleQuantityChange = (item, delta) => {
    const current = quantities[item._id] || 1;
    const updated = Math.max(1, Math.min(99, current + delta));
    setQuantities(prev => ({ ...prev, [item._id]: updated }));
  };

  const handleBack = () => {
    navigate('/');
  };

  const validItems = wishlist.filter(item => item && item._id && item.name);

  if (validItems.length === 0) {
    // return (
    //   <div className="wishlist-container">
    //     <div className="wishlist-header">
    //       <button className="wishlist-back-btn" onClick={handleBack}>←</button>
    //       My Wishlist 💖
    //     </div>
    //     <p className="wishlist-empty">Your wishlist is empty ❤️</p>
    //   </div>
    // );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-heading">
        <button className="wishlist-back-btn" onClick={handleBack}>←</button>
        My Wishlist 💖
      </div>

      {/* Desktop Table View */}
      {/* <table className="wishlist-table desktop-only">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {validItems.map((item, index) => {
            const quantity = quantities[item._id] || 1;
            const total = parseFloat(item.price || 0) * quantity;

            return (
              <tr key={`${item._id}-${item.selectedVariantIndex}-${index}`}>
                <td data-label="Product">
                  <div className="wishlist-product">
                    <img src={item.imageUrl} alt={item.name} />
                    <div>
                      <div className="wishlist-name">{item.name}</div>
                      <div className="wishlist-actions">
                        <button onClick={() => handleViewDetails(item)}>👁️</button>
                        <button onClick={() => handleAddToCart(item)}>🛒</button>
                        <button onClick={() => removeFromWishlist(item._id, item.selectedVariantIndex)}>❌</button>
                      </div>
                    </div>
                  </div>
                </td>
                <td data-label="Price">{formatPrice(item.price)}</td>
                <td data-label="Qty">
                  <div className="wishlist-qty">
                    <button onClick={() => handleQuantityChange(item, -1)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                  </div>
                </td>
                <td data-label="Total">{formatPrice(total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>  */}
{/* Desktop Table View */}
<div className="wishlist-table-wrapper desktop-only">
  <table className="wishlist-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {validItems.map((item, index) => {
        const quantity = quantities[item._id] || 1;
        const total = parseFloat(item.price || 0) * quantity;

        return (
          <tr key={`${item._id}-${item.selectedVariantIndex}-${index}`}>
            <td data-label="Product">
              <div className="wishlist-product">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <div className="wishlist-name">{item.name}</div>
                  <div className="wishlist-actions">
                    <button onClick={() => handleViewDetails(item)}>👁️</button>
                    <button onClick={() => handleAddToCart(item)}>🛒</button>
                    <button onClick={() => removeFromWishlist(item._id, item.selectedVariantIndex)}>❌</button>
                  </div>
                </div>
              </div>
            </td>
            <td data-label="Price">{formatPrice(item.price)}</td>
            <td data-label="Qty">
              <div className="wishlist-qty">
                <button onClick={() => handleQuantityChange(item, -1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(item, 1)}>+</button>
              </div>
            </td>
            <td data-label="Total">{formatPrice(total)}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

      {/* Mobile Card View */}
      <div className="mobile-only">
        {validItems.map((item, index) => {
          const quantity = quantities[item._id] || 1;
          const total = parseFloat(item.price || 0) * quantity;

          return (
            <div key={`${item._id}-${index}`} className="wishlist-mobile-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="wishlist-mobile-details">
                <div className="wishlist-name">{item.name}</div>
                <div className="wishlist-mobile-actions">
                  <button onClick={() => handleViewDetails(item)}>👁️</button>
                  <button onClick={() => handleAddToCart(item)}>🛒</button>
                  <button onClick={() => removeFromWishlist(item._id, item.selectedVariantIndex)}>❌</button>
                </div>
                <div className="wishlist-qty">
                  <button onClick={() => handleQuantityChange(item, -1)}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                </div>
                <div className="wishlist-total">Total: {formatPrice(total)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;

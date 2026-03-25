import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CartIcon.css';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = savedCart.reduce((sum, item) => sum + (item.userQuantity || 1), 0);
    setCartCount(totalItems);
  }, [location]); // Updates when route changes

  return (
    <div className="cart-header-icon">
      <Link to="/cart" className="cart-link">
        🛒
        {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
      </Link>
    </div>
  );
};

export default CartIcon;



/*import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartIcon.css';

const CartPage = () => {
  const { cart, removeItemFromCart, updateItemQuantity } = useCart();
  const navigate = useNavigate();

  const getItemPrice = (item) => {
    if (item.variants && Array.isArray(item.variants)) {
      const variant = item.variants[item.selectedVariantIndex || 0];
      return variant ? variant.price : item.price;
    }
    return item.price;
  };

  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cart } });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <button className="cart-back-btn" onClick={handleBack}>←</button>
        <h2 className="cart-title">Your Cart 🛒</h2>
      </div>

      {cart.length === 0 ? (
        <p className="cart-empty-msg">
          No items in your cart. <Link to="/products">Start Shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const price = getItemPrice(item);
                  return (
                    <tr key={index}>
                      <td className="cart-product-cell">
                        <img src={item.imageUrl || '/placeholder.jpg'} alt={item.name} />
                        <span>{item.name}</span>
                      </td>
                      <td>₹{price}</td>
                      <td>
                        <div className="cart-qty-controls">
                          <button
                            onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td>₹{(price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button className="cart-remove-btn" onClick={() => removeItemFromCart(item._id)}>
                          ❌
                        </button>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-summary-section">
            <h3>Subtotal: ₹{getSubtotal()}</h3>
            <p>{cart.length} {cart.length === 1 ? 'product' : 'products'} in cart</p>
            <div className="cart-btn-group">
              
              <Link to="/products" className="btn gray-outline">Continue Shopping</Link>
<button className="btn green-filled" onClick={handleCheckout}>Checkout</button>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;*/


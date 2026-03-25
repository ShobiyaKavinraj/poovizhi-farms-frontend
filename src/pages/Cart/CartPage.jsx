import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './cartPage.css';

const CartPage = () => {
  const { cart, removeItemFromCart, updateItemQuantity } = useCart();
  const navigate = useNavigate();

  const getItemPrice = (item) => {
    if (item.product?.variants?.length) {
      const index = item.product.selectedVariantIndex ?? 0;
      return item.product.variants[index]?.price || item.product.price || 0;
    }
    return item.product?.price || 0;
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
          {/* 🖥 Desktop layout */}
          <div className="cart-table-wrapper desktop-only">
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
                        <img
                          src={item.product?.imageUrl || '/placeholder.jpg'}
                          alt={item.product?.name || 'Product'}
                        />
                        <span>{item.product?.name}</span>
                      </td>
                      <td>₹{price.toFixed(2)}</td>
                      <td>
                        <div className="cart-qty-controls">
                          <button
                            onClick={() => updateItemQuantity(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >−</button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(item.product._id, item.quantity + 1)}
                          >+</button>
                        </div>
                      </td>
                      <td>₹{(price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeItemFromCart(item.product._id)}
                        >❌</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 📱 Mobile layout */}
          <div className="cart-mobile-wrapper mobile-only">
            {cart.map((item, index) => {
              const price = getItemPrice(item);
              return (
                <div className="cart-mobile-item" key={index}>
                  <img
                    src={item.product?.imageUrl || '/placeholder.jpg'}
                    alt={item.product?.name || 'Product'}
                  />
                  <div className="cart-product-details">
                    <div><strong>{item.product?.name}</strong></div>
                    <div>Price: ₹{price.toFixed(2)}</div>

                    <div className="cart-qty-controls">
                      <button
                        onClick={() => updateItemQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.product._id, item.quantity + 1)}
                      >+</button>
                    </div>

                    <div className="cart-total-line">Total: ₹{(price * item.quantity).toFixed(2)}</div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItemFromCart(item.product._id)}
                    >❌ Remove</button>
                  </div>
                </div>
              );
            })}
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

export default CartPage;

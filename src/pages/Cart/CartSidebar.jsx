import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";
import "./CartSidebar.css";

const CartSidebar = () => {
  const { cart, removeItemFromCart, updateItemQuantity, cartSidebarOpen, setCartSidebarOpen } = useCart();
  const navigate = useNavigate();

  const getItemPrice = (item) => {
    if (item.product?.variants?.length) {
      const index = item.product.selectedVariantIndex ?? 0;
      return item.product.variants[index]?.price || item.product.price || 0;
    }
    return item.product?.price || 0;
  };

  const subtotal = cart.reduce((total, item) => total + getItemPrice(item) * item.quantity, 0);

  return (
    <>
      <div
        className={`cs-sidebar-overlay ${cartSidebarOpen ? "cs-visible" : ""}`}
        onClick={() => setCartSidebarOpen(false)}
      ></div>

      <div className={`cs-sidebar ${cartSidebarOpen ? "cs-open" : ""}`}>
        <div className="cs-header">
          <h3>Your Shopping Cart 🛒</h3>
          <button className="cs-close-btn" onClick={() => setCartSidebarOpen(false)}>✖</button>
        </div>

        <div className="cs-content">
          {cart.length === 0 ? (
            <p className="cs-empty-msg">Your cart is empty.</p>
          ) : (
            cart.map((item, i) => {
              const price = getItemPrice(item);
              return (
                <div key={i} className="cs-item">
                  <img src={item.product?.imageUrl || "/placeholder.jpg"} alt={item.product?.name} />
                  <div className="cs-item-details">
                    <p className="cs-item-name">{item.product?.name}</p>
                    <p className="cs-item-price">₹{price.toFixed(2)}</p>

                    <div className="cs-qty-controls-box">
                      <button
                        onClick={() => updateItemQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.product._id, item.quantity + 1)}
                      >+</button>
                    </div>

                    <button
                      className="cs-delete-btn"
                      onClick={() => removeItemFromCart(item.product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cs-footer">
            <div className="cs-subtotal">
              <span>Subtotal:</span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>
            <p className="cs-tax-note">
              Tax included and shipping calculated at checkout
            </p>

            <button
              className="cs-view-cart-btn"
              onClick={() => {
                navigate("/cart");
                setCartSidebarOpen(false);
              }}
            >
              View Cart Page
            </button>

            <button
              className="cs-checkout-btn"
              onClick={() => {
                navigate("/checkout");
                setCartSidebarOpen(false);
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

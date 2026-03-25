import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './AddressPage.css';
import { FaLeaf } from 'react-icons/fa';

function CheckoutAddressPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cart || [];

  const [phone, setPhone] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [addressData, setAddressData] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('Standard');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const totalAmount = cartItems.reduce((total, item) => {
    const variant = item.variants?.[item.selectedVariantIndex];
    const price = variant?.price || item.price;
    return total + price * item.quantity;
  }, 0);

  const shippingCharge = shippingMethod === 'Standard' ? 26 : 130;
  const finalTotal = totalAmount - discount + shippingCharge;

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(0.1 * totalAmount); // 10% off
      alert('Coupon applied successfully!');
    } else {
      setDiscount(0);
      alert('Invalid coupon code.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const sanitizedCartItems = cartItems.map(({ _id, ...rest }) => rest);

    const data = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phone,
      house: e.target.house.value,
      street: e.target.street.value,
      city: e.target.city.value,
      pincode: e.target.pincode.value,
      country: e.target.country.value,
      addressType,
      cartItems: sanitizedCartItems,
    };

    setAddressData(data);
  };

  const handlePayment = async () => {
    try {
      const orderDetails = {
        ...addressData,
        shippingMethod,
        totalAmount: finalTotal,
      };

      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        navigate('/thankyou');
      } else {
        alert('Order could not be placed.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('An error occurred while placing the order.');
    }
  };
  


  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate('/checkout')}>←</button>
        <div className="brand">
          <FaLeaf size={30} color="green" />
          <span>Poovizhi Farms</span>
        </div>
        <div className="order-total">Total: ₹{finalTotal.toFixed(2)}</div>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        <h3>Cart Items</h3>
        {cartItems.map((item, index) => {
          const variant = item.variants?.[item.selectedVariantIndex];
          const price = variant?.price || item.price;
          const itemTotal = price * item.quantity;

          return (
            <div key={index} className="cart-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
              </div>
              <div className="item-price">₹{itemTotal.toFixed(2)}</div>
            </div>
          );
        })}
        <div className="cart-total">
          Subtotal: ₹{totalAmount.toFixed(2)}<br />
          Discount: -₹{discount.toFixed(2)}<br />
          Shipping: ₹{shippingCharge.toFixed(2)}<br />
          <strong>Final Total: ₹{finalTotal.toFixed(2)}</strong>
        </div>
      </div>

      {/* Coupon */}
      <div className="coupon-section">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="coupon-input"
        />
        <button onClick={applyCoupon} className="apply-coupon-btn">Apply Coupon</button>
      </div>

      {/* Address Form */}
      <form onSubmit={handleFormSubmit} className="address-form">
        <h3>Shipping Address</h3>
        <input name="fullName" type="text" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />

        <PhoneInput
          country={'in'}
          value={phone}
          onChange={setPhone}
          inputProps={{
            name: 'phone',
            required: true,
          }}
          placeholder="Phone Number"
        />

        <input name="house" type="text" placeholder="House No / Area" required />
        <input name="street" type="text" placeholder="Street Address" required />
        <input name="city" type="text" placeholder="City" required />
        <input name="pincode" type="text" placeholder="Pincode" required />

        <select name="country" required>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>

        <div className="type-buttons">
          {['Home', 'Work', 'Other'].map((type) => (
            <button
              type="button"
              key={type}
              className={addressType === type ? 'selected' : ''}
              onClick={() => setAddressType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <button type="submit" className="submit-btn">Continue</button>
      </form>

      {/* Shipping + Place Order */}
      {addressData && (
        <div className="delivery-options">
          <div className="delivery-address">
            <h4>Delivery Address</h4>
            <div>
              <strong>{addressData.fullName}</strong>, {addressData.house}, {addressData.street}, {addressData.city}, {addressData.pincode}, {addressData.country}
              <div>📧 {addressData.email}</div>
              <div>📞 {addressData.phone}</div>
              <div>Type: {addressData.addressType}</div>
            </div>
          </div>

          <div className="shipping-options">
            <h4>Shipping Method</h4>
            <label>
              <input
                type="radio"
                name="shipping"
                value="Standard"
                checked={shippingMethod === 'Standard'}
                onChange={() => setShippingMethod('Standard')}
              />
              Standard (+ ₹26)
            </label>
            <label>
              <input
                type="radio"
                name="shipping"
                value="COD"
                checked={shippingMethod === 'COD'}
                onChange={() => setShippingMethod('COD')}
              />
              Cash on Delivery (+ ₹130)
            </label>
          </div>

          <button onClick={handlePayment} className="place-order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}

export default CheckoutAddressPage;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './AddressPage.css';
import { FaLeaf } from 'react-icons/fa';

function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cart || []);

  const [phone, setPhone] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [addressData, setAddressData] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
// const [shippingMethod, setShippingMethod] = useState('Standard');

  const updateCartQuantity = (index, change) => {
    setCartItems((prev) => {
      const newCart = [...prev];
      newCart[index].quantity = Math.max(1, newCart[index].quantity + change);
      return newCart;
    });
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const variant = item.variants?.[item.selectedVariantIndex];
    const price = variant?.price || item.price;
    return total + price * item.quantity;
  }, 0);

  const shippingCharge = 26;
  // const shippingCharge = shippingMethod === 'Standard' ? 26 : 130;
  const finalTotal = totalAmount - discount + shippingCharge;

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(0.1 * totalAmount);
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
  

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const orderDetails = {
        ...addressData,
        shippingMethod: 'Standard',
        totalAmount: finalTotal,
      };

      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

     /*const options = {
        key: 'rzp_test_eZB08trUTj9Vze',
        amount: data.amount,
        currency: 'INR',
        name: 'Poovizhi Farms',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: function (response) {
          alert('Payment successful!');
          navigate('/thankyou');
        },
        prefill: {
          name: addressData.fullName,
          email: addressData.email,
          contact: addressData.phone,
        },
        notes: {
          address: `${addressData.house}, ${addressData.street}, ${addressData.city}`,
        },
        theme: { color: '#3399cc' },
        method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },
 
      
      
      
};*/
      const options = {
  key: 'rzp_test_eZB08trUTj9Vze',
  amount: data.amount,
  currency: 'INR',
  name: 'Poovizhi Farms',
  description: 'Order Payment',
  order_id: data.orderId,
  handler: function (response) {
    alert('Payment successful!');
    navigate('/thankyou');
  },
  prefill: {
    name: addressData.fullName,
    email: addressData.email,
    contact: addressData.phone,
  },
  notes: {
    address: `${addressData.house}, ${addressData.street}, ${addressData.city}`,
  },
  theme: { color: '#3399cc' },
  method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },
  config: {
    display: {
      blocks: {
        upi: {
          name: "Pay using UPI",
          instruments: [
            {
              method: "upi",
              flows: ["collect", "intent", "qr"], // Enables Google Pay + QR Code
            },
          ],
        },
      },
      sequence: ["block.upi"],
      preferences: {
        show_default_blocks: false,
      },
    },
  },
};


      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
      alert('An error occurred while placing the order.');
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <div className="brand">
          <FaLeaf size={30} color="green" />
          <span>Poovizhi Farms</span>
        </div>
        <div className="order-total">Total: ₹{finalTotal.toFixed(2)}</div>
      </div>

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
                <div className="item-quantity">
                  <button onClick={() => updateCartQuantity(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(index, 1)}>+</button>
                </div>
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

      <form onSubmit={handleFormSubmit} className="address-form">
        <h3>Shipping Address</h3>
        <input name="fullName" type="text" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />

        <PhoneInput
          country={'in'}
          value={phone}
          onChange={setPhone}
          inputProps={{ name: 'phone', required: true }}
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
            <p>Standard Shipping (₹26)</p>
          </div>

          <button onClick={handlePayment} className="place-order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}

export default CheckOut;

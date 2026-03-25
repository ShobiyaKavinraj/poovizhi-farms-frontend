import './DeliveryDetails.css'
import React from 'react';

const DeliveryDetails = ({
  addressData,
  shippingMethod,
  onShippingChange,
  billingMethod,
  onBillingChange,
  onPlaceOrder
}) => (
  <div className="delivery-options">
    <div className="delivery-address">
      <h4>Delivery Address</h4>
      <div>
        <strong>{addressData.fullName}</strong>, {addressData.house}, {addressData.street},<br />
        {addressData.city} - {addressData.pincode}, {addressData.country}
        <div>📧 {addressData.email}</div>
        <div>📞 {addressData.phone}</div>
        <div>Type: {addressData.addressType}</div>
      </div>
    </div>

    <div className="shipping-options">
      <h4>Shipping Method</h4>
      <select value={shippingMethod} onChange={(e) => onShippingChange(e.target.value)}>
        <option value="Standard">Standard Shipping (₹26)</option>
        <option value="Express">Express Shipping (₹130)</option>
      </select>
    </div>

    <div className="billing-options">
      <h4>Billing Method</h4>
      <select value={billingMethod} onChange={(e) => onBillingChange(e.target.value)}>
        <option value="Online">Online Payment</option>
        <option value="COD">Cash on Delivery</option>
      </select>
    </div>

    <button onClick={onPlaceOrder} className="place-order-btn">Place Order</button>
  </div>
);

export default DeliveryDetails;

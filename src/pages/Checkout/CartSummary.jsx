// import React from 'react';
// import './AddressForm.css'; // or cartSummary.css

// const CartSummary = ({
//   totalAmount = 0,
//   discount = 0,
//   shippingCharge = 0,
//   finalTotal = 0,
//   couponCode,
//   onCouponChange,
//   onApplyCoupon
// }) => {
//   return (
//     <div className="cart-summary">
//       <div className="coupon-section">
//         <input
//           type="text"
//           placeholder="Enter Coupon Code"
//           value={couponCode}
//           onChange={(e) => onCouponChange(e.target.value)}
//           className="coupon-input"
//         />
//         <button onClick={onApplyCoupon} className="apply-coupon-btn">Apply Coupon</button>
//       </div>

//       <div className="cart-total">
//         Subtotal: ₹{Number(totalAmount).toFixed(2)}<br />
//         Discount: -₹{Number(discount).toFixed(2)}<br />
//         Shipping: ₹{Number(shippingCharge).toFixed(2)}<br />
//         <strong>Final Total: ₹{Number(finalTotal).toFixed(2)}</strong>
//       </div>
//     </div>
//   );
// };

// export default CartSummary;

import React from 'react';
import './AddressForm.css'; // or use cartSummary.css if separated

const CartSummary = ({
  totalAmount = 0,
  discount = 0,
  shippingCharge = 0,
  finalTotal = 0,
  couponCode = '',
  onCouponChange,
  onApplyCoupon
}) => {
  return (
    <div className="cart-summary">
      <div className="coupon-section">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value)}
          className="coupon-input"
        />
        <button onClick={onApplyCoupon} className="apply-coupon-btn">
          Apply Coupon
        </button>
      </div>

      <div className="cart-total">
        Subtotal: ₹{Number(totalAmount || 0).toFixed(2)}<br />
        Discount: -₹{Number(discount || 0).toFixed(2)}<br />
        Shipping: ₹{Number(shippingCharge || 0).toFixed(2)}<br />
        <strong>Final Total: ₹{Number(finalTotal || 0).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default CartSummary;

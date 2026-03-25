// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import 'react-phone-input-2/lib/style.css';
// import './checkouts.css';
// import { FaLeaf } from 'react-icons/fa';
// // import DeliveryDetails from './DeliveryDetails';
// import CartItem from './CartItem';
// import CartSummary from './CartSummary';
// // import AddressForm from './AddressForm';
// import BillingAddressForm from './BillingAddressForm';
// import LoginForm from "../Forms/LoginForm";

// function CheckOuts() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Cart and user states
//   const [cartItems, setCartItems] = useState(location.state?.cart || []);
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Delivery form fields
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [address, setAddress] = useState('');
//   const [apartment, setApartment] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('Tamil Nadu');
//   const [pinCode, setPinCode] = useState('');
//   const [phone, setPhone] = useState('');

//   const [saveInfo, setSaveInfo] = useState(false);
//   const [subscribe, setSubscribe] = useState(false);

//   // Shipping and billing
//   const [shippingAddress, setShippingAddress] = useState(null);
//   const [useDifferentBilling, setUseDifferentBilling] = useState(false);
//   const [billingAddress, setBillingAddress] = useState(null);

//   // Shipping & payment methods
//   const [shippingMethod, setShippingMethod] = useState('Standard');
//   const [billingMethod, setBillingMethod] = useState('Online');

//   // Coupon & discount
//   const [couponCode, setCouponCode] = useState('');
//   const [discount, setDiscount] = useState(0);

//   // On mount: login + saved address
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedEmail = localStorage.getItem('userEmail');

//     if (token && savedEmail) {
//       setIsLoggedIn(true);
//       setUserEmail(savedEmail);
//     } else {
//       setIsLoggedIn(false);
//     }

//     const savedShipAddr = JSON.parse(localStorage.getItem('savedAddress'));
//     if (savedShipAddr) {
//       setShippingAddress(savedShipAddr);

//       // Also set form fields from saved address
//       setFirstName(savedShipAddr.fullName?.split(' ')[0] || '');
//       setLastName(savedShipAddr.fullName?.split(' ')[1] || '');
//       setAddress(savedShipAddr.address || '');
//       setApartment(savedShipAddr.apartment || '');
//       setCity(savedShipAddr.city || '');
//       setState(savedShipAddr.state || 'Tamil Nadu');
//       setPinCode(savedShipAddr.pinCode || '');
//       setPhone(savedShipAddr.phone || '');
//     }
//   }, []);

//   // Redirect if cart empty
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate('/cart');
//     }
//   }, [cartItems, navigate]);

//   // Price calculations
//   const totalAmount = cartItems.reduce((total, item) => {
//     const product = item.product || {};
//     const variant = product.variants?.[product.selectedVariantIndex ?? 0];
//     const price = Number(variant?.price || product.price || 0);
//     return total + price * Number(item.quantity || 0);
//   }, 0);

//   const shippingCharge = shippingMethod === 'Standard' ? 26 : 130;
//   const finalTotal = totalAmount - discount + shippingCharge;

//   // Quantity change
//   const updateCartQuantity = (index, delta) => {
//     setCartItems(prev => {
//       const updated = [...prev];
//       updated[index].quantity = Math.max(1, Number(updated[index].quantity) + delta);
//       return updated;
//     });
//   };

//   // Coupon apply
//   const applyCoupon = () => {
//     if (couponCode.trim().toUpperCase() === 'SAVE10') {
//       setDiscount(0.1 * totalAmount);
//       alert('Coupon applied!');
//     } else {
//       setDiscount(0);
//       alert('Invalid coupon code.');
//     }
//   };

//   // Save shipping address from delivery form fields
//   const saveShippingAddress = () => {
//     if (!firstName || !lastName || !address || !city || !state || !pinCode || !phone) {
//       alert('Please fill all required shipping address fields.');
//       return false;
//     }
//     const fullName = `${firstName} ${lastName}`;
//     const addrObj = { fullName, address, apartment, city, state, pinCode, phone };
//     setShippingAddress(addrObj);
//     if(saveInfo) localStorage.setItem('savedAddress', JSON.stringify(addrObj));
//     return true;
//   };

//   // Billing address submit
//   const handleBillingSubmit = (values) => {
//     setBillingAddress(values);
//   };

//   // Payment handler
//   const handlePayment = async () => {
//     if (!shippingAddress) {
//       alert('Please fill the shipping address.');
//       return;
//     }

//     if (useDifferentBilling && !billingAddress) {
//       alert('Please fill the billing address.');
//       return;
//     }

//     const finalBillingAddress = useDifferentBilling ? billingAddress : shippingAddress;

//     if (billingMethod === 'COD') {
//       alert('Order placed with Cash on Delivery!');
//       navigate('/thankyou');
//       return;
//     }

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       alert('Razorpay SDK failed to load.');
//       return;
//     }

//     try {
//       const cartPayload = cartItems.map(item => {
//         const product = item.product || item;
//         const variant = product.variants?.[product.selectedVariantIndex ?? 0];
//         return {
//           name: product.name,
//           price: Number(variant?.price || product.price || 0),
//           quantity: item.quantity,
//           image: product.image || '/placeholder.jpg',
//         };
//       });

//       const res = await fetch('http://localhost:5000/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           shippingAddress,
//           billingAddress: finalBillingAddress,
//           cartItems: cartPayload,
//           shippingMethod,
//           billingMethod,
//           totalAmount: finalTotal,
//         }),
//       });

//       const data = await res.json();

//       const options = {
//         key: 'rzp_test_ZQZhS7HFimUKjv',
//         amount: data.amount,
//         currency: 'INR',
//         name: 'Poovizhi Farms',
//         description: 'Order Payment',
//         order_id: data.orderId,
//         handler: () => {
//           alert('✅ Payment Verified & Order Placed!');
//           navigate('/thankyou');
//         },
//         prefill: {
//           name: shippingAddress.fullName,
//           email: userEmail,
//           contact: shippingAddress.phone,
//         },
//         theme: { color: '#3b873e' },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Payment initiation failed.');
//     }
//   };

//   // Load Razorpay SDK script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   return (
//     <div className="checkout-container">

//       {/* Header */}
//       <div className="checkout-header">
//         <button className="back-btn" onClick={() => navigate('/cart')}>←</button>
//         <div className="brand">
//           <FaLeaf size={30} color="green" />
//           <span>Poovizhi Farms</span>
//         </div>
//         <div className="order-total">Total: ₹{finalTotal.toFixed(2)}</div>
//       </div>

//       {/* Cart Items and Summary */}
//       <div className="cart-items">
//         <h3>Your Items</h3>
//         {cartItems.map((item, index) => (
//           <CartItem
//             key={index}
//             item={item}
//             index={index}
//             onQuantityChange={updateCartQuantity}
//             onDelete={(i) => setCartItems(prev => prev.filter((_, idx) => idx !== i))}
//           />
//         ))}
//         <CartSummary
//           totalAmount={totalAmount}
//           discount={discount}
//           shippingCharge={shippingCharge}
//           finalTotal={finalTotal}
//           couponCode={couponCode}
//           onCouponChange={setCouponCode}
//           onApplyCoupon={applyCoupon}
//         />
//       </div>

//       {/* Contact (Login + Email) */}
//       <section className="contact-info">
//         <h2>Contact</h2>
        
//          {/* Login form */}
// {!isLoggedIn ? (
//   <LoginForm 
//     onLogin={(email) => {
//       setUserEmail(email);
//       setIsLoggedIn(true);
//       localStorage.setItem('userEmail', email);
//     }} 
//     redirectPath={location.pathname}  // Pass current path here
//   />
// ) : (
//   <>
//     <p>Logged in as: {userEmail}</p>
//     <label>
//       Email me with news and offers
//       <input 
//         type="checkbox" 
//         checked={subscribe} 
//         onChange={e => setSubscribe(e.target.checked)} 
//       />
//     </label>
//   </>
// )}

//       </section>

//       {/* Delivery Address Form */}
//       <section className="delivery-info">
//         <h2>Delivery</h2>
//         <form onSubmit={e => { e.preventDefault(); saveShippingAddress(); }}>
//           <label>
//             First name
//             <input 
//               type="text" 
//               value={firstName} 
//               onChange={e => setFirstName(e.target.value)} 
//               required 
//             />
//           </label>
//           <label>
//             Last name
//             <input 
//               type="text" 
//               value={lastName} 
//               onChange={e => setLastName(e.target.value)} 
//               required 
//             />
//           </label>
//           <label>
//             Address
//             <input 
//               type="text" 
//               value={address} 
//               onChange={e => setAddress(e.target.value)} 
//               required 
//             />
//           </label>
//           <label>
//             Apartment, suite, etc. (optional)
//             <input 
//               type="text" 
//               value={apartment} 
//               onChange={e => setApartment(e.target.value)} 
//             />
//           </label>
//           <label>
//             City
//             <input 
//               type="text" 
//               value={city} 
//               onChange={e => setCity(e.target.value)} 
//               required 
//             />
//           </label>
//           <label>
//             State
//             <select 
//               value={state} 
//               onChange={e => setState(e.target.value)} 
//               required
//             >
//               <option value="Tamil Nadu">Tamil Nadu</option>
//               {/* add more states here if needed */}
//             </select>
//           </label>
//           <label>
//             PIN code
//             <input 
//               type="text" 
//               value={pinCode} 
//               onChange={e => setPinCode(e.target.value)} 
//               required 
//             />
//           </label>
//           <label>
//             Phone
//             <input 
//               type="tel" 
//               value={phone} 
//               onChange={e => setPhone(e.target.value)} 
//               required 
//             />
//           </label>

//           <label>
//             <input 
//               type="checkbox" 
//               checked={saveInfo} 
//               onChange={e => setSaveInfo(e.target.checked)} 
//             />
//             Save this information for next time
//           </label>

//           <button type="button" onClick={saveShippingAddress}>
//             Save Shipping Address
//           </button>
//         </form>
//       </section>

//       {/* Shipping Method */}
//       <section className="shipping-method">
//         <h2>Shipping method</h2>
//         <p>Enter your shipping address to view available shipping methods.</p>
//         <select 
//           value={shippingMethod} 
//           onChange={e => setShippingMethod(e.target.value)}
//         >
//           <option value="Standard">Standard - ₹26</option>
//           <option value="Express">Express - ₹130</option>
//         </select>
//       </section>

//       {/* Payment Section */}
//       <section className="payment-info">
//         <h2>Payment</h2>
//         <p>All transactions are secure and encrypted.</p>
//         <p><strong>Razorpay Secure</strong> (UPI, Cards, Wallets, NetBanking)</p>
//         <p>upivisamasterrupay +16</p>
//         <p>Additional payment methods</p>
//         <p>After clicking “Pay now”, you will be redirected to Razorpay Secure to complete your purchase securely.</p>

//         <label>
//           <input 
//             type="radio" 
//             name="billingMethod" 
//             value="Online"
//             checked={billingMethod === 'Online'}
//             onChange={() => setBillingMethod('Online')}
//           />
//           Online Payment
//         </label>
//         <label>
//           <input 
//             type="radio" 
//             name="billingMethod" 
//             value="COD"
//             checked={billingMethod === 'COD'}
//             onChange={() => setBillingMethod('COD')}
//           />
//           Cash on Delivery (COD)
//         </label>
//       </section>

//       {/* Billing Address */}
//       <section className="billing-address-choice">
//         <h2>Billing address</h2>
//         <label>
//           <input 
//             type="radio" 
//             checked={!useDifferentBilling} 
//             onChange={() => setUseDifferentBilling(false)} 
//           />
//           Same as shipping address
//         </label>
//         <label>
//           <input 
//             type="radio" 
//             checked={useDifferentBilling} 
//             onChange={() => setUseDifferentBilling(true)} 
//           />
//           Use a different billing address
//         </label>

//         {useDifferentBilling && (
//           <BillingAddressForm onSubmit={handleBillingSubmit} />
//         )}
//       </section>

//       {/* Submit Button */}
//       <section className="submit-order">
//         <button onClick={handlePayment}>Pay Now</button>
//       </section>
//     </div>
//   );
// }

// export default CheckOuts;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import 'react-phone-input-2/lib/style.css';
// import './Checkout.css';
// import { FaLeaf } from 'react-icons/fa';
// import DeliveryDetails from './DeliveryDetails';
// import CartItem from './CartItem';
// import CartSummary from './CartSummary';
// import AddressForm from './AddressForm';
// import BillingAddressForm from './BillingAddressForm';
// import LoginForm from "../Forms/LoginForm";


// function CheckOuts() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [cartItems, setCartItems] = useState(location.state?.cart || []);
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [shippingAddress, setShippingAddress] = useState(null);
//   const [showShippingForm, setShowShippingForm] = useState(false);

//   const [billingAddress, setBillingAddress] = useState(null);
//   const [useDifferentBilling, setUseDifferentBilling] = useState(false);

//   const [couponCode, setCouponCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [shippingMethod, setShippingMethod] = useState('Standard');
//   const [billingMethod, setBillingMethod] = useState('Online');

//   // ✅ On mount → Check login + load saved addresses
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedEmail = localStorage.getItem('userEmail');

//     if (token && savedEmail) {
//       setIsLoggedIn(true);
//       setUserEmail(savedEmail);
//     } else {
//       setIsLoggedIn(false);
//     }

//     const savedShipAddr = JSON.parse(localStorage.getItem('savedAddress'));
//     if (savedShipAddr) {
//       setShippingAddress(savedShipAddr);
//     } else {
//       setShowShippingForm(true);
//     }
//   }, []);

//   // ✅ Redirect if cart empty
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate('/cart');
//     }
//   }, [cartItems, navigate]);

//   // 📦 Price calculations
//   const totalAmount = cartItems.reduce((total, item) => {
//     const product = item.product || {};
//     const variant = product.variants?.[product.selectedVariantIndex ?? 0];
//     const price = Number(variant?.price || product.price || 0);
//     return total + price * Number(item.quantity || 0);
//   }, 0);

//   const shippingCharge = shippingMethod === 'Standard' ? 26 : 130;
//   const finalTotal = totalAmount - discount + shippingCharge;

//   // 🔄 Quantity change
//   const updateCartQuantity = (index, delta) => {
//     setCartItems(prev => {
//       const updated = [...prev];
//       updated[index].quantity = Math.max(1, Number(updated[index].quantity) + delta);
//       return updated;
//     });
//   };

//   // 🎟 Coupon apply
//   const applyCoupon = () => {
//     if (couponCode.trim().toUpperCase() === 'SAVE10') {
//       setDiscount(0.1 * totalAmount);
//       alert('Coupon applied!');
//     } else {
//       setDiscount(0);
//       alert('Invalid coupon code.');
//     }
//   };

//   // 🏠 Save new shipping address
//   const handleShippingSubmit = (values) => {
//     setShippingAddress(values);
//     localStorage.setItem('savedAddress', JSON.stringify(values));
//     setShowShippingForm(false);
//   };

//   // 🏠 Save new billing address
//   const handleBillingSubmit = (values) => {
//     setBillingAddress(values);
//   };

//   // ❌ Delete cart item
//   const handleDeleteItem = (index) => {
//     setCartItems(prev => prev.filter((_, i) => i !== index));
//   };

//   // 💳 Payment handler
//   const handlePayment = async () => {
//     if (!shippingAddress) {
//       alert('Please fill the shipping address.');
//       return;
//     }

//     if (useDifferentBilling && !billingAddress) {
//       alert('Please fill the billing address.');
//       return;
//     }

//     const finalBillingAddress = useDifferentBilling ? billingAddress : shippingAddress;

//     if (billingMethod === 'COD') {
//       alert('Order placed with Cash on Delivery!');
//       navigate('/thankyou');
//       return;
//     }

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       alert('Razorpay SDK failed to load.');
//       return;
//     }

//     try {
//       const cartPayload = cartItems.map(item => {
//         const product = item.product || item;
//         const variant = product.variants?.[product.selectedVariantIndex ?? 0];
//         return {
//           name: product.name,
//           price: Number(variant?.price || product.price || 0),
//           quantity: item.quantity,
//           image: product.image || '/placeholder.jpg',
//         };
//       });

//       const res = await fetch('http://localhost:5000/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           shippingAddress,
//           billingAddress: finalBillingAddress,
//           cartItems: cartPayload,
//           shippingMethod,
//           billingMethod,
//           totalAmount: finalTotal,
//         }),
//       });

//       const data = await res.json();

//       const options = {
//         key: 'rzp_test_ZQZhS7HFimUKjv',
//         amount: data.amount,
//         currency: 'INR',
//         name: 'Poovizhi Farms',
//         description: 'Order Payment',
//         order_id: data.orderId,
//         handler: () => {
//           alert('✅ Payment Verified & Order Placed!');
//           navigate('/thankyou');
//         },
//         prefill: {
//           name: shippingAddress.fullName,
//           email: shippingAddress.email,
//           contact: shippingAddress.phone,
//         },
//         theme: { color: '#3b873e' },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Payment initiation failed.');
//     }
//   };

//   // 📜 Load Razorpay script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   return (
//     <div className="checkout-container">
//       {/* Header */}
//       <div className="checkout-header">
//         <button className="back-btn" onClick={() => navigate('/cart')}>←</button>
//         <div className="brand">
//           <FaLeaf size={30} color="green" />
//           <span>Poovizhi Farms</span>
//         </div>
//         <div className="order-total">Total: ₹{finalTotal.toFixed(2)}</div>
//       </div>

//       {/* Login */}
//       {!isLoggedIn ? (
//         <LoginForm onLogin={(email) => { setUserEmail(email); setIsLoggedIn(true); localStorage.setItem('userEmail', email); }} />
//       ) : (
//         <div className="user-email">Logged in as: {userEmail}</div>
//       )}

//       {/* Cart Items */}
//       <div className="cart-items">
//         <h3>Your Items</h3>
//         {cartItems.map((item, index) => (
//           <CartItem
//             key={index}
//             item={item}
//             index={index}
//             onQuantityChange={updateCartQuantity}
//             onDelete={handleDeleteItem}
//           />
//         ))}
//         <CartSummary
//           totalAmount={totalAmount}
//           discount={discount}
//           shippingCharge={shippingCharge}
//           finalTotal={finalTotal}
//           couponCode={couponCode}
//           onCouponChange={setCouponCode}
//           onApplyCoupon={applyCoupon}
//         />
//       </div>

//       {/* Shipping Address */}
//       {showShippingForm ? (
//         <AddressForm onSubmit={handleShippingSubmit} />
//       ) : (
//         shippingAddress && (
//           <DeliveryDetails
//             addressData={shippingAddress}
//             shippingMethod={shippingMethod}
//             onShippingChange={setShippingMethod}
//             billingMethod={billingMethod}
//             onBillingChange={setBillingMethod}
//             onPlaceOrder={handlePayment}
//             onEditAddress={() => setShowShippingForm(true)}
//           />
//         )
//       )}

//       {/* Billing Address Option */}
//       <div className="billing-choice">
//         <label>
//           <input
//             type="radio"
//             checked={!useDifferentBilling}
//             onChange={() => setUseDifferentBilling(false)}
//           /> Use same as shipping
//         </label>
//         <label>
//           <input
//             type="radio"
//             checked={useDifferentBilling}
//             onChange={() => setUseDifferentBilling(true)}
//           /> Use different billing address
//         </label>
//       </div>

//       {useDifferentBilling && (
//         <BillingAddressForm onSubmit={handleBillingSubmit} />
//       )}
//     </div>
//   );
// }

// export default CheckOuts;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import './Checkout.css';
import { FaLeaf } from 'react-icons/fa';
import DeliveryDetails from './DeliveryDetails';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import AddressForm from './AddressForm';

function CheckOuts() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cartItems, setCartItems] = useState(location.state?.cart || []);
  const [addressData, setAddressData] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('Standard');
  const [billingMethod, setBillingMethod] = useState('Online');
 

  
  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const totalAmount = cartItems.reduce((total, item) => {
    const product = item.product || item;
    const variant = product.variants?.[product.selectedVariantIndex ?? 0];
    const price = Number(variant?.price || product.price || 0);
    const quantity = Number(item.quantity || 1);
    return total + price * quantity;
  }, 0);

  const shippingCharge = shippingMethod === 'Standard' ? 26 : 130;
  const finalTotal = Number(totalAmount) - Number(discount || 0) + Number(shippingCharge);

  const updateCartQuantity = (index, delta) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      const item = updatedItems[index];
      const newQty = Math.max(1, Number(item.quantity || 1) + delta);
      updatedItems[index] = { ...item, quantity: newQty };
      return updatedItems;
    });
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SAVE10') {
      setDiscount(0.1 * totalAmount);
      alert('Coupon applied!');
    } else {
      setDiscount(0);
      alert('Invalid coupon code.');
    }
  };

  const handleFormSubmit = (values) => {
    setAddressData({
      ...values,
      cartItems: cartItems.map(({ _id, ...rest }) => rest),
    });
  };

  const handleDeleteItem = (indexToDelete) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToDelete));
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
    if (!addressData) {
      alert('Please fill the address form.');
      return;
    }

    if (billingMethod === 'COD') {
      alert('Order placed with Cash on Delivery!');
      navigate('/thankyou');
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    try {
      const cartPayload = cartItems.map((item) => {
        const product = item.product || item;
        const variant = product.variants?.[product.selectedVariantIndex ?? 0];
        return {
          name: product.name,
          price: Number(variant?.price || product.price || 0),
          quantity: item.quantity || 1,
          image: product.image || product.imageUrl || '/placeholder.jpg',
        };
        
      });

      const res = await fetch('https://poovizhi-farms-backend.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: addressData,
          cartItems: cartPayload,
          shippingMethod,
          billingMethod,
          totalAmount: finalTotal,
        }),
      });

      const data = await res.json();

      const options = {
        key: 'rzp_test_ZQZhS7HFimUKjv',
        amount: data.amount,
        currency: 'INR',
        name: 'Poovizhi Farms',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async (response) => {
          const verifyRes = await fetch('https://poovizhi-farms-backend.onrender.com/api/orders/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderDetails: {
                shippingAddress: {
                  fullName: addressData.fullName,
                  email: addressData.email,
                  phone: addressData.phone,
                  house: addressData.house,
                  street: addressData.street,
                  city: addressData.city,
                  state: addressData.state,
                  pincode: addressData.pincode,
                  country: addressData.country,
                  addressType: addressData.addressType,
                },
                cartItems: cartPayload,
                shippingMethod,
                billingMethod,
                totalAmount: finalTotal,
              },
            }),
          });

          const result = await verifyRes.json();

          if (result.success) {
            alert('✅ Payment Verified & Order Placed!');
            navigate('/thankyou');
          } else {
            alert('⚠️ Payment verification failed: ' + result.message);
          }
        },
        prefill: {
          name: addressData.fullName,
          email: addressData.email,
          contact: addressData.phone,
        },
        theme: { color: '#3b873e' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        alert('❌ Payment Failed. Please try again.');
        console.error(response.error);
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Payment initiation failed.');
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
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            index={index}
            onQuantityChange={updateCartQuantity}
            onDelete={handleDeleteItem}
          />
        ))}
        <CartSummary
          totalAmount={totalAmount}
          discount={discount}
          shippingCharge={shippingCharge}
          finalTotal={finalTotal}
          couponCode={couponCode}
          onCouponChange={setCouponCode}
          onApplyCoupon={applyCoupon}
        />
      </div>

      {!addressData && <AddressForm onSubmit={handleFormSubmit} />}

      {addressData && (
        <DeliveryDetails
          addressData={addressData}
          shippingMethod={shippingMethod}
          onShippingChange={setShippingMethod}
          billingMethod={billingMethod}
          onBillingChange={setBillingMethod}
          onPlaceOrder={handlePayment}
          onEditAddress={() => setAddressData(null)} 
        />
      )}
    </div>
  );
}

export default CheckOuts;

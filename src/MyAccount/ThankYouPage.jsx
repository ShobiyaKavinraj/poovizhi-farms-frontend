import React from 'react';
import { useNavigate } from 'react-router-dom';
import './thankYou.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="thank-you-page">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. We appreciate your business!</p>
      <p>You will receive a confirmation email shortly with your order details.</p>
      
      <button className="continue-button" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYouPage;

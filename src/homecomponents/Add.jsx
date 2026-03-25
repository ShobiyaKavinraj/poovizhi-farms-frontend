import React from 'react';
import '../styles/addStyle.css'; 

function Add() {
  return (
    <div className='add'>
      <div className='promo-image'>
        <img src='tuermeric.jpg' alt='Turmeric Promo' />
        <div className='promo-text'>20% OFF • Organic Turmeric</div>
      </div>

      <div className='promo-image'>
        <img src='lemont.png' alt='Hibiscus Promo' />
        <div className='promo-text'>New Arrival • Herbal Tea</div>
      </div>
    </div>
  );
}

export default Add;

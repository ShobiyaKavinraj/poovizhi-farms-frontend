import React, { useState } from 'react';
import {
  FaLeaf,
  FaTruck,
  FaCertificate,
  FaBoxOpen,
  FaAppleAlt,
} from 'react-icons/fa';
import '../styles/HighlightBanner.css';


const data = {
  en: [
    { icon: <FaLeaf style={{ color: '#43a047' }} />, text: 'High Nutrition' }, // Green
    { icon: <FaCertificate style={{ color: '#f9a825' }} />, text: 'Certified Organic' }, // Yellow
    { icon: <FaTruck style={{ color: '#1e88e5' }} />, text: 'Free Delivery ₹499+' }, // Blue
    { icon: <FaAppleAlt style={{ color: '#d32f2f' }} />, text: 'Farm Fresh Produce' }, // Red
    { icon: <FaBoxOpen style={{ color: '#6d4c41' }} />, text: 'Eco-Friendly Packaging' }, // Brown
  ],
  ta: [
    { icon: <FaLeaf style={{ color: '#43a047' }} />, text: 'அதிக ஊட்டச்சத்து' },
    { icon: <FaCertificate style={{ color: '#f9a825' }} />, text: 'சான்றளிக்கப்பட்ட உற்பத்தி' },
    { icon: <FaTruck style={{ color: '#1e88e5' }} />, text: 'ரூ.499க்கு மேல் இலவச டெலிவரி' },
    { icon: <FaAppleAlt style={{ color: '#d32f2f' }} />, text: 'பசுமை விளைச்சல்' },
    { icon: <FaBoxOpen style={{ color: '#6d4c41' }} />, text: 'பசுமை பொதி' },
  ],
};

const HighlightBanner = () => {
  const [lang, setLang] = useState('en');

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  return (
    <div className="highlight-banner">
      <div className="highlight-header">
        <button onClick={toggleLang} className="lang-toggle">
          {lang === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>

      <div className="highlight-track">
        {data[lang].concat(data[lang]).map((item, idx) => (
          <span key={idx} className="highlight-item">
            <span className="icon-bubble">{item.icon}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HighlightBanner;

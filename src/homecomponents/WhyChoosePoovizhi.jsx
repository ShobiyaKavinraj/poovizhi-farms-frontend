import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/WhyChoosePoovizhi.css';
import {
  FaLeaf,
  FaTractor,
  FaHandshake, 
  FaAppleAlt,
  FaBoxOpen,
  FaHeart,
} from 'react-icons/fa';

const reasons = [
  {
    icon: <FaAppleAlt />,
    heading: 'High Nutritional Value',
    text: 'Organic foods retain significantly more natural vitamins, minerals, and antioxidants than conventionally grown produce.',
    bgColor: '#e6f4ea',
    iconColor: '#c62828',
  },
  {
    icon: <FaLeaf />,
    heading: '100% Chemical-Free',
    text: 'We avoid all synthetic fertilizers and harmful pesticides — ensuring your food is safe and toxin-free.',
    bgColor: '#e8f5e9',
    iconColor: '#388e3c',
  },
  {
    icon: <FaTractor />,
    heading: 'Farm-Fresh Daily',
    text: 'Produce is handpicked and delivered fresh — not stored for days in warehouses.',
    bgColor: '#f1f8e9',
    iconColor: '#f57f17',
  },
  {
    icon: <FaHandshake />,
    heading: 'Support Local Farmers',
    text: 'Every purchase helps empower small-scale Tamil Nadu farmers.',
    bgColor: '#edf7ed',
    iconColor: '#43a047',
  },
  {
    icon: <FaBoxOpen />,
    heading: 'Eco-Friendly Packaging',
    text: 'We use recyclable, biodegradable materials to reduce waste.',
    bgColor: '#e0f2f1',
    iconColor: '#00796b',
  },
  {
    icon: <FaHeart />,
    heading: 'Trusted by 1000+ Families',
    text: 'We’ve earned customer loyalty through consistent quality and care.',
    bgColor: '#fce4ec',
    iconColor: '#c2185b',
  },
];

const WhyChoosePoovizhi = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="why-section">
      <h2 className="why-heading">Why Choose Poovizhi Farms?</h2>
      <div className="why-cards-container">
        {reasons.map((item, index) => (
          <div key={index} className="why-card" data-aos="zoom-in">
            <div
              className="why-icon-wrapper"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="why-icon" style={{ color: item.iconColor }}>
                {item.icon}
              </div>
            </div>
            <h3 className="why-title">{item.heading}</h3>
            <p className="why-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoosePoovizhi;

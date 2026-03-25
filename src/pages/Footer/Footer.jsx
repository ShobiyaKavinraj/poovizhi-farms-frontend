import React from 'react';
import './Footer.css';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaInstagram,
  FaCopyright,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-heading">Contact Us</h2>
          <p className="footer-paragraph">
            <FaMapMarkerAlt className="footer-icon" /> 
            <span className="farms">POOVIZHI FARMS</span><br />
            Menasi (P.O),<br />
            Pappireddipatti Taluk - 636904,<br />
            Dharmapuri District, <br />
            Tamil Nadu, INDIA
          </p>
          <p className="footer-paragraph">
            <FaEnvelope className="footer-icon" />{' '}
            <a href="mailto:info@poovizhifarms.com">info@poovizhifarms.com</a>
          </p>
          <p className="footer-paragraph">
            <FaPhoneAlt className="footer-icon" />{' '}
            <a href="tel:9962525197">+9199625 25197</a><br />
            Timing: 9:30 AM – 6:30 PM
          </p>
        </div>

        <div className="footer-right">
          <p className="footer-paragraph">Follow us on social media:</p>
          <div className="social-icons">
            <a
              href="https://wa.me/919962525197"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <FaWhatsapp className="social-icon" />
            </a>
            <a
              href="https://www.instagram.com/poovizhi_farms/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-paragraph">
          <FaCopyright className="footer-icon" /> {currentYear} Poovizhi Farms. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

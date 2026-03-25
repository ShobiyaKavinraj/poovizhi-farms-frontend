import React, { useState } from 'react';
import './contactUs.css';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://poovizhi-farms-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert('Submission failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="contact-us">
      <div className="contact-header">
        <button className="back-bttn" onClick={() => navigate(-1)}>←</button>
        <h1 className="headline">Contact Us</h1>
      </div>

      <div className="contact-info">
        <p>
          <FaMapMarkerAlt className="icon" />
          <span>
            Poovizhi Farms,<br />
            Menasi (P.O),<br />
            Pappireddipatti Taluk,<br />
            Dharmapuri District,<br />
            Pin Code : 636904,<br />
            TamilNadu,<br />
            India.
          </span>
        </p>
        <p>
          <FaPhoneAlt className="teleicon" />
          <a href="tel:9962525197">99625 25197</a>
        </p>
      </div>

      {isSubmitted ? (
        <div className="thank-you-message">
          <h2>Thank you for reaching out!</h2>
          <p>We will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
            ></textarea>
          </div>
          <button type="submit" className="submit-bttn">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;

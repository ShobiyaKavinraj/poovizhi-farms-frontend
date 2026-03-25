import React, { useState, useEffect } from 'react';
import './BillingAddressForm.css';
import axios from 'axios';

function BillingAddressForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
  });

  // Fetch logged-in user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData((prev) => ({
          ...prev,
          fullName: res.data.name || '',
          phone: res.data.phone || '',
        }));
      } catch (err) {
        console.error('Failed to fetch user details:', err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h3>Billing Address</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="zip"
        placeholder="ZIP / Postal Code"
        value={formData.zip}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />

      <button type="submit" className="submit-btn">
        Save Billing Address
      </button>
    </form>
  );
}

export default BillingAddressForm;

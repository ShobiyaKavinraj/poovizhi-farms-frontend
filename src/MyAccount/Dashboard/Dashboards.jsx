import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaBoxOpen, FaMapMarkedAlt, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

function Dashboards() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    address2: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('https://poovizhi-farms-backend.onrender.com/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (res.data.user) {
            setUserData(res.data.user);
          } else {
            setError('User not found or session expired.');
          }
        })
        .catch(() => setError('Failed to fetch user data.'))
        .finally(() => setLoading(false));

      axios.get('https://poovizhi-farms-backend.onrender.com/api/addresses', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          setAddresses(res.data);
        })
        .catch(() => setError('Failed to fetch addresses.'));
    } else {
      setError('No token found. Please log in again.');
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event("storage"));
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <button className="back-btn" onClick={() => navigate('/')}>⬅</button>
        <h1 className="title">My Account</h1>
      </header>

      <div className="dashboard-main-section">
        <aside className="dashboard-sidebar" style={{ marginRight: '2rem' }}>
          <ul>
            <li><FaUser /><Link to="/dashboard"> Dashboard</Link></li>
            <li><FaBoxOpen /><Link to="/order-history"> Orders</Link></li>
            <li><FaMapMarkedAlt /><Link to="/address"> Addresses</Link></li>
            <li className="logout-item" onClick={handleLogout}><FaSignOutAlt /> Logout</li>
          </ul>
        </aside>

        <main className="dashboard-content" style={{ textAlign: 'left' }}>
          <div className="welcome-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <p>
                Hello <b>{userData.name}</b> (Not you? <span className="logout-text" onClick={handleLogout}>Log out</span>)
              </p>
            )}
          </div>

          <div className="order-history">
            <h3>Order History</h3>
            <button className="order-btn" onClick={() => navigate('/order-history')}>
              Go to Order History
            </button>
          </div>

          <div className="account-details">
            <h3>Account Details</h3>
            <p><strong>Name:</strong> {userData.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
          </div>

          <div className="saved-addresses">
            <h3>Saved Addresses</h3>
            {addresses.length === 0 ? (
              <p>No saved addresses.</p>
            ) : (
              addresses.map((addr) => (
                <div key={addr._id} className="address-card">
                  <p><strong>{addr.name}</strong></p>
                  <p>{addr.street}{addr.apartment ? `, ${addr.apartment}` : ''}</p>
                  {addr.company && <p>{addr.company}</p>}
                  <p>{addr.city} - {addr.postalCode}</p>
                  <p>{addr.state}, {addr.country}</p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboards;

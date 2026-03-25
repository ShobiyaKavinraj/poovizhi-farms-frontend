/*import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLeaf } from 'react-icons/fa';
import './DashboardStyle.css';

function Dashboard() {
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
      axios.get('http://localhost:5000/api/user/me', {
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

      axios.get('http://localhost:5000/api/addresses', {
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
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
    
      <header className="dashboard-header">
        <div className="logo-header">
          <FaLeaf size={28} color="#2e7d32" />
          <h1 className="title">Poovizhi Farms</h1>
        </div>
      </header>

      
      <div className="dashboard-main-section">
    
        <nav className="dashboard-sidebar">
          <h2>My Account</h2>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/order-history">Orders</Link></li>
            <li><Link to="/address">Addresses</Link></li>
            <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Logout</li>
          </ul>
        </nav>

      
        <div className="dashboard-content">
          <h1>MY ACCOUNT</h1>

          <div className="welcome-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <p>
                Hello <b>{userData.name}</b> (Not <b>{userData.name}</b>? <span className="logout-text" onClick={handleLogout}>Log out</span>)
              </p>
            )}
          </div>

          <div className="order-history">
            <h2>Order History:</h2>
            <button className="order-btn" onClick={() => navigate('/order-history')}>
              Go to Order History
            </button>
          </div>

          <div className="account-details">
            <h2>Account Details:</h2>
            <p><strong>Name:</strong> {userData.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
            <p><strong>Address:</strong> {userData.address || 'Not provided'}</p>
            <p><strong>Address 2:</strong> {userData.address2 || 'Not provided'}</p>
          </div>

          <div className="saved-addresses">
            <h2>Saved Addresses:</h2>
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;*/

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  FaUser, FaBoxOpen, FaMapMarkedAlt, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    address2: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:5000/api/user/me', {
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

      axios.get('http://localhost:5000/api/addresses', {
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

  /*const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };*/
  const handleLogout = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event("storage")); // This triggers the login state update
  navigate('/');
};


  return (
    <div className="dashboard-layout">
      {/* Header 
      /*<header className="dashboard-header">
        <div className="logo-header">
  
          <h1 className="title">Dashboard</h1>
        </div>
        <div className="profile-dropdown">
          <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {userData.name || 'Profile'}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/dashboard">My Account</Link>
              <Link to="/order-history">Orders</Link>
              <Link to="/address">Addresses</Link>
              <span onClick={handleLogout}>Logout</span>
            </div>
          )}
        </div>
      </header>*/}
<header className="dashboard-header">
  <button className="back-btn" onClick={() => navigate('/')}>
    ⬅ 
  </button>
  <div className="logo-header">
    <h1 className="title">Dashboard</h1>
  </div>
  <div className="profile-dropdown">
    <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
      ☰
    </button>
    {dropdownOpen && (
      <div className="dropdown-menu">
        <Link to="/dashboard">My Account</Link>
        <Link to="/order-history">Orders</Link>
        <Link to="/address">Addresses</Link>
        <span onClick={handleLogout}>Logout</span>
      </div>
    )}
  </div>
</header>

      <div className="dashboard-main-section">
        {/* Sidebar */}
        <nav className="dashboard-sidebar">
          <h2>My Account</h2>
          <ul>
            <li><FaUser /><Link to="/dashboard"> Dashboard</Link></li>
            <li><FaBoxOpen /><Link to="/order-history"> Orders</Link></li>
            <li><FaMapMarkedAlt /><Link to="/address"> Addresses</Link></li>
            <li className="logout-item" onClick={handleLogout}><FaSignOutAlt /> Logout</li>
          </ul>
        </nav>

        {/* Content */}
        <div className="dashboard-content">
          <h1>MY ACCOUNT</h1>

          <div className="welcome-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <p>
                Hello <b>{userData.name}</b> (Not <b>{userData.name}</b>? <span className="logout-text" onClick={handleLogout}>Log out</span>)
              </p>
            )}
          </div>

          <div className="order-history">
            <h2>Order History:</h2>
            <button className="order-btn" onClick={() => navigate('/order-history')}>
              Go to Order History
            </button>
          </div>

          <div className="account-details">
            <h2>Account Details:</h2>
            <p><strong>Name:</strong> {userData.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
            
          </div>

          <div className="saved-addresses">
            <h2>Saved Addresses:</h2>
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

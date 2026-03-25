import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './OrderSummary.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="order-message">Loading orders...</div>;
  if (error) return <div className="order-message error">Error: {error}</div>;

  return (
    <div className="orders-container">
      
      <div className="order-header-bar">
  <Link to="/dashboard" className="back-icon">
    <FaArrowLeft />
  </Link>
  <h2 className="order-heading">Your Order History</h2>
</div>


      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div><strong>Order ID:</strong> #{order._id.slice(-6).toUpperCase()}</div>
              <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
              <div><strong>Status:</strong> {order.status}</div>
              <button onClick={() => toggleExpand(order._id)} className="toggle-btn">
                {expanded[order._id] ? 'Hide' : 'Show'}
              </button>
            </div>

            {expanded[order._id] && (
              <div className="order-details">
              {
               /* <div className="detail-section">
                  <h4>Shipping Address</h4>
                  <p><strong>{order.shippingAddress?.fullName || 'N/A'}</strong></p>
                  <p>{order.shippingAddress?.house || ''}, {order.shippingAddress?.street || ''}</p>
                  <p>{order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} - {order.shippingAddress?.pincode || ''}</p>
                  <p>{order.shippingAddress?.country || ''}</p>
                  <p>📞 {order.shippingAddress?.phone || ''}</p>
                </div>

                <div className="detail-section">
                  <h4>Payment & Shipping</h4>
                  <p><strong>Billing:</strong> {order.billingMethod || 'N/A'}</p>
                  <p><strong>Shipping:</strong> {order.shippingMethod || 'Standard'}</p>
                  <p><strong>Payment ID:</strong> {order.razorpayPaymentId || 'N/A'}</p>
                </div>*/}
                <div className="detail-section">
  <h4>Shipping Address</h4>
  <table>
    <tbody>
      <tr><td>Name:</td><td>{order.shippingAddress?.fullName || 'N/A'}</td></tr>
      <tr><td>Address:</td><td>
        {order.shippingAddress?.house || ''}, {order.shippingAddress?.street || ''},<br />
        {order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} - {order.shippingAddress?.pincode || ''},<br />
        {order.shippingAddress?.country || ''}
      </td></tr>
      <tr><td>Phone:</td><td>📞 {order.shippingAddress?.phone || ''}</td></tr>
    </tbody>
  </table>
</div>

<div className="detail-section">
  <h4>Payment & Shipping</h4>
  <table>
    <tbody>
      <tr><td>Billing:</td><td>{order.billingMethod || 'N/A'}</td></tr>
      <tr><td>Shipping:</td><td>{order.shippingMethod || 'Standard'}</td></tr>
      <tr><td>Payment ID:</td><td>{order.razorpayPaymentId || 'N/A'}</td></tr>
    </tbody>
  </table>
</div>


                <div className="detail-section">
                  <h4>Products</h4>
                  {order.cartItems?.map((product, index) => (
                    <div key={index} className="product-item">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="image-placeholder">No Image</div>
                      )}
                      <div>
                        <p><strong>{product.name}</strong></p>
                        <p>{product.quantity} × {formatCurrency(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <p><strong>Total Paid:</strong> {formatCurrency(order.cartItems?.reduce((sum, p) => sum + p.price * p.quantity, 0))}</p>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistoryPage;

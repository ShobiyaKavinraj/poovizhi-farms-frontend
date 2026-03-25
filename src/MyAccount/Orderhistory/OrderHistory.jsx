import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
import './OrderSummarypdf.css';



const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();
  

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleReorder = (order) => {
    const reorderedItems = order.cartItems.map(item => ({
      _id: item.productId || item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCart, ...reorderedItems];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    navigate('/cart');
  };

 /* const downloadInvoice = (order) => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text(`Invoice - Order #${order._id.slice(-6).toUpperCase()}`, 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 10, y);
    y += 10;
    doc.text(`Status: ${order.status}`, 10, y);
    y += 10;
    doc.text(`Payment ID: ${order.razorpayPaymentId || 'N/A'}`, 10, y);
    y += 10;

    doc.text('Shipping Address:', 10, y);
    y += 10;
    doc.text(`${order.shippingAddress?.fullName}`, 12, y);
    y += 7;
    doc.text(`${order.shippingAddress?.house}, ${order.shippingAddress?.street}`, 12, y);
    y += 7;
    doc.text(`${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.pincode}`, 12, y);
    y += 7;
    doc.text(`${order.shippingAddress?.country}`, 12, y);
    y += 7;
    doc.text(`📞 ${order.shippingAddress?.phone}`, 12, y);
    y += 10;

    doc.text('Products:', 10, y);
    y += 10;

    order.cartItems?.forEach(p => {
      doc.text(`- ${p.name} × ${p.quantity} = ₹${p.price * p.quantity}`, 12, y);
      y += 7;
    });

    const total = order.cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
    y += 5;
    doc.setFont(undefined, 'bold');
    doc.text(`Total Paid: ₹${total}`, 10, y);

    doc.save(`Invoice_${order._id}.pdf`);
  };*/

 useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://poovizhi-farms-backend.onrender.com/api/orders');
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




 /* useEffect(() => {
  const fetchOrders = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser?._id) return;

    try {
      const res = await fetch(`http://localhost:5000/api/orders/user/${currentUser._id}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err.message);
    
    } finally {
      setLoading(false);
    }
  }


  fetchOrders();
}, []);*/
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
             {/* <div className="order-actions">
                <button className="action-btn" onClick={() => toggleExpand(order._id)}>
                  {expanded[order._id] ? 'Hide' : 'Show'}
                </button>
                <button className="action-btn" onClick={() => handleReorder(order)}>Reorder</button>
                <button className="action-btn" onClick={() => downloadInvoice(order)}>Invoice</button>
              </div>*/}
              <div className="order-actions">
  <button className="action-btn" onClick={() => toggleExpand(order._id)}>
    {expanded[order._id] ? 'Hide' : 'Show'}
  </button>
  <button className="action-btn" onClick={() => handleReorder(order)}>Reorder</button>

  <a
    href={`https://poovizhi-farms-backend.onrender.com/api/orders/${order._id}/invoice`}
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn"
  >
    Download Invoice (PDF)
  </a>
</div>

            </div>

            {expanded[order._id] && (
              <div className="order-details">
                <div className="detail-section">
                  <h4>Shipping Address</h4>
                  <table>
                    <tbody>
                      <tr><td>Name:</td><td>{order.shippingAddress?.fullName || 'N/A'}</td></tr>
                      <tr><td>Address:</td><td>
                        {order.shippingAddress?.house}, {order.shippingAddress?.street},<br />
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode},<br />
                        {order.shippingAddress?.country}
                      </td></tr>
                      <tr><td>Phone:</td><td>📞 {order.shippingAddress?.phone}</td></tr>
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

               { /*<div className="detail-section">
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
                </div>*/}
<div className="detail-section">
  <h4>Products</h4>
  <table className="product-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {order.cartItems?.map((product, index) => (
        <tr key={index}>
          
          <td>
            {product.image ? (
              <img src={product.image} alt={product.name} className="products-images" />
            ) : (
              <div className="image-placeholder">No Image</div>
            )}
          </td>
          <td>{product.name}</td>
          <td>{product.quantity}</td>
          <td>{formatCurrency(product.price)}</td>
          <td>{formatCurrency(product.price * product.quantity)}</td>
        </tr>
      ))}
    </tbody>
  </table>
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

export default OrderHistory;

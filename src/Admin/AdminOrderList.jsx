import React, { useEffect, useState } from 'react';
import './AdminOrderList.css';

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    fetch('https://poovizhi-farms-backend.onrender.com/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      });
  }, []);

  useEffect(() => {
    let updated = [...orders];

    if (searchTerm) {
      updated = updated.filter((o) =>
        o.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.shippingAddress?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      updated = updated.filter((o) => o.status === filterStatus);
    }

    if (filterPayment) {
      updated = updated.filter((o) => o.billingMethod === filterPayment);
    }

    setFilteredOrders(updated);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterPayment, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedOrder = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === orderId ? updatedOrder : o)));
      alert('✅ Status updated and email sent!');
    } catch (err) {
      alert('❌ Failed to update status');
    }
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Status', 'Payment Method'];
    const rows = filteredOrders.map((o) => [
      o._id,
      o.shippingAddress?.fullName,
      o.shippingAddress?.email || '',
      o.shippingAddress?.phone || '',
      o.status,
      o.billingMethod
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="admin-order-panel">
      <h2>Admin Orders</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Failed">Failed</option>
        </select>
        <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
          <option value="">All Payments</option>
          <option value="Razorpay">Razorpay</option>
          <option value="COD">Cash on Delivery</option>
        </select>
        <button onClick={exportCSV}>📄 Export CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order._id}>
              <td data-label="Order ID">{order._id.slice(-6)}</td>
              <td data-label="Customer">{order.shippingAddress?.fullName}</td>
              <td data-label="Email">{order.shippingAddress?.email}</td>
              <td data-label="Phone">{order.shippingAddress?.phone}</td>
              <td data-label="Status">{order.status}</td>
              <td data-label="Update">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Failed">Failed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={i + 1 === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminOrderList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addresses.css";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentAddress, setCurrentAddress] = useState({
    name: "",
    phone: "",
    street: "",
    apartment: "",
    company: "",
    postalCode: "",
    city: "",
    state: "",
    country: ""
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('/api/addresses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAddresses(response.data);
    } catch (err) {
      console.error('Error fetching addresses:', err);
      setError('Error fetching addresses');
    }
  };

  const handleSave = async () => {
    try {
      if (editId) {
        const response = await axios.put(`/api/addresses/${editId}`, currentAddress, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setAddresses((prev) =>
          prev.map((addr) => (addr._id === editId ? response.data : addr))
        );
      } else {
        const response = await axios.post("/api/addresses", currentAddress, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setAddresses((prev) => [...prev, response.data]);
      }
    } catch (err) {
      console.error(editId ? "Error updating address:" : "Error adding address:", err);
      setError('Error saving address');
    }
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await axios.delete(`/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error("Error deleting address:", err);
      setError('Error deleting address');
    }
  };

  const handleEdit = (address) => {
    setEditId(address._id);
    setCurrentAddress(address);
    setIsAdding(true);
  };

  const resetForm = () => {
    setCurrentAddress({
      name: "",
      phone: "",
      street: "",
      apartment: "",
      company: "",
      postalCode: "",
      city: "",
      state: "",
      country: ""
    });
    setIsAdding(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    setCurrentAddress({ ...currentAddress, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="address-page">
      <div className="address-header">
        <button className="back-bttn" onClick={goBack}>←</button>
        <h2 className="address-title">Addresses</h2>
      </div>

      <div className="address-content">
        {error && <div className="error">{error}</div>}

        {addresses.length === 0 && !isAdding && (
          <div className="no-address"><p>No addresses found</p></div>
        )}

        {!isAdding && (
          <button className="add-address-btn" onClick={() => setIsAdding(true)}>
            + Add New Address
          </button>
        )}

        {isAdding && (
          <div className="address-form">
            <h3>{editId ? "Edit Address" : "Add New Address"}</h3>
            <input type="text" name="name" placeholder="Full Name" value={currentAddress.name} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" value={currentAddress.phone} onChange={handleChange} />
            <input type="text" name="street" placeholder="Street Address" value={currentAddress.street} onChange={handleChange} />
            <input type="text" name="apartment" placeholder="Apartment, Suite, etc. (Optional)" value={currentAddress.apartment} onChange={handleChange} />
            <input type="text" name="company" placeholder="Company (Optional)" value={currentAddress.company} onChange={handleChange} />
            <input type="text" name="postalCode" placeholder="Pincode" value={currentAddress.postalCode} onChange={handleChange} />
            <input type="text" name="city" placeholder="City" value={currentAddress.city} onChange={handleChange} />

            <select name="state" value={currentAddress.state} onChange={handleChange}>
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>

            <select name="country" value={currentAddress.country} onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>

            <div className="form-buttons">
              <button className="save-btn" onClick={handleSave}>
                {editId ? "Update Address" : "Save Address"}
              </button>
              <button className="cancel-btn" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        )}

        {addresses.map((addr) => (
          <div key={addr._id} className="address-card">
            <h4>{addr.name}</h4>
            <p>{addr.street}</p>
            {addr.apartment && <p>{addr.apartment}</p>}
            {addr.company && <p>{addr.company}</p>}
            <p>{addr.city} - {addr.postalCode}</p>
            <p>{addr.state}, {addr.country}</p>
            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEdit(addr)}>Edit</button>
              <button className="delete-bttn" onClick={() => handleDelete(addr._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;


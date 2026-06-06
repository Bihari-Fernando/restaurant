import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer, deleteCustomer } from '../api/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      setMessage('Error fetching customers');
    }
  };

  const handleAddCustomer = async () => {
    if (!name || !phone || !partySize) {
      setMessage('Please fill all fields!');
      return;
    }
    try {
      await addCustomer({ name, phone, partySize: parseInt(partySize) });
      setMessage('Customer added successfully! ✅');
      setName(''); setPhone(''); setPartySize('');
      fetchCustomers();
    } catch (err) {
      setMessage('Error adding customer ❌');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setMessage('Customer deleted ✅');
      fetchCustomers();
    } catch (err) {
      setMessage('Error deleting customer ❌');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>👥 Add New Customer</h2>
        {message && <p style={{ color: '#e74c3c', marginBottom: '10px' }}>{message}</p>}
        <div className="form-row">
          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="number" placeholder="Party Size" value={partySize} onChange={(e) => setPartySize(e.target.value)} />
          <button className="btn btn-primary" onClick={handleAddCustomer}>Add Customer</button>
        </div>
      </div>

      <div className="card">
        <h2>👥 All Customers</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Party Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.partySize} persons</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
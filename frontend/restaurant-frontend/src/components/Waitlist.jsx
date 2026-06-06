import React, { useState, useEffect } from 'react';
import { getWaitlist, getCustomers, joinWaitlist, cancelWaitlist, markSeated } from '../api/api';

function Waitlist() {
  const [waitlist, setWaitlist] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWaitlist();
    fetchCustomers();
  }, []);

  const fetchWaitlist = async () => {
    try {
      const res = await getWaitlist();
      setWaitlist(res.data);
    } catch (err) {
      setMessage('Error fetching waitlist');
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {}
  };

  const handleJoinWaitlist = async () => {
    if (!selectedCustomer) {
      setMessage('Please select a customer!');
      return;
    }
    try {
      await joinWaitlist(selectedCustomer);
      setMessage('Customer added to waitlist! ✅');
      setSelectedCustomer('');
      fetchWaitlist();
    } catch (err) {
      setMessage('Error joining waitlist ❌');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelWaitlist(id);
      setMessage('Waitlist entry cancelled ✅');
      fetchWaitlist();
    } catch (err) {
      setMessage('Error cancelling ❌');
    }
  };

  const handleSeated = async (id) => {
    try {
      await markSeated(id);
      setMessage('Customer marked as seated ✅');
      fetchWaitlist();
    } catch (err) {
      setMessage('Error updating ❌');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>📋 Add to Waitlist</h2>
        {message && <p style={{ color: '#e74c3c', marginBottom: '10px' }}>{message}</p>}
        <div className="form-row">
          <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name} (Party of {c.partySize})</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleJoinWaitlist}>Join Waitlist</button>
        </div>
      </div>

      <div className="card">
        <h2>📋 Current Waitlist</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Customer</th>
              <th>Party Size</th>
              <th>Joined At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.map((entry, index) => (
              <tr key={entry.id}>
                <td>#{index + 1}</td>
                <td>{entry.customer.name}</td>
                <td>{entry.partySize} persons</td>
                <td>{new Date(entry.joinedAt).toLocaleTimeString()}</td>
                <td>
                  <span className={`badge badge-${entry.status.toLowerCase()}`}>
                    {entry.status}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-success" onClick={() => handleSeated(entry.id)}>
                    Seated
                  </button>
                  <button className="btn btn-danger" onClick={() => handleCancel(entry.id)}>
                    Cancel
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

export default Waitlist;
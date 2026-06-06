import React, { useState, useEffect } from 'react';
import { getBookings, getCustomers, getTables, createBooking, completeBooking, cancelBooking } from '../api/api';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [b, c, t] = await Promise.all([getBookings(), getCustomers(), getTables()]);
      setBookings(b.data);
      setCustomers(c.data);
      setTables(t.data.filter(t => t.status === 'AVAILABLE'));
    } catch (err) {
      setMessage('Error fetching data');
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedCustomer || !selectedTable) {
      setMessage('Please select customer and table!');
      return;
    }
    try {
      await createBooking(selectedCustomer, selectedTable);
      setMessage('Booking created successfully! ✅');
      setSelectedCustomer(''); setSelectedTable('');
      fetchAll();
    } catch (err) {
      setMessage('Error creating booking ❌');
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeBooking(id);
      setMessage('Booking completed ✅');
      fetchAll();
    } catch (err) {
      setMessage('Error completing booking ❌');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      setMessage('Booking cancelled ✅');
      fetchAll();
    } catch (err) {
      setMessage('Error cancelling booking ❌');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>📅 Create New Booking</h2>
        {message && <p style={{ color: '#e74c3c', marginBottom: '10px' }}>{message}</p>}
        <div className="form-row">
          <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
            <option value="">Select Table</option>
            {tables.map(t => (
              <option key={t.id} value={t.id}>Table {t.tableNumber} (Capacity: {t.capacity})</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleCreateBooking}>Create Booking</button>
        </div>
      </div>

      <div className="card">
        <h2>📅 All Bookings</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Booked At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer.name}</td>
                <td>Table {booking.restaurantTable.tableNumber}</td>
                <td>{new Date(booking.bookedAt).toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  {booking.status === 'CONFIRMED' && (
                    <>
                      <button className="btn btn-success" onClick={() => handleComplete(booking.id)}>
                        Complete
                      </button>
                      <button className="btn btn-danger" onClick={() => handleCancel(booking.id)}>
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
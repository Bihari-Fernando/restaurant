import React, { useState, useEffect } from 'react';
import { getOrders, getBookings, placeOrder, updateOrderStatus, getTotalBill } from '../api/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [bill, setBill] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [o, b] = await Promise.all([getOrders(), getBookings()]);
      setOrders(o.data);
      setBookings(b.data.filter(b => b.status === 'CONFIRMED'));
    } catch (err) {
      setMessage('Error fetching data');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedBooking || !itemName || !quantity || !price) {
      setMessage('Please fill all fields!');
      return;
    }
    try {
      await placeOrder(selectedBooking, {
        itemName,
        quantity: parseInt(quantity),
        price: parseFloat(price)
      });
      setMessage('Order placed successfully! ✅');
      setItemName(''); setQuantity(''); setPrice('');
      fetchAll();
    } catch (err) {
      setMessage('Error placing order ❌');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchAll();
    } catch (err) {
      setMessage('Error updating status ❌');
    }
  };

  const handleGetBill = async () => {
    if (!selectedBooking) {
      setMessage('Please select a booking!');
      return;
    }
    try {
      const res = await getTotalBill(selectedBooking);
      setBill(res.data);
    } catch (err) {
      setMessage('Error getting bill ❌');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>🍗 Place New Order</h2>
        {message && <p style={{ color: '#e74c3c', marginBottom: '10px' }}>{message}</p>}
        <div className="form-row">
          <select value={selectedBooking} onChange={(e) => setSelectedBooking(e.target.value)}>
            <option value="">Select Booking</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>Booking #{b.id} - {b.customer.name} (Table {b.restaurantTable.tableNumber})</option>
            ))}
          </select>
          <input placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <input type="number" placeholder="Price (Rs.)" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
        </div>
        <div className="form-row" style={{ marginTop: '10px' }}>
          <button className="btn btn-success" onClick={handleGetBill}>Get Total Bill 🧾</button>
          {bill !== null && <p style={{ padding: '8px', fontWeight: 'bold', color: '#27ae60' }}>Total Bill: Rs. {bill}</p>}
        </div>
      </div>

      <div className="card">
        <h2>🍗 All Orders</h2>
        <div className="table-wrapper">
            <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Booking</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>#{order.booking.id} - {order.booking.customer.name}</td>
                <td>{order.itemName}</td>
                <td>{order.quantity}</td>
                <td>Rs. {order.price}</td>
                <td>Rs. {order.price * order.quantity}</td>
                <td>
                  <span className={`badge badge-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td className="action-buttons">
                  {order.status === 'PENDING' && (
                    <button className="btn btn-warning" onClick={() => handleStatusUpdate(order.id, 'PREPARING')}>
                      Preparing
                    </button>
                  )}
                  {order.status === 'PREPARING' && (
                    <button className="btn btn-success" onClick={() => handleStatusUpdate(order.id, 'SERVED')}>
                      Served
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  );
}

export default Orders;
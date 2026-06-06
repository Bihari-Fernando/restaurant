import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getTables, getCustomers, getBookings, getAllOrders } from '../api/api';

const COLORS = ['#2ecc71', '#e74c3c', '#3498db', '#f39c12', '#9b59b6'];

function Dashboard() {
  const [tables, setTables] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [t, c, b, o] = await Promise.all([
        getTables(), getCustomers(), getBookings(), getAllOrders()
      ]);
      setTables(t.data);
      setCustomers(c.data);
      setBookings(b.data);
      setOrders(o.data);
    } catch (err) {
      console.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const availableTables = tables.filter(t => t.status === 'AVAILABLE').length;
  const occupiedTables = tables.filter(t => t.status === 'OCCUPIED').length;
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const preparingOrders = orders.filter(o => o.status === 'PREPARING').length;
  const servedOrders = orders.filter(o => o.status === 'SERVED').length;
  const totalRevenue = orders
    .filter(o => o.status === 'SERVED')
    .reduce((sum, o) => sum + (o.price * o.quantity), 0);

  // Chart data
  const tableChartData = [
    { name: 'Available', value: availableTables },
    { name: 'Occupied', value: occupiedTables }
  ];

  const bookingChartData = [
    { name: 'Confirmed', value: confirmedBookings },
    { name: 'Completed', value: completedBookings },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'CANCELLED').length }
  ];

  const orderChartData = [
    { name: 'Pending', value: pendingOrders },
    { name: 'Preparing', value: preparingOrders },
    { name: 'Served', value: servedOrders }
  ];

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dashboard... ⏳</div>;

  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #3498db' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#3498db' }}>{tables.length}</div>
          <div style={{ color: '#7f8c8d', marginTop: '5px' }}>🪑 Total Tables</div>
        </div>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #2ecc71' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2ecc71' }}>{customers.length}</div>
          <div style={{ color: '#7f8c8d', marginTop: '5px' }}>👥 Total Customers</div>
        </div>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #e74c3c' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e74c3c' }}>{confirmedBookings}</div>
          <div style={{ color: '#7f8c8d', marginTop: '5px' }}>📅 Active Bookings</div>
        </div>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #f39c12' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f39c12' }}>Rs. {totalRevenue.toLocaleString()}</div>
          <div style={{ color: '#7f8c8d', marginTop: '5px' }}>💰 Total Revenue</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="chart-grid">

        {/* Tables Pie Chart */}
        <div className="card">
          <h2>🪑 Tables Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={tableChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {tableChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Bar Chart */}
        <div className="card">
          <h2>🍗 Orders Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Orders" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bookings Bar Chart */}
      <div className="card">
        <h2>📅 Bookings Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bookingChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Bookings" radius={[4, 4, 0, 0]}>
              {bookingChartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Status */}
      <div className="quick-grid">
        <div className="card" style={{ borderLeft: '4px solid #2ecc71' }}>
          <h3 style={{ color: '#2ecc71' }}>✅ Available Tables</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>{availableTables} / {tables.length}</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #f39c12' }}>
          <h3 style={{ color: '#f39c12' }}>⏳ Pending Orders</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>{pendingOrders}</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #e74c3c' }}>
          <h3 style={{ color: '#e74c3c' }}>🍳 Preparing Now</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>{preparingOrders}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
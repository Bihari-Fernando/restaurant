import React, { useState } from 'react';
import Tables from './components/Tables';
import Customers from './components/Customers';
import Waitlist from './components/Waitlist';
import Bookings from './components/Bookings';
import Orders from './components/Orders';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('tables');

  const renderPage = () => {
    switch(activePage) {
      case 'tables': return <Tables />;
      case 'customers': return <Customers />;
      case 'waitlist': return <Waitlist />;
      case 'bookings': return <Bookings />;
      case 'orders': return <Orders />;
      default: return <Tables />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🍽️ Restaurant Queue System</h1>
        <div className="nav-links">
          <button onClick={() => setActivePage('tables')} className={activePage === 'tables' ? 'active' : ''}>🪑 Tables</button>
          <button onClick={() => setActivePage('customers')} className={activePage === 'customers' ? 'active' : ''}>👥 Customers</button>
          <button onClick={() => setActivePage('waitlist')} className={activePage === 'waitlist' ? 'active' : ''}>📋 Waitlist</button>
          <button onClick={() => setActivePage('bookings')} className={activePage === 'bookings' ? 'active' : ''}>📅 Bookings</button>
          <button onClick={() => setActivePage('orders')} className={activePage === 'orders' ? 'active' : ''}>🍗 Orders</button>
        </div>
      </nav>
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
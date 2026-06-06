import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Tables from './components/Tables';
import Customers from './components/Customers';
import Waitlist from './components/Waitlist';
import Bookings from './components/Bookings';
import Orders from './components/Orders';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard': return <Dashboard />;
      case 'tables': return <Tables />;
      case 'customers': return <Customers />;
      case 'waitlist': return <Waitlist />;
      case 'bookings': return <Bookings />;
      case 'orders': return <Orders />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { key: 'dashboard', label: '📊 Dashboard' },
    { key: 'tables', label: '🪑 Tables' },
    { key: 'customers', label: '👥 Customers' },
    { key: 'waitlist', label: '📋 Waitlist' },
    { key: 'bookings', label: '📅 Bookings' },
    { key: 'orders', label: '🍗 Orders' },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🍽️ Restaurant Queue System</h1>

        {/* Desktop nav */}
        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={activePage === item.key ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hamburger for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => navigate(item.key)}
            className={activePage === item.key ? 'active' : ''}
          >
            {item.label}
          </button>
        ))}
      </div>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
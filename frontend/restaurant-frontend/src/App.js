import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Tables from "./components/Tables";
import Customers from "./components/Customers";
import Waitlist from "./components/Waitlist";
import Bookings from "./components/Bookings";
import Orders from "./components/Orders";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedToken = localStorage.getItem("token");
    if (savedUsername && savedToken) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    setActivePage("dashboard");
  };

  const navigate = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "tables":
        return <Tables />;
      case "customers":
        return <Customers />;
      case "waitlist":
        return <Waitlist />;
      case "bookings":
        return <Bookings />;
      case "orders":
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    { key: "dashboard", label: "📊 Dashboard" },
    { key: "tables", label: "🪑 Tables" },
    { key: "customers", label: "👥 Customers" },
    { key: "waitlist", label: "📋 Waitlist" },
    { key: "bookings", label: "📅 Bookings" },
    { key: "orders", label: "🍗 Orders" },
  ];

  // Show login if not authenticated
  if (!username) {
    if (showRegister) {
      return <Register onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🍽️ Restaurant Queue System</h1>

        {/* Desktop nav */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={activePage === item.key ? "active" : ""}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* User info + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#bdc3c7", fontSize: "14px" }}>
            👤 {username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "#e74c3c",
              color: "white",
              border: "none",
              padding: "7px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Logout
          </button>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(item.key)}
            className={activePage === item.key ? "active" : ""}
          >
            {item.label}
          </button>
        ))}
        <button onClick={handleLogout} style={{ color: "#e74c3c" }}>
          🚪 Logout
        </button>
      </div>

      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;

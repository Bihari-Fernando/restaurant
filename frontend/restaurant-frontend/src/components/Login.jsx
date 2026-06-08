import React, { useState } from 'react';
import { login } from '../api/api';

function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter username and password!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await login({ username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      onLogin(res.data.username);
    } catch (err) {
      setError('Invalid username or password! ❌');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        margin: '20px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px' }}>🍽️</div>
          <h1 style={{ color: '#2c3e50', fontSize: '24px', marginTop: '10px' }}>
            Restaurant Queue System
          </h1>
          <p style={{ color: '#7f8c8d', marginTop: '5px' }}>Sign in to continue</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fde8e8',
            color: '#e74c3c',
            padding: '10px 15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#2c3e50', fontWeight: '500' }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#2c3e50', fontWeight: '500' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '13px',
            background: loading ? '#95a5a6' : '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#7f8c8d',
          fontSize: '13px'
        }}>
          🔐 Secured with JWT Authentication
        </div>
        {/* Switch to Register */}
<div style={{ textAlign: 'center', marginTop: '15px' }}>
  <span style={{ color: '#7f8c8d', fontSize: '14px' }}>
    Don't have an account?{' '}
  </span>
  <span
    onClick={onSwitchToRegister}
    style={{
      color: '#3498db',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: '600'
    }}
  >
    Register
  </span>
</div>
      </div>
    </div>
  );
}

export default Login;
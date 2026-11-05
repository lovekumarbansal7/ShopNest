
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        email,
        password
      });

      // Save logged-in user information in AuthContext
      login(res.data.user);

      // Redirect to homepage
      navigate('/');

    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);

      alert(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="auth-page">

      {/* Left Promotional Panel */}
      <div className="auth-visual">
        <Link to="/" className="auth-brand">
          <img src="/ShopNestLogo.png" alt="ShopNest" />
          <span>Shop<span>Nest</span></span>
        </Link>

        <div className="auth-visual-content">
          <span className="auth-eyebrow">WELCOME BACK</span>

          <h1>
            Great finds.
            <br />
            Great prices.
            <br />
            <span>Great shopping.</span>
          </h1>

          <p>
            Your favourite products are just a few clicks away.
            Sign in and continue exploring everything ShopNest
            has to offer.
          </p>

          <div className="auth-illustration">
            <div className="auth-illustration-circle">
              <div className="auth-shopping-bag">🛍️</div>
            </div>

            <div className="auth-floating-card">
              <span>✦</span>
              <div>
                <strong>Welcome to ShopNest</strong>
                <small>Your space to discover</small>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-visual-footer">
          Discover more. Shop better.
        </div>
      </div>

      {/* Right Login Form */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">

          <div className="auth-mobile-brand">
            <img src="/ShopNestLogo.png" alt="ShopNest" />
            <span>Shop<span>Nest</span></span>
          </div>

          <div className="auth-heading">
            <span className="auth-form-label">YOUR SHOPPING JOURNEY</span>
            <h2>Welcome back!</h2>
            <p>Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="auth-input-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="login-password">Password</label>

              <div className="password-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span></span>
            <p>NEW TO SHOPNEST?</p>
            <span></span>
          </div>

          <p className="auth-register-text">
            Don't have an account?
            <Link to="/register"> Create an account</Link>
          </p>

          <div className="auth-security-note">
            <span>🔒</span>
            Your account information is protected.
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;

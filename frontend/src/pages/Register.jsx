
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/register', {
        username: name,
        email,
        password
      });

      const data = res.data;

      alert('Registration Successful! Please check your email for the Welcome OTP.');

      login(data);
      navigate('/');

    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);

      alert(error.response?.data?.message || 'Registration failed. Please try again.');
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
          <span className="auth-eyebrow">JOIN THE SHOPNEST FAMILY</span>

          <h1>
            Discover more.
            <br />
            Shop smarter.
            <br />
            <span>Live better.</span>
          </h1>

          <p>
            Create your ShopNest account and explore a world
            of exciting products, great finds, and a better
            shopping experience.
          </p>

          <div className="auth-illustration">
            <div className="auth-illustration-circle">
              <div className="auth-shopping-bag">🛍️</div>
            </div>

            <div className="auth-floating-card">
              <span>✦</span>
              <div>
                <strong>Your journey starts here</strong>
                <small>Welcome to ShopNest</small>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-visual-footer">
          Discover more. Shop better.
        </div>

      </div>

      {/* Right Registration Form */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">

          <div className="auth-mobile-brand">
            <img src="/ShopNestLogo.png" alt="ShopNest" />
            <span>Shop<span>Nest</span></span>
          </div>

          <div className="auth-heading">
            <span className="auth-form-label">CREATE YOUR ACCOUNT</span>
            <h2>Join ShopNest!</h2>
            <p>Enter your details to get started with us.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="auth-input-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-email">Email Address</label>
              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-password">Password</label>

              <div className="password-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
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
              Create Account <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span></span>
            <p>ALREADY A MEMBER?</p>
            <span></span>
          </div>

          <p className="auth-register-text">
            Already have an account?
            <Link to="/login"> Sign In</Link>
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

export default Register;

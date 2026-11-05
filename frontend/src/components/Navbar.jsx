
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* Brand Logo */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>
            <img
              src="/ShopNestLogo.png"
              alt="ShopNest"
              className="navbar-logo"
            />
            <span>
              Shop<span className="brand-highlight">Nest</span>
              <small>YOUR SPACE TO DISCOVER</small>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>

          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>

          <li>
            <Link to="/shop" onClick={closeMenu}>Shop</Link>
          </li>

          <li>
            <Link to="/cart" onClick={closeMenu} className="cart-link">
              <span>Cart</span>
              <span className="cart-count">{cartItems.length}</span>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile" onClick={closeMenu} className="user-link">
                  <span className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                  <span>Hi, {user.name}</span>
                </Link>
              </li>

              {user.role === 'admin' && (
                <li>
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="admin-link"
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={closeMenu}
                className="login-btn"
              >
                Login / Register
                <span>→</span>
              </Link>
            </li>
          )}

        </ul>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </nav>
    </header>
  );
};

export default Navbar;

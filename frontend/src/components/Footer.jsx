
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/ShopNestLogo.png" alt="ShopNest" />
            <span>
              Shop<span>Nest</span>
            </span>
          </Link>

          <p className="footer-description">
            Your space to discover. Explore exciting products,
            find your favourites, and enjoy a better shopping experience
            with ShopNest.
          </p>

          <div className="footer-socials">
            <a href="https://instagram.com/lovekumar_bansal07" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
            <a href="https://x.com/LoveKumarBan" target="_blank" rel="noreferrer" aria-label="Twitter">x</a>
            <a href="https://www.linkedin.com/in/love-kumar-bansal" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        {/* Information */}
        <div className="footer-column">
          <h3>Information</h3>
          <Link to="/about">About Us</Link>
          <Link to="/return">Return Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>

        {/* Shopping */}
        <div className="footer-column footer-highlight">
          <span className="footer-small-label">THE SHOPNEST EXPERIENCE</span>
          <h3>Discover more. Shop better.</h3>
          <p>
            Find something you'll love. Your next favourite
            product might be just a click away.
          </p>
          <Link to="/shop" className="footer-shop-btn">
            Explore Shop <span>→</span>
          </Link>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <strong>ShopNest</strong>.
          All rights reserved.
        </p>

        <p className="footer-bottom-tagline">
          Made for a better shopping experience <span>♥</span>
        </p>
      </div>

    </footer>
  );
};

export default Footer;

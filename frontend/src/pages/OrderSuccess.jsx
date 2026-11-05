
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/orderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <div className="order-success-card">

        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            ✓
          </div>
        </div>

        {/* Confirmation */}
        <span className="success-eyebrow">
          ORDER CONFIRMATION
        </span>

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Thank you for your order. We have securely received your
          payment and will process your shipment shortly.
        </p>

        {/* Status */}
        <div className="success-status">
          <span className="success-status-dot"></span>
          Your order has been placed successfully
        </div>

        {/* Information */}
        <div className="success-info">
          <div className="success-info-item">
            <span className="success-info-icon">📦</span>
            <div>
              <h3>What's Next?</h3>
              <p>
                Your order will be processed and prepared for shipment.
              </p>
            </div>
          </div>

          <div className="success-info-item">
            <span className="success-info-icon">✉️</span>
            <div>
              <h3>Stay Updated</h3>
              <p>
                Keep an eye out for updates regarding your order.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <Link to="/shop" className="success-shop-btn">
          Continue Shopping
          <span>→</span>
        </Link>

        <Link to="/" className="success-home-link">
          Back to Home
        </Link>

        <div className="success-footer">
          Thank you for choosing <strong>ShopNest</strong>.
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;

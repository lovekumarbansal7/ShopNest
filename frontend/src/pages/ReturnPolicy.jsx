
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/policy.css';

const ReturnPolicy = () => {
  return (
    <div className="policy-page">

      {/* Page Header */}
      <div className="policy-hero">
        <span className="policy-eyebrow">SHOPNEST CUSTOMER CARE</span>
        <h1>Return & Refund Policy</h1>
        <p>
          Your satisfaction matters to us. Here's everything you need
          to know about returning products and receiving refunds.
        </p>

        <div className="policy-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Return Policy</span>
        </div>
      </div>

      {/* Policy Content */}
      <div className="policy-container">

        {/* Highlight Card */}
        <div className="policy-highlight">
          <div className="policy-highlight-icon">↩</div>
          <div>
            <span>SHOP WITH CONFIDENCE</span>
            <h2>30-Day Return Window</h2>
            <p>
              You may initiate a return within 30 days of receiving
              your order, subject to the eligibility conditions below.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <section className="policy-intro">
          <h2>Our Return Promise</h2>
          <p>
            At ShopNest, we proudly stand behind the quality of our
            merchandise. If for any reason you are completely
            dissatisfied with your purchase, you may securely initiate
            a return within 30 days of receiving your order.
          </p>
        </section>

        {/* Policy Sections */}
        <div className="policy-sections">

          <section className="policy-section">
            <div className="policy-number">01</div>
            <div>
              <h3>Eligibility for Returns</h3>
              <p>
                To be eligible for a return, the item must be completely
                unused, housed in the same absolute condition that it was
                received, and maintained within its original factory
                packaging. Receipts or proof of purchase mappings are
                strictly required.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="policy-number">02</div>
            <div>
              <h3>Refund Processing</h3>
              <p>
                Once your return is physically received and internally
                inspected, an immediate email protocol will fire notifying
                you of the approval status. Approved refunds will cleanly
                propagate to your original designated Razorpay gateway
                endpoint within 5-7 business working days naturally.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="policy-number">03</div>
            <div>
              <h3>Exempted Output Goods</h3>
              <p>
                Certain explicit categories such as perishable items,
                custom software, digital media, or physically tampered
                items are heavily restricted and do not qualify for any
                standard refund sequence.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="policy-number">04</div>
            <div>
              <h3>Shipping Transit Costs</h3>
              <p>
                You will actively remain strictly responsible for covering
                your own outbound logistical shipping rates associated
                with returning the item. Restocking fees may conditionally
                apply.
              </p>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="policy-contact">
          <div>
            <h3>Need help with a return?</h3>
            <p>Visit our store to continue exploring ShopNest.</p>
          </div>

          <Link to="/shop" className="policy-button">
            Continue Shopping →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ReturnPolicy;

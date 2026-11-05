import React from 'react';
import '../styles/policy.css';

const Disclaimer = () => {
  return (
    <div className="policy-page">
      <section className="policy-hero">
        <span className="policy-eyebrow">SHOPNEST INFORMATION</span>
        <h1>Legal & Site Disclaimer</h1>
        <p>
          Important information about the ShopNest platform, its content,
          and its functionality.
        </p>
      </section>

      <div className="policy-container">
        <div className="policy-highlight">
          <span className="policy-highlight-icon">ⓘ</span>
          <div>
            <h3>Educational Development Platform</h3>
            <p>
              ShopNest is designed for educational, demonstration, and
              portfolio-oriented engineering purposes.
            </p>
          </div>
        </div>

        <div className="policy-content">
          <p className="policy-intro">
            The data, interfaces, and graphical components represented across
            the ShopNest domain strictly act uniquely as an educational
            development platform. This codebase models rigorous application
            structures and architectures for purely demonstrative,
            portfolio-oriented engineering usage.
          </p>

          <section className="policy-section">
            <span className="policy-section-number">01</span>
            <div>
              <h2>Accuracy of Materials</h2>
              <p>
                The materials spanning the ShopNest interface may heavily
                include dynamic technical, typographical, or dummy photographic
                elements. Product matrices mapped in the DB pipeline do
                absolutely not correlate to strictly real physical outputs and
                are safely populated via generic Unsplash imagery protocols.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">02</span>
            <div>
              <h2>Payment Processing Restrictions</h2>
              <p>
                No authentic financial variables are handled natively within
                this environment. All payment endpoints forcefully bind
                exclusively to external testing-based networks (Sandbox
                Razorpay environments). No exact deductibles exist.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">03</span>
            <div>
              <h2>External Binding Links</h2>
              <p>
                ShopNest operates completely independent domains and takes
                strictly zero absolute parameter responsibility over the
                specific contents or behaviors populated via external routing
                anchors generated implicitly by third-party configurations.
              </p>
            </div>
          </section>

          <div className="policy-acceptance">
            <span className="policy-acceptance-icon">✓</span>
            <p>
              By interacting natively within this codebase, you unconditionally
              signal acceptance bounded by these parameters efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
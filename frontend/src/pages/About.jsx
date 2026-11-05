
import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <span className="about-eyebrow">GET TO KNOW US</span>
        <h1>About ShopNest</h1>
        <p>
          A little creativity, a lot of passion, and a vision to make shopping better.
        </p>
      </section>

      {/* Profile Section */}
      <div className="about-container">
        <div className="about-card">

          <div className="about-profile-image">
            <img
              src="/dp.jpeg"
              alt="@theshivanshvasu"
            />
            <span className="about-image-badge">Student</span>
          </div>

          <span className="about-profile-label">THE PERSON BEHIND THE PLATFORM</span>

          <h2>Love Kumar Bansal</h2>

          <h3>@lovekumarbansal</h3>

          <div className="about-divider"></div>

          <p className="about-description">
            <strong>Everything You Love, Just a Click Away!</strong>
            <br />
            From everyday essentials to special finds, ShopNest brings shopping closer to you.
          </p>

          {/* Social Media */}
          <div className="about-social-section">
            <h4>Let's Connect</h4>
            <p>Follow and connect with me on social platforms.</p>

            <div className="about-social-links">

              <a
                href="https://instagram.com/lovekumar_bansal07"
                target="_blank"
                rel="noreferrer"
                className="about-social-btn instagram-btn"
              >
                <span>📸</span>
                Instagram
                <span className="social-arrow">↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/love-kumar-bansal"
                target="_blank"
                rel="noreferrer"
                className="about-social-btn linkedin-btn"
              >
                <span>💼</span>
                LinkedIn
                <span className="social-arrow">↗</span>
              </a>

              <a
                href="https://x.com/LoveKumarBan"
                target="_blank"
                rel="noreferrer"
                className="about-social-btn x-btn"
              >
                <span>✖️</span>
                X (Twitter)
                <span className="social-arrow">↗</span>
              </a>

            </div>
          </div>

          <div className="about-footer">
            Happiness Delivered to Your Door.
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;

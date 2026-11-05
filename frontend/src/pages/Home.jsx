
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import '../styles/home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.slice(0, 4));
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="home-container">

      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-dot"></span>
            Warning: Your Wishlist Might Get Longer!
          </div>

          <h1>
            From
            <br />
            <span>Just Looking </span> to
            <br />
            Add to cart !
          </h1>

          <p>
            Discover products you'll love. Explore exciting collections
            and find everything you need, all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="primary-btn">
              Shop Now <span>→</span>
            </Link>

            <Link to="/shop" className="secondary-btn">
              Explore Collection
            </Link>
          </div>

          <div className="hero-trust">
            <span>✓ Quality products</span>
            <span>✓ Easy shopping</span>
            <span>✓ Great experience</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-center-card">
            <div className="hero-card-top">
              <span>SHOPNEST</span>
              <span>✦</span>
            </div>

            <div className="hero-card-icon">🛍️</div>

            <h3>Find your next favourite.</h3>
            <p>Good finds. Great prices. Happy shopping.</p>

            <div className="hero-card-bottom">
              <span>EXPLORE MORE</span>
              <span>↗</span>
            </div>
          </div>

          <div className="floating-tag tag-one">
            <span>✦</span> Discover more
          </div>

          <div className="floating-tag tag-two">
            <span>♥</span> Love every purchase
          </div>
        </div>

        <div className="hero-bottom-shape"></div>
      </section>

      {/* Benefits strip */}
      <section className="service-strip">
        <div className="service-item">
          <span className="service-icon">🚚</span>
          <div>
            <h4>Convenient Delivery</h4>
            <p>Shopping at your comfort</p>
          </div>
        </div>

        <div className="service-item">
          <span className="service-icon">🔒</span>
          <div>
            <h4>Secure Shopping</h4>
            <p>Your shopping experience matters</p>
          </div>
        </div>

        <div className="service-item">
          <span className="service-icon">⭐</span>
          <div>
            <h4>Quality Selection</h4>
            <p>Products worth discovering</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">HANDPICKED FOR YOU</span>
            <h2>Explore our <span>favourites.</span></h2>
            <p>Some great finds to get your shopping started.</p>
          </div>

          <Link to="/shop" className="view-all-btn">
            View all products <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="product-loading">
            <div className="loading-spinner"></div>
            <p>Finding something special for you...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <span>🛍️</span>
            <h3>Nothing here just yet!</h3>
            <p>We're adding exciting products. Please check back soon.</p>
            <Link to="/shop" className="primary-btn">
              Explore Shop →
            </Link>
          </div>
        )}
      </section>

      {/* Bottom promotional section */}
      <section className="promo-section">
        <div>
          <span className="promo-eyebrow">THE SHOPNEST EXPERIENCE</span>
          <h2>Good things are just a click away.</h2>
          <p>
            Take a look around, discover new favourites,
            and make your next shopping experience special.
          </p>
          <Link to="/shop" className="promo-btn">
            Start Exploring <span>→</span>
          </Link>
        </div>

        <div className="promo-decoration">
          <span>✦</span>
          <strong>SHOP</strong>
          <strong>NEST.</strong>
          <span>YOUR SPACE TO DISCOVER</span>
        </div>
      </section>

    </main>
  );
};

export default Home;

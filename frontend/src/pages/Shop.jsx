
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-page">

      {/* Shop Hero */}
      <section className="shop-hero">
        <span className="shop-eyebrow">EXPLORE SHOPNEST</span>
        <h1>Find Something You'll Love.</h1>
        <p>
          Discover our collection of products, carefully selected
          to bring you quality and value.
        </p>
      </section>

      <div className="shop-container">

        {/* Shop Heading */}
        <div className="shop-heading">
          <div>
            <h2>All Products</h2>
            <p>Explore our complete collection</p>
          </div>

          <span className="shop-product-count">
            {products.length} Products
          </span>
        </div>

        {/* Search Bar */}
        <div className="shop-search-wrapper">
          <span className="shop-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />

          {search && (
            <button
              type="button"
              className="shop-clear-search"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Products */}
        {loading ? (
          <div className="shop-loading">
            <div className="shop-loader"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <p className="shop-results">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="shop-no-results">
            <div className="shop-no-results-icon">⌕</div>
            <h3>No Products Found</h3>
            <p>
              We couldn't find any products matching "{search}".
              Try searching with a different name.
            </p>
            <button
              type="button"
              onClick={() => setSearch('')}
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;

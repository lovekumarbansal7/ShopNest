import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link
        to={`/product/${product._id}`}
        className="product-image-wrapper"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <span className="product-image-badge">ShopNest</span>
      </Link>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-card-bottom">
          <p className="price">₹{product.price}</p>

          <Link
            to={`/product/${product._id}`}
            className="product-view-btn"
          >
            View Details
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
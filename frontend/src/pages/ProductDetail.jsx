
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));

      alert('Successfully added to your cart!');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-state">
        <div className="product-loader"></div>
        <p>Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-state">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/shop" className="detail-back-btn">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      {/* Product Details */}
      <div className="product-detail">

        {/* Product Image */}
        <div className="detail-image-container">
          <div className="detail-image-background">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="detail-image"
            />
          </div>
          <span className="detail-image-label">SHOPNEST PRODUCT</span>
        </div>

        {/* Product Information */}
        <div className="detail-info">

          <span className="detail-category">
            {product.category}
          </span>

          <h1 className="detail-product-name">
            {product.name}
          </h1>

          <div className="detail-price-container">
            <span className="detail-price">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="detail-price-note">
              Inclusive of all applicable taxes
            </span>
          </div>

          <div className="detail-divider"></div>

          {/* Description */}
          <div className="detail-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className={`detail-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
            <span className="stock-dot"></span>
            {product.stock > 0
              ? `In Stock (${product.stock} units available)`
              : 'Temporarily Out of Stock'}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="detail-cart-btn"
          >
            <span>🛒</span>
            Add to Shopping Cart
          </button>

          {/* Additional Information */}
          <div className="detail-benefits">
            <div className="detail-benefit">
              <span>✓</span>
              <p>Secure Shopping Experience</p>
            </div>
            <div className="detail-benefit">
              <span>✓</span>
              <p>Quality Products</p>
            </div>
            <div className="detail-benefit">
              <span>✓</span>
              <p>Customer Support</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

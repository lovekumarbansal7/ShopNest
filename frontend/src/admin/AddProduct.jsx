import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert('Please select an image');
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await api.post('/products', data);

      alert('Product created successfully with Cloudinary Image URL!');
      navigate('/shop');

    } catch (error) {
      console.error('Product creation error:', error);
      alert(error.response?.data?.message || 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page add-product-page">

      <div className="admin-container">

        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">SHOPNEST ADMIN PANEL</span>
            <h1>Add New <span>Product</span></h1>
            <p>Bring something exciting to your store. Add your product details below.</p>
          </div>

          <button
            type="button"
            className="admin-back-btn"
            onClick={() => navigate('/admin')}
          >
            ← Dashboard
          </button>
        </div>

        <div className="admin-form-card">

          <div className="admin-form-heading">
            <div className="admin-heading-icon">✦</div>
            <div>
              <h2>Product Information</h2>
              <p>Fill in the details to publish your product.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="admin-product-form">

            <div className="admin-form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Premium Wireless Headphones"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell customers what makes this product special..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-row">

              <div className="admin-form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  placeholder="Available units"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="admin-form-group">
              <label htmlFor="category">Product Category</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="e.g. Electronics, Fashion, Accessories"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-upload-section">

              <label className="admin-upload-label">
                Product Image
              </label>

              <div className="admin-upload-box">
                <div className="admin-upload-icon">↑</div>

                <div className="admin-upload-text">
                  <h3>Upload product image</h3>
                  <p>Choose an image from your device</p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <span className="admin-file-name">
                  {image ? `✓ ${image.name}` : 'No image selected'}
                </span>
              </div>

              <small>Image will be uploaded through your existing Cloudinary backend integration.</small>

            </div>

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => navigate('/admin')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-submit-btn"
                disabled={loading}
              >
                {loading ? 'Uploading & Creating...' : 'Publish Product →'}
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;
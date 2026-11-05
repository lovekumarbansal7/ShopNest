
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const EditProduct = () => {
  const { id } = useParams();
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
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        alert(error.response?.data?.message || 'Unable to load product');
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);

    if (image) {
      data.append('image', image);
    }

    try {
      await api.put(`/products/${id}`, data);

      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.message || 'Error updating product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="admin-page">
        <div className="admin-loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page edit-product-page">
      <div className="admin-container">

        {/* Header */}
        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">SHOPNEST ADMIN PANEL</span>
            <h1>Edit <span>Product</span></h1>
            <p>Make changes to your product details and keep your store updated.</p>
          </div>

          <button
            type="button"
            className="admin-back-btn"
            onClick={() => navigate('/admin/products')}
          >
            ← Products
          </button>
        </div>

        {/* Form */}
        <div className="admin-form-card">

          <div className="admin-form-heading">
            <div className="admin-heading-icon">✎</div>
            <div>
              <h2>Update Product Information</h2>
              <p>Edit the details below and save your changes.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="admin-product-form">

            <div className="admin-form-group">
              <label htmlFor="edit-name">Product Name</label>
              <input
                id="edit-name"
                type="text"
                name="name"
                placeholder="Product Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="edit-description">Product Description</label>
              <textarea
                id="edit-description"
                name="description"
                placeholder="Describe your product..."
                required
                rows="5"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-row">

              <div className="admin-form-group">
                <label htmlFor="edit-price">Price (₹)</label>
                <input
                  id="edit-price"
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="edit-stock">Stock Quantity</label>
                <input
                  id="edit-stock"
                  type="number"
                  name="stock"
                  placeholder="Available units"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="admin-form-group">
              <label htmlFor="edit-category">Product Category</label>
              <input
                id="edit-category"
                type="text"
                name="category"
                placeholder="Product category"
                required
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* Optional Image Replacement */}
            <div className="admin-upload-section">

              <label className="admin-upload-label">
                Replace Product Image (Optional)
              </label>

              <div className="admin-upload-box">
                <div className="admin-upload-icon">↑</div>

                <div className="admin-upload-text">
                  <h3>{image ? 'New image selected' : 'Choose a replacement image'}</h3>
                  <p>Select a new image only if you want to replace the existing one.</p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0] || null)}
                />

                <span className="admin-file-name">
                  {image ? `✓ ${image.name}` : 'Existing image will be retained'}
                </span>
              </div>

            </div>

            {/* Actions */}
            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => navigate('/admin/products')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-submit-btn"
                disabled={loading}
              >
                {loading ? 'Updating Product...' : 'Save Changes →'}
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default EditProduct;

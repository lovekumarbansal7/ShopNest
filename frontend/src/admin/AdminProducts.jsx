
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        const data = res.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      setDeletingId(id);

      try {
        await api.delete(`/products/${id}`);

        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== id)
        );
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.response?.data?.message || 'Failed to delete product');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const totalStock = products.reduce(
    (total, product) => total + (Number(product.stock) || 0),
    0
  );

  const categoriesCount = new Set(
    products.map(product => product.category).filter(Boolean)
  ).size;

  const getStockClass = (stock) => {
    if (Number(stock) === 0) return 'stock-out';
    if (Number(stock) <= 5) return 'stock-low';
    return 'stock-available';
  };

  return (
    <div className="admin-page admin-products-page">
      <div className="admin-container">

        {/* Page Header */}
        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">SHOPNEST ADMIN PANEL</span>
            <h1>Manage <span>Products</span></h1>
            <p>Manage your catalog, update product details, and keep track of inventory.</p>
          </div>

          <div className="admin-products-header-actions">
            <button
              className="admin-back-btn"
              onClick={() => navigate('/admin')}
            >
              ← Dashboard
            </button>

            <Link to="/admin/add-product" className="admin-add-product-btn">
              + Add Product
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="products-summary-grid">

          <div className="products-summary-card">
            <div className="products-summary-icon">🛍️</div>
            <div>
              <span>Total Products</span>
              <h2>{products.length}</h2>
            </div>
          </div>

          <div className="products-summary-card">
            <div className="products-summary-icon category-summary-icon">📂</div>
            <div>
              <span>Categories</span>
              <h2>{categoriesCount}</h2>
            </div>
          </div>

          <div className="products-summary-card">
            <div className="products-summary-icon stock-summary-icon">📦</div>
            <div>
              <span>Total Stock Units</span>
              <h2>{totalStock}</h2>
            </div>
          </div>

        </div>

        {/* Products Table */}
        <div className="products-table-card">

          <div className="products-table-header">
            <div>
              <h2>Product Inventory</h2>
              <p>All products currently listed in your store.</p>
            </div>

            <span className="products-count">
              {products.length} Products
            </span>
          </div>

          {loading ? (
            <div className="products-empty-state">
              <div className="loading-spinner"></div>
              <p>Loading your products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="products-empty-state">
              <div className="empty-products-icon">🛍️</div>
              <h3>No products found</h3>
              <p>Your product catalog is looking a little empty.</p>

              <Link
                to="/admin/add-product"
                className="admin-add-product-btn"
              >
                + Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="products-table-wrapper">
              <table className="admin-products-table">

                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRODUCT ID</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>STOCK</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>

                      <td>
                        <div className="admin-product-info">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="admin-product-thumbnail"
                          />

                          <span className="admin-product-name">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="admin-product-id">
                          {product._id.substring(0, 8)}...
                        </span>
                      </td>

                      <td>
                        <strong className="admin-product-price">
                          ₹{product.price.toFixed(2)}
                        </strong>
                      </td>

                      <td>
                        <span className="admin-category-badge">
                          {product.category}
                        </span>
                      </td>

                      <td>
                        <span className={`admin-stock-badge ${getStockClass(product.stock)}`}>
                          {product.stock === 0
                            ? 'Out of Stock'
                            : `${product.stock} Units`}
                        </span>
                      </td>

                      <td>
                        <div className="admin-product-actions">

                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="admin-edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            disabled={deletingId === product._id}
                            className="admin-delete-btn"
                          >
                            {deletingId === product._id ? 'Deleting...' : 'Delete'}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminProducts;

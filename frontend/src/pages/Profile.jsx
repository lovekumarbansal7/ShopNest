
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await api.get('/orders/myorders', {
          validateStatus: () => true
        });

        if (res.status >= 200 && res.status < 300) {
          setOrders(Array.isArray(res.data) ? res.data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate('/login');
          }

          setOrders([]);
        }
      } catch (error) {
        console.error('Fetching orders error:', error);
        console.error('Server response:', error.response?.data);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-heading">
            <span className="profile-eyebrow">YOUR SHOPNEST ACCOUNT</span>
            <h1>My Profile</h1>
            <p>Manage your account and keep track of your orders.</p>
          </div>

          <button
            onClick={handleLogout}
            className="profile-logout-btn"
          >
            Logout
            <span>↗</span>
          </button>
        </div>

        {/* User Information */}
        <section className="profile-info-card">

          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-user-details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <span className="profile-role-badge">
              {user.role?.toUpperCase()}
            </span>
          </div>

          <div className="profile-account-label">
            <span className="profile-online-dot"></span>
            Account Active
          </div>

        </section>

        {/* Order History */}
        <section className="profile-orders-section">

          <div className="profile-section-heading">
            <div>
              <h2>Order History</h2>
              <p>View your previous purchases and order status.</p>
            </div>

            <span className="profile-order-count">
              {orders.length} Orders
            </span>
          </div>

          {loading ? (
            <div className="profile-loading">
              <div className="profile-loader"></div>
              <p>Fetching your orders...</p>
            </div>
          ) : orders.length === 0 ? (

            <div className="profile-empty-orders">
              <div className="profile-empty-icon">📦</div>
              <h3>No Orders Yet</h3>
              <p>
                You haven't placed any orders yet.
                Start exploring our collection!
              </p>
              <Link to="/shop" className="profile-shop-btn">
                Start Shopping
                <span>→</span>
              </Link>
            </div>

          ) : (

            <div className="profile-order-list">

              {orders.map((order) => (
                <div key={order._id} className="profile-order-card">

                  <div className="profile-order-details">

                    <div className="profile-order-id">
                      <span>ORDER ID</span>
                      <strong>{order._id}</strong>
                    </div>

                    <div className="profile-order-date">
                      <span>PLACED ON</span>
                      <strong>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </strong>
                    </div>

                    <div className="profile-order-total">
                      <span>TOTAL AMOUNT</span>
                      <strong>
                        ₹{order.totalAmount.toFixed(2)}
                      </strong>
                    </div>

                  </div>

                  <div className="profile-order-status-wrapper">
                    <span className="profile-status-label">
                      ORDER STATUS
                    </span>

                    <span
                      className={`profile-order-status ${
                        order.status === 'Delivered'
                          ? 'status-delivered'
                          : order.status === 'Shipped'
                          ? 'status-shipped'
                          : 'status-pending'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </div>
  );
};

export default Profile;

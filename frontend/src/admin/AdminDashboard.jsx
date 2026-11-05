
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await api.get('/analytics', {
          validateStatus: () => true
        });

        if (res.status >= 200 && res.status < 300) {
          setStats(res.data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders,
      icon: '📦',
      description: 'Orders received'
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts,
      icon: '🛍️',
      description: 'Products in store'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      icon: '👥',
      description: 'Registered customers'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue.toFixed(2)}`,
      icon: '💰',
      description: 'Revenue generated'
    }
  ];

  const adminActions = [
    {
      title: 'Add Product',
      description: 'Bring new products to your store.',
      icon: '✚',
      path: '/admin/add-product',
      className: 'add-action'
    },
    {
      title: 'Manage Products',
      description: 'Edit, update, or remove products.',
      icon: '📦',
      path: '/admin/products',
      className: ''
    },
    {
      title: 'Manage Orders',
      description: 'View orders and manage deliveries.',
      icon: '🚚',
      path: '/admin/orders',
      className: ''
    },
    {
      title: 'Users Directory',
      description: 'Explore your registered customers.',
      icon: '👥',
      path: '/admin/users',
      className: ''
    }
  ];

  return (
    <div className="admin-page dashboard-page">
      <div className="admin-container">

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="dashboard-brand">
            <img
              src="/ShopNestLogo.png"
              alt="ShopNest Logo"
              className="dashboard-logo"
            />

            <div>
              <span className="admin-eyebrow">SHOPNEST CONTROL CENTER</span>
              <h1>Admin <span>Dashboard</span></h1>
            </div>
          </div>

          <div className="admin-status">
            <span className="status-dot"></span>
            Administrator
          </div>
        </div>

        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <div>
            <h2>Hey, {user?.name}! 👋</h2>
            <p>
              Here's what's happening with your store. Let's make today productive!
            </p>
          </div>

          <div className="welcome-decoration">✦</div>
        </div>

        {/* Analytics */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="admin-eyebrow">STORE OVERVIEW</span>
              <h2>Your Store at a Glance</h2>
            </div>
            <span className="dashboard-live-label">
              <span className="status-dot"></span>
              Analytics
            </span>
          </div>

          {stats ? (
            <div className="dashboard-stats-grid">
              {statCards.map((card, index) => (
                <div className="dashboard-stat-card" key={card.title}>
                  <div className="stat-card-top">
                    <div className={`stat-icon stat-icon-${index}`}>
                      {card.icon}
                    </div>
                    <span className="stat-card-number">0{index + 1}</span>
                  </div>

                  <div className="stat-card-value">
                    {card.title === 'Total Revenue'
                      ? card.value
                      : card.value}
                  </div>

                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-loading">
              <div className="loading-spinner"></div>
              <p>Loading your store analytics...</p>
            </div>
          )}
        </section>

        {/* Admin Actions */}
        <section className="dashboard-section admin-actions-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="admin-eyebrow">MANAGE YOUR STORE</span>
              <h2>Administrative Controls</h2>
            </div>
          </div>

          <div className="admin-actions-grid">
            {adminActions.map((action) => (
              <button
                type="button"
                key={action.title}
                className={`admin-action-card ${action.className}`}
                onClick={() => navigate(action.path)}
              >
                <div className="admin-action-icon">
                  {action.icon}
                </div>

                <div className="admin-action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>

                <span className="admin-action-arrow">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Note */}
        <div className="dashboard-footer-note">
          <span>✦</span>
          <p>Good things happen when you keep your store growing.</p>
          <span>✦</span>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

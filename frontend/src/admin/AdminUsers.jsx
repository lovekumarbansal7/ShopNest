
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get('/auth/getusers');

        console.log('USERS API RESPONSE:', res.data);

        setUsers(Array.isArray(res.data) ? res.data : []);

      } catch (error) {
        console.error('Error fetching users:', error);

        setUsers([]);
        setError(
          error.response?.data?.message ||
          'Unable to load users. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const adminCount = users.filter(
    u => u.role === 'admin'
  ).length;

  const customerCount = users.filter(
    u => u.role !== 'admin'
  ).length;

  return (
    <div className="admin-page admin-users-page">
      <div className="admin-container">

        {/* Header */}
        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">
              SHOPNEST ADMIN PANEL
            </span>

            <h1>
              User <span>Directory</span>
            </h1>

            <p>
              Meet your community. Keep track of registered users and administrators.
            </p>
          </div>

          <button
            className="admin-back-btn"
            onClick={() => navigate('/admin')}
          >
            ← Dashboard
          </button>
        </div>

        {/* Summary Cards */}
        <div className="users-summary-grid">

          <div className="users-summary-card">
            <div className="users-summary-icon">👥</div>
            <div>
              <span>Total Users</span>
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="users-summary-card">
            <div className="users-summary-icon customer-users-icon">
              🛍️
            </div>
            <div>
              <span>Customers</span>
              <h2>{customerCount}</h2>
            </div>
          </div>

          <div className="users-summary-card">
            <div className="users-summary-icon admin-users-icon">
              🛡️
            </div>
            <div>
              <span>Administrators</span>
              <h2>{adminCount}</h2>
            </div>
          </div>

        </div>

        {/* User Table */}
        <div className="users-table-card">

          <div className="users-table-header">
            <div>
              <h2>Registered Members</h2>
              <p>All accounts registered on ShopNest.</p>
            </div>

            <span className="users-count">
              {users.length} Members
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="users-empty-state">
              <div className="loading-spinner"></div>
              <p>Loading user directory...</p>
            </div>

          ) : error ? (

            /* Error */
            <div className="users-empty-state">
              <div className="empty-users-icon">⚠️</div>
              <h3>Unable to load users</h3>
              <p>{error}</p>
              <button
                className="admin-add-product-btn"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>

          ) : users.length === 0 ? (

            /* Empty State */
            <div className="users-empty-state">
              <div className="empty-users-icon">👥</div>
              <h3>No users found</h3>
              <p>Registered users will appear here.</p>
            </div>

          ) : (

            /* Users Table */
            <div className="users-table-wrapper">
              <table className="admin-users-table">

                <thead>
                  <tr>
                    <th>USER ID</th>
                    <th>MEMBER</th>
                    <th>EMAIL ADDRESS</th>
                    <th>ROLE</th>
                    <th>JOINED DATE</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(u => (

                    <tr key={u._id}>

                      <td>
                        <span className="user-id">
                          {u._id?.substring(0, 8)}...
                        </span>
                      </td>

                      {/* Username */}
                      <td>
                        <div className="admin-user-info">

                          <div className={`admin-user-avatar ${
                            u.role === 'admin' ? 'admin-avatar' : ''
                          }`}>
                            {u.username?.charAt(0).toUpperCase() || 'U'}
                          </div>

                          <span className="admin-user-name">
                            {u.username || 'Unknown User'}
                          </span>

                        </div>
                      </td>

                      {/* Email */}
                      <td>
                        <span className="admin-user-email">
                          {u.email}
                        </span>
                      </td>

                      {/* Role */}
                      <td>
                        <span className={`user-role-badge ${
                          u.role === 'admin'
                            ? 'user-role-admin'
                            : 'user-role-customer'
                        }`}>
                          {u.role?.toUpperCase() || 'USER'}
                        </span>
                      </td>

                      {/* Registration Date */}
                      <td>
                        <span className="user-joined-date">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </td>

                    </tr>

                  ))}
                </tbody>

              </table>
            </div>

          )}

        </div>

        {/* Footer */}
        <div className="users-footer-note">
          <span>✦</span>
          <p>
            Your ShopNest community is growing. Keep creating great experiences!
          </p>
          <span>✦</span>
        </div>

      </div>
    </div>
  );
};

export default AdminUsers;

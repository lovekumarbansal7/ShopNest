
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/order');
        const data = res.data;
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    setUpdatingOrder(id);

    try {
      await api.put(`/order/${id}/status`, { status });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      alert(error.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'order-status-pending';
      case 'Shipped':
        return 'order-status-shipped';
      case 'Delivered':
        return 'order-status-delivered';
      default:
        return 'order-status-pending';
    }
  };

  const totalRevenue = orders.reduce(
    (total, order) => total + (Number(order.totalAmount) || 0),
    0
  );

  const pendingOrders = orders.filter(
    order => order.status === 'Pending'
  ).length;

  const deliveredOrders = orders.filter(
    order => order.status === 'Delivered'
  ).length;

  return (
    <div className="admin-page admin-orders-page">
      <div className="admin-container">

        {/* Header */}
        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">SHOPNEST ADMIN PANEL</span>
            <h1>Manage <span>Orders</span></h1>
            <p>Keep track of customer orders and manage their delivery status.</p>
          </div>

          <button
            className="admin-back-btn"
            onClick={() => navigate('/admin')}
          >
            ← Dashboard
          </button>
        </div>

        {/* Order Summary */}
        <div className="orders-summary-grid">

          <div className="orders-summary-card">
            <div className="orders-summary-icon">📦</div>
            <div>
              <span>Total Orders</span>
              <h2>{orders.length}</h2>
            </div>
          </div>

          <div className="orders-summary-card">
            <div className="orders-summary-icon pending-icon">⏳</div>
            <div>
              <span>Pending Orders</span>
              <h2>{pendingOrders}</h2>
            </div>
          </div>

          <div className="orders-summary-card">
            <div className="orders-summary-icon delivered-icon">✓</div>
            <div>
              <span>Delivered Orders</span>
              <h2>{deliveredOrders}</h2>
            </div>
          </div>

          <div className="orders-summary-card">
            <div className="orders-summary-icon revenue-icon">₹</div>
            <div>
              <span>Order Value</span>
              <h2>₹{totalRevenue.toFixed(2)}</h2>
            </div>
          </div>

        </div>

        {/* Orders Table */}
        <div className="orders-table-card">

          <div className="orders-table-header">
            <div>
              <h2>All Orders</h2>
              <p>View and update your customer orders.</p>
            </div>

            <span className="orders-count">
              {orders.length} Orders
            </span>
          </div>

          {loading ? (
            <div className="orders-empty-state">
              <div className="loading-spinner"></div>
              <p>Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="orders-empty-state">
              <div className="empty-orders-icon">📭</div>
              <h3>No orders yet!</h3>
              <p>Customer orders will appear here when they place an order.</p>
            </div>
          ) : (
            <div className="orders-table-wrapper">
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>TOTAL AMOUNT</th>
                    <th>ORDER DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>

                      <td>
                        <span className="order-id">
                          #{order._id.substring(0, 8)}...
                        </span>
                      </td>

                      <td>
                        <div className="order-customer">
                          <div className="customer-avatar">
                            {(order.userId?.username || 'D')
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <span>
                            {order.userId?.username || 'Deleted User'}
                          </span>
                        </div>
                      </td>

                      <td>
                        <strong className="order-amount">
                          ₹{order.totalAmount.toFixed(2)}
                        </strong>
                      </td>

                      <td>
                        <span className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td>
                        <div className="order-status-wrapper">
                          <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>

                          <select
                            value={order.status}
                            disabled={updatingOrder === order._id}
                            onChange={(e) =>
                              updateStatus(order._id, e.target.value)
                            }
                            className="order-status-select"
                            aria-label={`Update status for order ${order._id}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>

                          {updatingOrder === order._id && (
                            <span className="order-updating">
                              Saving...
                            </span>
                          )}
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

export default AdminOrders;

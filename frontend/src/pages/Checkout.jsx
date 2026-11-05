
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import api from '../services/api';
import '../styles/checkout.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Preserves fetch's response.ok behavior with Axios
  const isSuccessful = (response) =>
    response.status >= 200 && response.status < 300;



  const bypassPayment = async () => {
    try {
      const saveOrderRes = await api.post(
        '/order',
        {
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId: 'bypass_txn_' + Date.now()
        },
        {
          validateStatus: () => true
        }
      );

      console.log('ORDER STATUS:', saveOrderRes.status);
      console.log('ORDER RESPONSE:', saveOrderRes.data);

      if (saveOrderRes.status >= 200 && saveOrderRes.status < 300) {
        dispatch(clearCart());
        navigate('/ordersuccess');
      } else {
        alert(`Order saving failed: ${saveOrderRes.status}`);
      }
    } catch (error) {
      console.error('ORDER ERROR:', error);
      console.error('SERVER RESPONSE:', error.response?.data);
      alert('Order request failed.');
    }
  };



  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const orderRes = await api.post(
        '/payment/order',
        { amount: totalPrice },
        { validateStatus: () => true }
      );

      const orderData = orderRes.data;

      if (!isSuccessful(orderRes)) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm(
          'Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?'
        );

        if (fallback) {
          return bypassPayment();
        } else {
          return alert('Payment failed to initialize');
        }
      }

      const options = {
        key: 'rzp_test_dummykey123', // Student dummy fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {
          try {
            // Verify Razorpay payment
            const verifyRes = await api.post(
              '/payment/verify',
              response,
              { validateStatus: () => true }
            );

            if (isSuccessful(verifyRes)) {
              // Save order
              const saveOrderRes = await api.post(
                '/orders',
                {
                  items: cartItems,
                  totalAmount: totalPrice,
                  address,
                  paymentId: response.razorpay_payment_id
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`
                  },
                  validateStatus: () => true
                }
              );

              if (isSuccessful(saveOrderRes)) {
                dispatch(clearCart());
                navigate('/ordersuccess');
              } else {
                alert('Order saving failed');
              }
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification/order error:', error);
            alert('Something went wrong while processing your order.');
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },

        theme: {
          color: '#f97316'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Unable to initialize payment. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* Header */}
        <div className="checkout-header">
          <span className="checkout-eyebrow">ALMOST THERE!</span>
          <h1>Checkout</h1>
          <p>Complete your shipping details to place your order.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="checkout-empty">
            <div className="checkout-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products before proceeding to checkout.</p>
            <button
              type="button"
              className="checkout-back-btn"
              onClick={() => navigate('/shop')}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="checkout-content">

            {/* Shipping Form */}
            <form onSubmit={handleSubmit} className="shipping-form">

              <div className="checkout-section-heading">
                <span className="checkout-step">01</span>
                <div>
                  <h2>Shipping Address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-form-grid">

                <div className="checkout-field full-width">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="checkout-field full-width">
                  <label htmlFor="street">Street Address</label>
                  <input
                    id="street"
                    type="text"
                    placeholder="House number, street name"
                    required
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Enter city"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="Enter postal code"
                    required
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                  />
                </div>

                <div className="checkout-field full-width">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Enter country"
                    required
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                  />
                </div>

              </div>

              <div className="checkout-payment-note">
                <span>🔒</span>
                <p>Your order and payment information are processed securely.</p>
              </div>

              <div className="checkout-mobile-total">
                <span>Total to Pay</span>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              <button type="submit" className="checkout-pay-btn">
                Pay Now
                <span>→</span>
              </button>

              <button
                type="button"
                className="checkout-continue-link"
                onClick={() => navigate('/cart')}
              >
                ← Return to Cart
              </button>

            </form>

            {/* Order Summary */}
            <aside className="checkout-summary">

              <h2>Order Summary</h2>
              <p className="checkout-summary-subtitle">
                Review your items before payment.
              </p>

              <div className="checkout-order-items">
                {cartItems.map((item) => (
                  <div className="checkout-order-item" key={item.productId}>
                    <div className="checkout-order-image">
                      <img src={item.imageUrl} alt={item.name} />
                      <span>{item.qty}</span>
                    </div>

                    <div className="checkout-order-details">
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.qty}</p>
                    </div>

                    <strong>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-divider"></div>

              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="checkout-summary-divider"></div>

              <div className="checkout-total-row">
                <span>Total to Pay</span>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              <div className="checkout-trust">
                <span>✓</span>
                Secure ShopNest Checkout
              </div>

            </aside>

          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

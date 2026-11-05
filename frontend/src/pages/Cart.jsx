
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container">

        {/* Page Header */}
        <div className="cart-header">
          <div>
            <span className="cart-eyebrow">YOUR SHOPPING BAG</span>
            <h1>Shopping Cart</h1>
            <p>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <Link to="/shop" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>
              Looks like you haven't added anything to your cart yet.
              Explore our collection and find something you love!
            </p>
            <Link to="/shop" className="empty-cart-btn">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-section-heading">
                <h2>Cart Items</h2>
                <span>{cartItems.length} products</span>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.productId} className="cart-item">

                    <div className="cart-item-image-wrapper">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </div>

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>

                      <p className="cart-item-price">
                        ₹{item.price}
                      </p>

                      <div className="cart-item-actions">
                        <div className="qty-controls">
                          <button
                            onClick={() => handleUpdateQty(item, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span>{item.qty}</span>

                          <button
                            onClick={() => handleUpdateQty(item, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="btn-remove"
                        >
                          <span>×</span> Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-subtotal">
                      <span>Subtotal</span>
                      <strong>
                        ₹{(item.price * item.qty).toFixed(2)}
                      </strong>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-label">Calculated at checkout</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-checkout"
              >
                Proceed to Checkout
                <span>→</span>
              </button>

              <div className="cart-secure-note">
                <span>🔒</span>
                <p>Secure checkout experience</p>
              </div>

              <Link to="/shop" className="summary-continue">
                Continue Shopping
              </Link>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

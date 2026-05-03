import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const formatPrice = (p) => '₹' + p.toLocaleString('en-IN');

export default function Cart() {
  const { items, removeItem, increment, decrement, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty page-enter container">
        <div className="cart-empty__icon">
          <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="cart-empty__cta">Browse Products</Link>
      </div>
    );
  }

  const savings = items.reduce((s, i) => s + (i.originalPrice - i.price) * i.qty, 0);
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + tax;

  return (
    <div className="cart page-enter">
      <div className="container">
        <div className="cart__header">
          <h1 className="cart__title">
            Your Cart <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </h1>
          <button className="cart__clear" onClick={clearCart}>Clear all</button>
        </div>

        <div className="cart__layout">
          {/* Items */}
          <div className="cart__items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item__img">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item__info">
                  <p className="cart-item__cat">{item.category}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="cart-item__name">{item.name}</h3>
                  </Link>
                  <div className="cart-item__row">
                    <div className="cart-item__qty">
                      <button onClick={() => decrement(item.id)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => increment(item.id)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    </div>
                    <div className="cart-item__price">
                      <span className="total-price">{formatPrice(item.price * item.qty)}</span>
                      {item.qty > 1 && <span className="unit-price">{formatPrice(item.price)} each</span>}
                    </div>
                  </div>
                </div>
                <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="Remove">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6 18.1 20a2 2 0 0 1-2 1.9H7.9a2 2 0 0 1-2-1.9L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart__summary">
            <h2 className="summary__title">Order Summary</h2>

            <div className="summary__rows">
              <div className="summary__row">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary__row summary__row--green">
                <span>You Save</span>
                <span>−{formatPrice(savings)}</span>
              </div>
              <div className="summary__row">
                <span>GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="summary__row">
                <span>Delivery</span>
                <span className="free">FREE</span>
              </div>
            </div>

            <div className="summary__total">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <button className="summary__checkout">
              Proceed to Checkout
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            <Link to="/" className="summary__continue">
              ← Continue Shopping
            </Link>

            <div className="summary__secure">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Secure checkout · 256-bit SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

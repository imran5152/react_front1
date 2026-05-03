import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const formatPrice = (p) => '₹' + p.toLocaleString('en-IN');
const discount = (orig, curr) => Math.round(((orig - curr) / orig) * 100);
const stars = (r) => '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r));

export default function ProductCard({ product }) {
  const { addItem, isInCart, removeItem } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const inCart = isInCart(product.id);

  const handleCartToggle = (e) => {
    e.preventDefault();
    inCart ? removeItem(product.id) : addItem(product);
  };

  const disc = discount(product.originalPrice, product.price);

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__img-wrap">
        {!imgLoaded && <div className="skeleton" style={{ position: 'absolute', inset: 0, borderRadius: 0 }} />}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        {!product.inStock && (
          <div className="product-card__oos">Out of Stock</div>
        )}
        <div className="product-card__disc">-{disc}%</div>
      </div>

      <div className="product-card__body">
        <p className="product-card__cat">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <span className="stars">{stars(product.rating)}</span>
          <span className="count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-card__pricing">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="orig">{formatPrice(product.originalPrice)}</span>
        </div>

        <button
          className={`product-card__btn ${inCart ? 'product-card__btn--in' : ''} ${!product.inStock ? 'product-card__btn--oos' : ''}`}
          onClick={handleCartToggle}
          disabled={!product.inStock}
        >
          {!product.inStock ? 'Out of Stock' : inCart ? (
            <>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              In Cart
            </>
          ) : (
            <>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}

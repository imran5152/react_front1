import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './ProductDetails.css';

const formatPrice = (p) => '₹' + p.toLocaleString('en-IN');
const discount = (orig, curr) => Math.round(((orig - curr) / orig) * 100);

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addItem, removeItem, isInCart, increment, decrement, items } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!product) {
    return (
      <div className="not-found page-enter container">
        <h2>Product not found</h2>
        <Link to="/">← Back to store</Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartItem = items.find(i => i.id === product.id);
  const disc = discount(product.originalPrice, product.price);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="product-details page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/?category=${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="pd__main">
          {/* Image */}
          <div className="pd__img-col">
            <div className="pd__img-wrap">
              {!imgLoaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                style={{ opacity: imgLoaded ? 1 : 0 }}
              />
              {product.badge && <span className="pd__badge">{product.badge}</span>}
              <div className="pd__disc">-{disc}%</div>
            </div>
          </div>

          {/* Info */}
          <div className="pd__info">
            <p className="pd__cat">{product.category}</p>
            <h1 className="pd__name">{product.name}</h1>

            <div className="pd__rating">
              <span className="pd__stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.ceil(product.rating))}</span>
              <span className="pd__score">{product.rating}</span>
              <span className="pd__reviews">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="pd__pricing">
              <span className="pd__price">{formatPrice(product.price)}</span>
              <span className="pd__orig">{formatPrice(product.originalPrice)}</span>
              <span className="pd__save">You save {formatPrice(product.originalPrice - product.price)}</span>
            </div>

            <p className="pd__desc">{product.description}</p>

            {/* Specs */}
            <div className="pd__specs">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="pd__spec">
                  <span className="pd__spec-k">{k}</span>
                  <span className="pd__spec-v">{v}</span>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className={`pd__stock ${product.inStock ? 'in-stock' : 'out-stock'}`}>
              <span className="stock-dot" />
              {product.inStock ? 'In Stock — Ready to Ship' : 'Out of Stock'}
            </div>

            {/* Cart controls */}
            {product.inStock && (
              <div className="pd__actions">
                {inCart ? (
                  <div className="pd__qty">
                    <button onClick={() => decrement(product.id)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span>{cartItem?.qty ?? 0}</span>
                    <button onClick={() => increment(product.id)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                ) : (
                  <button className="pd__add" onClick={() => addItem(product)}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Add to Cart
                  </button>
                )}

                <button className="pd__cart-link" onClick={() => navigate('/cart')}>
                  View Cart →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pd__related">
            <h2 className="pd__related-title">More in {product.category}</h2>
            <div className="pd__related-grid">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="pd__related-card">
                  <div className="pd__related-img">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="pd__related-info">
                    <p>{p.name}</p>
                    <span>{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

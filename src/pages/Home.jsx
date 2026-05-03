import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Home.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('default');

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, searchQuery, sort]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setSearchParams({});
  };

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner container">
          <div className="hero__tag">New Arrivals 2025</div>
          <h1 className="hero__title">
            Tech that<br />
            <span className="hero__accent">moves you</span>
          </h1>
          <p className="hero__sub">
            Curated premium electronics. Free delivery on orders over ₹999.
          </p>
          <div className="hero__stats">
            <div className="hero__stat"><span>{products.length}+</span>Products</div>
            <div className="hero__stat"><span>100%</span>Genuine</div>
            <div className="hero__stat"><span>1 Day</span>Delivery</div>
          </div>
        </div>
        <div className="hero__glow" />
      </section>

      {/* Filters */}
      <div className="filters container">
        <div className="filters__cats">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filters__cat ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className="filters__sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Results info */}
      <div className="container results-info">
        {searchQuery && (
          <p>
            Search results for <strong>"{searchQuery}"</strong> — {filtered.length} products found
            <button className="clear-search" onClick={() => setSearchParams({})}>✕ Clear</button>
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="container">
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">◈</div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search query.</p>
            <button onClick={() => { setActiveCategory('All'); setSearchParams({}); }}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { useCart } from './context/CartContext';

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="toast">
      <div className="toast-dot" />
      {message}
    </div>
  );
}

export default function App() {
  const { totalItems } = useCart();
  const [prevItems, setPrevItems] = useState(totalItems);
  const [toast, setToast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (totalItems > prevItems) {
      setToast('Item added to cart!');
    }
    setPrevItems(totalItems);
  }, [totalItems]);

  const clearToast = useCallback(() => setToast(null), []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/cart"          element={<Cart />} />
          <Route path="/product/:id"   element={<ProductDetails />} />
          <Route path="*"              element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {toast && <Toast message={toast} onDone={clearToast} />}
    </>
  );
}

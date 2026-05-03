import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>◈</span> ShopWave
          </div>
          <p>Premium tech products, curated for you. Fast delivery. Genuine warranty.</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Shop</h4>
            <Link to="/">All Products</Link>
            <Link to="/?category=Audio">Audio</Link>
            <Link to="/?category=Laptops">Laptops</Link>
            <Link to="/?category=Smartphones">Smartphones</Link>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <a href="#">FAQ</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Returns</a>
            <a href="#">Track Order</a>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} ShopWave. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M18 9l-5 5-4-4-6 6" />
          </svg>
          StockTracker Pro
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/stock1" className="nav-link">Tstar</Link>
          <Link to="/stock2" className="nav-link">S.S. Bhuye</Link>
          <Link to="/summary" className="nav-link">Summary</Link>
        </div>
      </nav>

      <section className="hero-section fade-in" style={{ paddingTop: '80px' }}>
        <h1 className="hero-title">Track Your Investments</h1>
        <p className="hero-subtitle">
          Real-time stock monitoring with professional analytics and insights to make smarter investment decisions.
        </p>
        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80"
          alt="Stock Market"
          className="hero-image"
        />
      </section>

      <footer className="footer">
        <p className="footer-text">© 2026 StockTracker Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
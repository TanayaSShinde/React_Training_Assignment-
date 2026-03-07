import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "../App.css";

const Stock1 = () => {
  const { data } = useStock();
  const stock = data.stock1;
  const latest = stock[stock.length - 1];
  const min = Math.min(...stock);
  const max = Math.max(...stock);

  return (
    <div className="stock-container">
      {/* Navigation */}
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

      <div style={{ paddingTop: '80px' }}>
        <div className="stock-header fade-in">
          <div className="stock-info">
            <h1 className="stock-name">📈 Tstar</h1>
            <p className="stock-company">Technology & Innovation Corp.</p>
          </div>
          <div className="stock-price">
            <p className="current-price">${latest}</p>
          </div>
        </div>

        {/* Stock Stats */}
        <div className="stock-stats">
          <div className="stock-stat-card fade-in">
            <div className="stock-stat-icon">💰</div>
            <p className="stock-stat-label">Current Price</p>
            <p className="stock-stat-value">${latest}</p>
          </div>
          <div className="stock-stat-card fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="stock-stat-icon">📉</div>
            <p className="stock-stat-label">Day Low</p>
            <p className="stock-stat-value" style={{ color: '#ef4444' }}>${min}</p>
          </div>
          <div className="stock-stat-card fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="stock-stat-icon">📈</div>
            <p className="stock-stat-label">Day High</p>
            <p className="stock-stat-value" style={{ color: '#10b981' }}>${max}</p>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="company-info-section fade-in">
          <h2 className="company-info-title">Company Information</h2>
          <div className="company-info-grid">
            <div className="company-info-item company-description">
              <div className="company-info-icon">📄</div>
              <div className="company-info-content">
                <p className="company-info-label">About Company</p>
                <p className="company-info-value">
                  Tstar is a leading technology and innovation company specializing in cutting-edge software solutions, 
                  artificial intelligence, and cloud computing services. Founded with a vision to transform digital 
                  experiences, Tstar has grown to become a trusted partner for businesses worldwide.
                </p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">👤</div>
              <div className="company-info-content">
                <p className="company-info-label">Founder & CEO</p>
                <p className="company-info-value">Tanay Shivaji Shinde</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">📅</div>
              <div className="company-info-content">
                <p className="company-info-label">Founded</p>
                <p className="company-info-value">2010</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">📍</div>
              <div className="company-info-content">
                <p className="company-info-label">Headquarters</p>
                <p className="company-info-value">Hinjewadi, Pune, Maharashtra, India</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">📞</div>
              <div className="company-info-content">
                <p className="company-info-label">Contact Number</p>
                <p className="company-info-value">+91 7745026264</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">✉️</div>
              <div className="company-info-content">
                <p className="company-info-label">Email</p>
                <p className="company-info-value">investor.relations@tstar.com</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">🌐</div>
              <div className="company-info-content">
                <p className="company-info-label">Website</p>
                <p className="company-info-value">www.tstar-tech.com</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">🏢</div>
              <div className="company-info-content">
                <p className="company-info-label">Industry</p>
                <p className="company-info-value">Technology & Software Services</p>
              </div>
            </div>

            <div className="company-info-item">
              <div className="company-info-icon">👥</div>
              <div className="company-info-content">
                <p className="company-info-label">Employees</p>
                <p className="company-info-value">5,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2026 StockTracker Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Stock1;
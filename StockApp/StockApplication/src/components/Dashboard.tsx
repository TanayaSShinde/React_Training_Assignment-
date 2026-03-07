import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../App.css";

const Dashboard = () => {
  const { data } = useStock();

  const stock1 = data.stock1;
  const stock2 = data.stock2;

  const min1 = Math.min(...stock1);
  const max1 = Math.max(...stock1);
  const latest1 = stock1[stock1.length - 1];

  const min2 = Math.min(...stock2);
  const max2 = Math.max(...stock2);
  const latest2 = stock2[stock2.length - 1];

  // Transform data for Recharts
  const chartData = stock1.map((value, index) => ({
    name: `Day ${index + 1}`,
    Tstar: value,
    "S.S. Bhuye": stock2[index],
  }));

  return (
    <div className="dashboard-container">
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
        <div className="dashboard-header fade-in">
          <h1 className="dashboard-title">
            📊 Stock Dashboard
          </h1>
          <p className="dashboard-subtitle">Real-time stock performance overview</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card stock1 fade-in">
            <p className="stat-label">Tstar - Latest</p>
            <p className="stat-value">${latest1}</p>
          </div>
          <div className="stat-card stock1 fade-in">
            <p className="stat-label">Tstar - Min</p>
            <p className="stat-value negative">${min1}</p>
          </div>
          <div className="stat-card stock1 fade-in">
            <p className="stat-label">Tstar - Max</p>
            <p className="stat-value positive">${max1}</p>
          </div>
          <div className="stat-card stock2 fade-in">
            <p className="stat-label">S.S. Bhuye - Latest</p>
            <p className="stat-value">${latest2}</p>
          </div>
          <div className="stat-card stock2 fade-in">
            <p className="stat-label">S.S. Bhuye - Min</p>
            <p className="stat-value negative">${min2}</p>
          </div>
          <div className="stat-card stock2 fade-in">
            <p className="stat-label">S.S. Bhuye - Max</p>
            <p className="stat-value positive">${max2}</p>
          </div>
        </div>

        <div className="chart-container fade-in">
          <h3 className="chart-title">Stock Performance Chart</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Tstar" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="S.S. Bhuye" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2026 StockTracker Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
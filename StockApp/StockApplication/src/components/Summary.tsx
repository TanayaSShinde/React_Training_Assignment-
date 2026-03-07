import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "../App.css";

type StockEntry = {
  strikeName: string;
  timestamp: string;
  value: number;
};

type SortOrder = "asc" | "desc" | null;

const Summary = () => {
  const { data } = useStock();
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Generate stock entries with timestamps
  const stockEntries: StockEntry[] = useMemo(() => {
    const entries: StockEntry[] = [];
    const baseDate = new Date();

    data.stock1.forEach((value, index) => {
      const timestamp = new Date(baseDate);
      timestamp.setHours(9 + index, 30, 0);
      entries.push({
        strikeName: "Tstar",
        timestamp: timestamp.toLocaleString(),
        value,
      });
    });

    data.stock2.forEach((value, index) => {
      const timestamp = new Date(baseDate);
      timestamp.setHours(9 + index, 45, 0);
      entries.push({
        strikeName: "S.S. Bhuye",
        timestamp: timestamp.toLocaleString(),
        value,
      });
    });

    return entries;
  }, [data]);

  // Filter and sort entries
  const filteredAndSortedEntries = useMemo(() => {
    let result = [...stockEntries];

    // Apply filter
    if (filterValue) {
      result = result.filter((entry) =>
        entry.strikeName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Apply sorting on value column
    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.value - b.value;
        }
        return b.value - a.value;
      });
    }

    return result;
  }, [stockEntries, filterValue, sortOrder]);

  const handleSort = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  const getSortIcon = () => {
    if (sortOrder === "asc") return "↑";
    if (sortOrder === "desc") return "↓";
    return "⇅";
  };

  return (
    <div className="summary-container">
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

      <div style={{ paddingTop: "80px" }}>
        <div className="summary-header fade-in">
          <h1 className="summary-title">📋 Stock Summary</h1>
          <p className="summary-subtitle">
            Complete overview of all stock entries with filtering and sorting
          </p>
        </div>

        {/* Filter Section */}
        <div className="filter-section fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="filter-container">
            <label htmlFor="stockFilter" className="filter-label">
              Filter by Stock Name:
            </label>
            <input
              id="stockFilter"
              type="text"
              className="filter-input"
              placeholder="Enter stock name..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            {filterValue && (
              <button
                className="clear-filter-btn"
                onClick={() => setFilterValue("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container fade-in" style={{ animationDelay: "0.2s" }}>
          <table className="stock-table">
            <thead>
              <tr>
                <th>Strike Name</th>
                <th>Timestamp</th>
                <th className="sortable" onClick={handleSort}>
                  Value ($)
                  <span className="sort-icon">{getSortIcon()}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedEntries.length > 0 ? (
                filteredAndSortedEntries.map((entry, index) => (
                  <tr key={index} className="table-row">
                    <td>
                      <span
                        className={`stock-badge ${
                          entry.strikeName === "Tstar" ? "tstar" : "ssbhuye"
                        }`}
                      >
                        {entry.strikeName}
                      </span>
                    </td>
                    <td>{entry.timestamp}</td>
                    <td className="value-cell">${entry.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="no-data">
                    No matching stocks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2026 StockTracker Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Summary;
 
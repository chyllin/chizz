// REMOVE the useEffect, useState, getDocs, collection, db imports and logic

// REPLACE the whole file with this:
import { useLocation, Link } from "react-router-dom";
import services from "../data/services";
import "./SearchResults.css";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const lowerQuery = query.toLowerCase();

  const filteredServices = services.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );

  return (
    <div className="search-container">
      <div className="search-header">
        <h3>Results for "{query}"</h3>
        <span>{filteredServices.length} result{filteredServices.length !== 1 ? "s" : ""}</span>
      </div>

      {filteredServices.length === 0 && (
        <p className="no-results">No services found for "{query}".</p>
      )}

      {filteredServices.map((item) => (
        <Link to="/services" key={item.id} className="search-card">
          <div className="service-icon">🛠</div>
          <div className="search-info">
            <h4>{item.title}</h4>
            <p className="category">Service</p>
            <p className="price">
              {item.priceTo
                ? `GH₵${item.priceFrom} - GH₵${item.priceTo}`
                : `GH₵${item.priceFrom}`}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
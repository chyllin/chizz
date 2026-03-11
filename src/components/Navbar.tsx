import { useState, type FormEvent, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaBox,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout, role } = useAuth();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          <div className="logo">
            <Link to="/">ChizzDigital</Link>
          </div>

          <div className="nav-right">

            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>

            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
              <li><Link to="/shopping" onClick={() => setMenuOpen(false)}>Shopping</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

              {/* Admin link — only visible to admins */}
              {role === "admin" && (
                <li>
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}

              {!user ? (
                <li className="signin-btn">
                  <button onClick={() => { setShowLogin(true); setMenuOpen(false); }}>
                    Sign In
                  </button>
                </li>
              ) : (
                <>
                  <li className="user-dropdown" ref={dropdownRef}>
                    <div
                      className="user-info"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <div className="avatar-fallback">
                        {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                      </div>
                      <span className="user-name">
                        {user.user_metadata?.full_name || user.email}
                      </span>
                      <FaChevronDown
                        className={`dropdown-arrow ${dropdownOpen ? "rotate" : ""}`}
                      />
                    </div>

                    {dropdownOpen && (
                      <div className="dropdown-menu">
                        <Link
                          to="/orders"
                          onClick={() => setDropdownOpen(false)}
                          style={{ display: "flex", alignItems: "center", gap: "8px" }}
                        >
                          <FaBox />
                          My Orders
                        </Link>
                      </div>
                    )}
                  </li>

                  <li className="signin-btn">
                    <button onClick={logout}>Logout</button>
                  </li>
                </>
              )}
            </ul>

            <div className="cart-icon">
              <Link to="/cart">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </Link>
            </div>

            <div
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        </div>
      </nav>

      {showLogin && <AuthModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
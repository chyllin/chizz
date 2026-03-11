import { Link } from "react-router-dom";
import SocialBar from "../components/SocialBar";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>ChizzDigital</h2>
          <p>
            Professional Services Made Simple—From Hosting to Career Documents.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>WhatsApp: +233 502 927 054</p>
          <p>Email: yourmail@example.com</p>
        </div>

      </div>

      <div style={{ marginTop: "40px" }}>
        <SocialBar />
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ChizzDigital. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
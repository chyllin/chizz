import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <div className="home-container">

        <div className="home-content">
          <h1>
            Professional Services Made Simple—
            <span> From Hosting to Career Documents.</span>
          </h1>

          <p>
            We provide high-quality digital services including CV writing,
            internship reports, website hosting, AdSense support, and graphics.
            Reliable, affordable, and professionally delivered.
          </p>

          <div className="home-buttons">
            <Link to="/services" className="primary-btn">
              View Services
            </Link>

            <Link to="/contact" className="secondary-btn">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import "./services.css";

interface Service {
  id: string;
  title: string;
  priceFrom: number;
  priceTo?: number;
  duration?: string;
  description: string;
}

const ITEMS_PER_PAGE = 4;

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) throw error;
        if (data) setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const formatPrice = (amount: number) => `GH₵${amount.toLocaleString()}`;

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentServices = services.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <section className="services-section">
        <div className="container">
          <div className="services-loading">
            <div className="loading-spinner" />
            <p>Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="services-section">
        <div className="container">
          <p style={{ textAlign: "center", color: "#6b7280", padding: "60px 0" }}>
            No services available yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <h2>Our Services</h2>
          <p>Professional solutions tailored to your needs</p>
        </div>

        <div className="grid">
          {currentServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="card-title">{service.title}</h3>
                <p className="description">{service.description}</p>
              </div>

              <div className="card-right">
                <p className="price">
                  {service.priceTo
                    ? `${formatPrice(service.priceFrom)} - ${formatPrice(service.priceTo)}`
                    : formatPrice(service.priceFrom)}
                </p>
                {service.duration && <p className="duration">{service.duration}</p>}
                <button
                  className="add-btn"
                  onClick={() => addToCart({ id: service.id, title: service.title, price: service.priceFrom })}
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => { setCurrentPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={currentPage === 1}
            >← Previous</button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-num ${currentPage === page ? "active-page" : ""}`}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >{page}</button>
              ))}
            </div>

            <button
              className="page-btn"
              onClick={() => { setCurrentPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={currentPage === totalPages}
            >Next →</button>
          </div>
        )}
      </div>
    </section>
  );
}
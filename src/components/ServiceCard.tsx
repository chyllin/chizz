import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import "./ServiceCard.css";

interface ServiceCardProps {
  id: number;
  title: string;
  priceFrom: number;
  priceTo?: number;
  duration?: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  priceFrom,
  priceTo,
  duration,
  description,
}) => {
  const { addToCart } = useCart();

  const formatPrice = (amount: number) => `GH₵${amount.toLocaleString()}`;

  const formattedPrice = priceTo
    ? `${formatPrice(priceFrom)} - ${formatPrice(priceTo)}`
    : formatPrice(priceFrom);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* LEFT */}
      <div>
        <h3 className="card-title">{title}</h3>
        <p className="description">{description}</p>
      </div>

      {/* RIGHT */}
      <div className="card-right">
        <p className="price">{formattedPrice}</p>
        {duration && <p className="duration">{duration}</p>}

        <button
          className="add-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart({ id, title, price: priceFrom });
          }}
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
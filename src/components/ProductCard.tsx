import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import "./productcard.css";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
}) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <img src={imageUrl} alt={name} className="product-image" />

      <div className="product-content">
        <h3 className="product-title">{name}</h3>
        <p className="product-price">GH₵{price.toLocaleString()}</p>
        <p className="product-description">{description}</p>

        <button
  className="product-add-btn"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: parseInt(id) || Math.random(), title: name, price });
  }}
>
  <span>Add to Cart</span>
</button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
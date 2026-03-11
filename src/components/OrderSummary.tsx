import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderSummary = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const formattedTotal = `GH₵${total.toLocaleString()}`;

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd" }}>
      <h2>Order Summary</h2>

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "15px" }}>
          <h4>{item.title}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: GH₵{item.price.toLocaleString()}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: {formattedTotal}</h3>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;

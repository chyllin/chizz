import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate(); // ✅ ADD THIS

  if (cart.length === 0) {
    return <h2 style={{ padding: "50px" }}>Your cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <div>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.title}</h3>
              <p>GH₵ {item.price}</p>

              <div className="quantity">
                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>

              <p>GH₵ {item.price * item.quantity}</p>
            </div>

            <button
              className="remove"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total: GH₵ {total}</p>

        {/* ✅ FIXED BUTTON */}
        <button
          className="checkout"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}

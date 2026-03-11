import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

declare global {
  interface Window { PaystackPop: any; }
}

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    if (!formData.name || !formData.phone || !formData.email) return;
    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: totalAmount * 100,
      currency: "GHS",
      callback: async (response: { reference: string }) => {
        try {
          await supabase.from("orders").insert({
            userId: user?.id,
            customerName: formData.name,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            items: cart.map((item) => ({
              title: item.title,
              quantity: item.quantity,
              price: item.price,
            })),
            total: totalAmount,
            status: "Processing",
            paystackReference: response.reference,
          });

          // Clear cart from Supabase
          for (const item of cart) {
            await supabase.from("cart").delete().eq("id", item.id);
          }

          navigate("/orders");
        } catch (err) {
          console.error("Order save failed:", err);
        }
        setLoading(false);
      },
      onClose: () => setLoading(false),
    });

    handler.openIframe();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2 className="checkout-title">Checkout</h2>

        {/* Order Summary */}
        <div className="checkout-summary">
          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <span>{item.title} ×{item.quantity}</span>
              <span>GH₵{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="checkout-total">
            <strong>Total: GH₵{totalAmount.toLocaleString()}</strong>
          </div>
        </div>

        {/* Form */}
        <div className="checkout-form">
          <input
            className="checkout-input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="checkout-input"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            className="checkout-input"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {formData.name && formData.phone && formData.email && (
            <button
              className="checkout-pay-btn"
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
            >
              {loading ? "Processing..." : `Pay GH₵${totalAmount.toLocaleString()}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
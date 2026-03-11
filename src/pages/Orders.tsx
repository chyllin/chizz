import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import "./orders.css";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

type OrderStatus = "Processing" | "In Progress" | "Completed" | "Cancelled";

interface Order {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  created_at: string;
  items: OrderItem[];
}

export default function Orders() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("userId", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data) setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const downloadInvoice = (order: Order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("INVOICE", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(`Status: ${order.status}`, 20, 45);
    doc.text(`Date: ${new Date(order.created_at).toDateString()}`, 20, 55);
    let y = 70;
    order.items.forEach((item) => {
      doc.text(`${item.title} x${item.quantity} - GH₵${item.price * item.quantity}`, 20, y);
      y += 10;
    });
    doc.text(`Total: GH₵${order.total}`, 20, y + 10);
    doc.save(`invoice_${order.id}.pdf`);
  };

  const reorderItems = (order: Order) => {
    order.items.forEach((item) => addToCart(item));
  };

  if (!user) {
    return (
      <div className="orders-container">
        <h2>Please login to view your orders.</h2>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View and track all your purchases</p>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/services" className="shop-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-top">
                <div>
                  <h3>Order #{order.id.slice(0, 6)}</h3>
                  <p className="order-date">{new Date(order.created_at).toDateString()}</p>
                </div>
                <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.title} ×{item.quantity}</span>
                    <span>GH₵{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-bottom">
                <strong>Total: GH₵{order.total}</strong>
                <div className="order-actions">
                  <button onClick={() => setSelectedOrder(order)}>View Details</button>
                  <button onClick={() => downloadInvoice(order)}>Download Invoice</button>
                  <button onClick={() => reorderItems(order)}>Reorder</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>
            {selectedOrder.items.map((item, index) => (
              <div key={index} className="modal-item">
                {item.title} ×{item.quantity} — GH₵{item.price * item.quantity}
              </div>
            ))}
            <p className="modal-total">Total: GH₵{selectedOrder.total}</p>
            <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./Admin.css";

/* ─── Types ─────────────────────────────────────── */
interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface Service {
  id?: string;
  title: string;
  priceFrom: number;
  priceTo?: number;
  duration?: string;
  description: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  status: string;
  created_at: string;
  items: { title: string; quantity: number; price: number }[];
}

type Tab = "products" | "services" | "orders";

const blankProduct: Omit<Product, "id"> = { name: "", price: 0, description: "", imageUrl: "" };
const blankService: Omit<Service, "id"> = { title: "", priceFrom: 0, priceTo: undefined, duration: "", description: "" };

/* ════════════════════════════════════════════════ */
const Admin = () => {
  const [tab, setTab] = useState<Tab>("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState(blankProduct);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [serviceForm, setServiceForm] = useState(blankService);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceLoading, setServiceLoading] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchProducts();
    fetchServices();
    fetchOrders();
  }, []);

  /* ─── IMAGE ─────────────────────────────────── */
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  /* ─── PRODUCTS ─────────────────────────────────── */
  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const handleProductSubmit = async () => {
    if (!productForm.name || !productForm.price || !productForm.description) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setProductLoading(true);
    try {
      let imageUrl = productForm.imageUrl;
      if (productImageFile) imageUrl = await uploadImage(productImageFile);

      if (!imageUrl && !editingProductId) {
        showToast("Please upload a product image.", "error");
        setProductLoading(false);
        return;
      }

      const data = { ...productForm, imageUrl, price: Number(productForm.price) };

      if (editingProductId) {
        const { error } = await supabase.from("products").update(data).eq("id", editingProductId);
        if (error) throw error;
        showToast("Product updated!");
      } else {
        const { error } = await supabase.from("products").insert(data);
        if (error) throw error;
        showToast("Product added!");
      }

      setProductForm(blankProduct);
      setProductImageFile(null);
      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Try again.", "error");
    }
    setProductLoading(false);
  };

  const startEditProduct = (product: Product) => {
    setEditingProductId(product.id!);
    setProductForm({ name: product.name, price: product.price, description: product.description, imageUrl: product.imageUrl });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
    setProductForm(blankProduct);
    setProductImageFile(null);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) showToast("Failed to delete.", "error");
    else { showToast("Product deleted."); fetchProducts(); }
  };

  /* ─── SERVICES ─────────────────────────────────── */
  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setServices(data);
  };

  const handleServiceSubmit = async () => {
    if (!serviceForm.title || !serviceForm.priceFrom || !serviceForm.description) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setServiceLoading(true);
    try {
      const data = {
        ...serviceForm,
        priceFrom: Number(serviceForm.priceFrom),
        priceTo: serviceForm.priceTo ? Number(serviceForm.priceTo) : null,
      };

      if (editingServiceId) {
        const { error } = await supabase.from("services").update(data).eq("id", editingServiceId);
        if (error) throw error;
        showToast("Service updated!");
      } else {
        const { error } = await supabase.from("services").insert(data);
        if (error) throw error;
        showToast("Service added!");
      }

      setServiceForm(blankService);
      setEditingServiceId(null);
      fetchServices();
    } catch (err) {
      console.error(err);
      showToast("Something went wrong.", "error");
    }
    setServiceLoading(false);
  };

  const startEditService = (service: Service) => {
    setEditingServiceId(service.id!);
    setServiceForm({
      title: service.title,
      priceFrom: service.priceFrom,
      priceTo: service.priceTo,
      duration: service.duration || "",
      description: service.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditService = () => {
    setEditingServiceId(null);
    setServiceForm(blankService);
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) showToast("Failed to delete.", "error");
    else { showToast("Service deleted."); fetchServices(); }
  };

  /* ─── ORDERS ─────────────────────────────────── */
  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data) setOrders(data);
    } catch (err) {
      console.error(err);
    }
    setOrdersLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
      if (error) throw error;
      showToast(`Order marked as "${status}"`);
      fetchOrders();
    } catch (err) {
      showToast("Failed to update status.", "error");
    }
    setUpdatingOrderId(null);
  };

  const statusColors: Record<string, string> = {
    Processing: "#fef3c7",
    "In Progress": "#dbeafe",
    Completed: "#d1fae5",
    Cancelled: "#fee2e2",
  };

  /* ─── Render ─────────────────────────────────── */
  return (
    <div className="admin-page">
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products, services, and orders</p>
      </div>

      <div className="admin-tabs">
        {(["products", "services", "orders"] as Tab[]).map((t) => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ══════ PRODUCTS TAB ══════ */}
      {tab === "products" && (
        <div className="admin-section">
          <div className="admin-form-card">
            <h2>{editingProductId ? "✏️ Edit Product" : "➕ Add Product"}</h2>
            <div className="admin-form">
              <div className="form-row">
                <label>Product Name *</label>
                <input
                  placeholder="e.g. Premium CV Template"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label>Price (GH₵) *</label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={productForm.price || ""}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                />
              </div>
              <div className="form-row">
                <label>Description *</label>
                <textarea
                  placeholder="Describe the product..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="form-row">
                <label>Product Image {editingProductId ? "(leave empty to keep current)" : "*"}</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    id="product-image"
                    onChange={(e) => setProductImageFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="product-image" className="file-upload-label">
                    {productImageFile ? productImageFile.name : "Click to upload image"}
                  </label>
                </div>
                {productImageFile && (
                  <img src={URL.createObjectURL(productImageFile)} alt="Preview" className="current-image-preview" />
                )}
                {editingProductId && productForm.imageUrl && !productImageFile && (
                  <img
                    src={productForm.imageUrl}
                    alt="Current"
                    className="current-image-preview"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>
              <div className="form-actions">
                <button className="admin-btn primary" onClick={handleProductSubmit} disabled={productLoading}>
                  {productLoading ? "Saving..." : editingProductId ? "Update Product" : "Add Product"}
                </button>
                {editingProductId && (
                  <button className="admin-btn secondary" onClick={cancelEditProduct}>Cancel</button>
                )}
              </div>
            </div>
          </div>

          <div className="admin-list">
            <h2>All Products ({products.length})</h2>
            {products.length === 0 ? (
              <p className="empty-msg">No products yet. Add one above.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="admin-item-card">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="admin-item-image"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="admin-item-image admin-item-no-image">No Image</div>
                  )}
                  <div className="admin-item-info">
                    <h3>{product.name}</h3>
                    <p className="admin-item-price">GH₵{product.price.toLocaleString()}</p>
                    <p className="admin-item-desc">{product.description}</p>
                  </div>
                  <div className="admin-item-actions">
                    <button className="admin-btn edit" onClick={() => startEditProduct(product)}>Edit</button>
                    <button className="admin-btn danger" onClick={() => deleteProduct(product.id!)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ══════ SERVICES TAB ══════ */}
      {tab === "services" && (
        <div className="admin-section">
          <div className="admin-form-card">
            <h2>{editingServiceId ? "✏️ Edit Service" : "➕ Add Service"}</h2>
            <div className="admin-form">
              <div className="form-row">
                <label>Service Title *</label>
                <input
                  placeholder="e.g. CV Writing"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                />
              </div>
              <div className="form-row two-col">
                <div>
                  <label>Price From (GH₵) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={serviceForm.priceFrom || ""}
                    onChange={(e) => setServiceForm({ ...serviceForm, priceFrom: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label>Price To (GH₵) — optional</label>
                  <input
                    type="number"
                    placeholder="e.g. 250"
                    value={serviceForm.priceTo || ""}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, priceTo: e.target.value ? Number(e.target.value) : undefined })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <label>Duration — optional</label>
                <input
                  placeholder="e.g. 2-3 Business Days"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label>Description *</label>
                <textarea
                  placeholder="Describe what's included..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="form-actions">
                <button className="admin-btn primary" onClick={handleServiceSubmit} disabled={serviceLoading}>
                  {serviceLoading ? "Saving..." : editingServiceId ? "Update Service" : "Add Service"}
                </button>
                {editingServiceId && (
                  <button className="admin-btn secondary" onClick={cancelEditService}>Cancel</button>
                )}
              </div>
            </div>
          </div>

          <div className="admin-list">
            <h2>All Services ({services.length})</h2>
            {services.length === 0 ? (
              <p className="empty-msg">No services yet. Add one above.</p>
            ) : (
              services.map((service) => (
                <div key={service.id} className="admin-item-card service-card">
                  <div className="admin-item-info">
                    <h3>{service.title}</h3>
                    <p className="admin-item-price">
                      GH₵{service.priceFrom.toLocaleString()}
                      {service.priceTo ? ` – GH₵${service.priceTo.toLocaleString()}` : ""}
                    </p>
                    {service.duration && <p className="admin-item-duration">⏱ {service.duration}</p>}
                    <p className="admin-item-desc">{service.description}</p>
                  </div>
                  <div className="admin-item-actions">
                    <button className="admin-btn edit" onClick={() => startEditService(service)}>Edit</button>
                    <button className="admin-btn danger" onClick={() => deleteService(service.id!)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ══════ ORDERS TAB ══════ */}
      {tab === "orders" && (
        <div className="admin-section">
          <div className="admin-orders-header">
            <h2>All Orders ({orders.length})</h2>
            <button className="admin-btn secondary" onClick={fetchOrders}>Refresh</button>
          </div>

          {ordersLoading ? (
            <p className="empty-msg">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="empty-msg">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="admin-order-card">
                <div className="admin-order-top">
                  <div>
                    <h3>Order #{order.id.slice(0, 8)}</h3>
                    <p className="admin-order-meta">
                      {order.customerName} · {order.customerEmail} · {order.customerPhone}
                    </p>
                    <p className="admin-order-date">
                      {new Date(order.created_at).toDateString()}
                    </p>
                  </div>
                  <div className="admin-order-right">
                    <span
                      className="admin-status-badge"
                      style={{ background: statusColors[order.status] || "#f3f4f6" }}
                    >
                      {order.status}
                    </span>
                    <p className="admin-order-total">GH₵{order.total?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="admin-order-items">
                  {order.items?.map((item, i) => (
                    <div key={i} className="admin-order-item-row">
                      <span>{item.title} ×{item.quantity}</span>
                      <span>GH₵{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="admin-order-controls">
                  <span>Update status:</span>
                  {["Processing", "In Progress", "Completed", "Cancelled"].map((s) => (
                    <button
                      key={s}
                      className={`status-btn ${order.status === s ? "active-status" : ""}`}
                      onClick={() => updateOrderStatus(order.id, s)}
                      disabled={updatingOrderId === order.id}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
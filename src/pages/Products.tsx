import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ProductCard from "../components/ProductCard";
import "./products.css";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="products-section">
        <div className="container">
          <div className="products-loading">
            <div className="loading-spinner" />
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <div className="container">
        <div className="products-header">
          <h2>Product Catalog</h2>
          <p>Browse our available products and add them to your cart.</p>
        </div>
        {products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280", padding: "60px 0" }}>
            No products available yet. Check back soon!
          </p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./AuthContext";

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: { id: any; title: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  const fetchCart = async () => {
    const { data } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", user!.id);
    if (data) setCart(data);
  };

  const addToCart = async (item: { id: any; title: string; price: number }) => {
    if (!user) return;

    const existing = cart.find((c) => c.productId === String(item.id));
    if (existing) {
      await updateQuantity(existing.id, existing.quantity + 1);
      return;
    }

    const { data } = await supabase
      .from("cart")
      .insert({
        userId: user.id,
        productId: String(item.id),
        title: item.title,
        price: item.price,
        quantity: 1,
      })
      .select()
      .single();

    if (data) setCart((prev) => [...prev, data]);
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(id);
    await supabase.from("cart").update({ quantity }).eq("id", id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = async (id: string) => {
    await supabase.from("cart").delete().eq("id", id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { api, CartItemDTO } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  items: CartItemDTO[];
  count: number;
  add: (carId: string, qty?: number) => void;
  update: (carId: string, qty: number) => void;
  remove: (carId: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [count, setCount] = useState(0);

  const reload = async () => {
    if (!user) { setItems([]); setCount(0); return; }
    const data = await api.getCart(user.id);
    setItems(data.items);
    setCount(data.count);
  };

  useEffect(() => { reload(); }, [user?.id]);

  const add = async (carId: string, qty = 1) => {
    if (!user) return; // require login to manage cart
    await api.addToCart(user.id, carId, qty);
    await reload();
  };
  const update = async (carId: string, qty: number) => {
    if (!user) return;
    await api.setCartItem(user.id, carId, qty);
    await reload();
  };
  const remove = async (carId: string) => {
    if (!user) return;
    await api.removeFromCart(user.id, carId);
    await reload();
  };

  const value = useMemo(
    () => ({ items, count, add, update, remove }),
    [items, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必须在 CartProvider 内使用");
  return ctx;
}

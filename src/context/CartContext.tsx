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

  const computeCount = (list: CartItemDTO[]) => list.reduce((s, i) => s + i.qty, 0);

  const reload = async () => {
    if (!user) { setItems([]); setCount(0); return; }
    const data = await api.getCart(user.id);
    setItems(data.items);
    setCount(data.count);
  };

  useEffect(() => { reload(); }, [user?.id]);

  const add = async (carId: string, qty = 1) => {
    if (!user) return; // require login to manage cart
    // Optimistic update
    setItems(prev => {
      const idx = prev.findIndex(i => i.carId === carId);
      let next: CartItemDTO[];
      if (idx >= 0) {
        next = prev.map((i, k) => k === idx ? { ...i, qty: i.qty + qty } : i);
      } else {
        next = [...prev, { carId, qty }];
      }
      setCount(computeCount(next));
      return next;
    });
    try {
      await api.addToCart(user.id, carId, qty);
    } catch (e) {
      // fallback to server truth on error
      await reload();
    }
  };

  const update = async (carId: string, qty: number) => {
    if (!user) return;
    if (qty <= 0) {
      // treat as remove
      setItems(prev => {
        const next = prev.filter(i => i.carId !== carId);
        setCount(computeCount(next));
        return next;
      });
      try {
        await api.removeFromCart(user.id, carId);
      } catch (e) {
        await reload();
      }
      return;
    }
    setItems(prev => {
      const next = prev.map(i => i.carId === carId ? { ...i, qty } : i);
      setCount(computeCount(next));
      return next;
    });
    try {
      await api.setCartItem(user.id, carId, qty);
    } catch (e) {
      await reload();
    }
  };

  const remove = async (carId: string) => {
    if (!user) return;
    setItems(prev => {
      const next = prev.filter(i => i.carId !== carId);
      setCount(computeCount(next));
      return next;
    });
    try {
      await api.removeFromCart(user.id, carId);
    } catch (e) {
      await reload();
    }
  };

  const value = useMemo(
    () => ({ items, count, add, update, remove, reload }),
    [items, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必须在 CartProvider 内使用");
  return ctx;
}

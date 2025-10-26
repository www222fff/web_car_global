import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { api, CartItemDTO } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  items: CartItemDTO[];
  count: number;
  add: (productId: string, qty?: number) => void;
  update: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  reload: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // ✅ 需要 AuthContext 提供 loading 状态
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [count, setCount] = useState(0);

  const computeCount = (list: CartItemDTO[]) => list.reduce((s, i) => s + i.qty, 0);

  const reload = async () => {
    if (!user) {
      setItems([]);
      setCount(0);
      return;
    }
    try {
      const data = await api.getCart(user.id);
      setItems(data.items);
      setCount(data.count);
    } catch (err) {
      console.error("Failed to reload cart:", err);
      setItems([]);
      setCount(0);
    }
  };

  // ✅ 等 AuthContext 加载完后再执行
  useEffect(() => {
    if (!loading && user) {
      reload();
    }
  }, [user?.id, loading]);

  const add = async (productId: string, qty = 1) => {
    if (loading) {
      console.warn("addToCart: waiting for auth to load...");
      return;
    }
    if (!user) {
      console.warn("addToCart: user not logged in");
      return;
    }

    console.log("addToCart:", user.id, productId, qty);

    // Optimistic update
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId);
      let next: CartItemDTO[];
      if (idx >= 0) {
        next = prev.map((i, k) =>
          k === idx ? { ...i, qty: i.qty + qty } : i
        );
      } else {
        next = [...prev, { productId, qty }];
      }
      setCount(computeCount(next));
      return next;
    });

    try {
      await api.addToCart(user.id, productId, qty);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      reload(); // always reload to sync with server
    }
  };

  const update = async (productId: string, qty: number) => {
    if (loading || !user) return;

    if (qty <= 0) {
      setItems((prev) => {
        const next = prev.filter((i) => i.productId !== productId);
        setCount(computeCount(next));
        return next;
      });
      try {
        await api.removeFromCart(user.id, productId);
      } finally {
        reload();
      }
      return;
    }

    setItems((prev) => {
      const next = prev.map((i) =>
        i.productId === productId ? { ...i, qty } : i
      );
      setCount(computeCount(next));
      return next;
    });

    try {
      await api.setCartItem(user.id, productId, qty);
    } finally {
      reload();
    }
  };

  const remove = async (productId: string) => {
    if (loading || !user) return;

    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      setCount(computeCount(next));
      return next;
    });

    try {
      await api.removeFromCart(user.id, productId);
    } finally {
      reload();
    }
  };

  const value = useMemo(
    () => ({ items, count, add, update, remove, reload }),
    [items, count]
  );

  // ✅ 不渲染直到 AuthContext 加载完成
  if (loading) return null;

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必须在 CartProvider 内使用");
  return ctx;
}

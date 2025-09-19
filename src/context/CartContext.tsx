import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  addToCart as storageAdd,
  getCart,
  getCartCount,
  removeFromCart as storageRemove,
  updateCartItem as storageUpdate,
} from "@/lib/storage";
import { useAuth } from "./AuthContext";

interface CartItemVM { carId: string; qty: number }

interface CartContextValue {
  items: CartItemVM[];
  count: number;
  add: (carId: string, qty?: number) => void;
  update: (carId: string, qty: number) => void;
  remove: (carId: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItemVM[]>([]);

  const reload = () => {
    if (!user) { setItems([]); return; }
    setItems(getCart(user.id));
  };

  useEffect(() => { reload(); }, [user?.id]);

  const add = (carId: string, qty = 1) => {
    if (!user) return; // require login to manage cart
    storageAdd(user.id, carId, qty);
    reload();
  };
  const update = (carId: string, qty: number) => {
    if (!user) return;
    storageUpdate(user.id, carId, qty);
    reload();
  };
  const remove = (carId: string) => {
    if (!user) return;
    storageRemove(user.id, carId);
    reload();
  };

  const value = useMemo(
    () => ({ items, count: user ? getCartCount(user.id) : 0, add, update, remove }),
    [items, user?.id]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必须在 CartProvider 内使用");
  return ctx;
}

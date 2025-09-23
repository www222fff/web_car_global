import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface OrderRow { id: string; userId: string; items: {carId:string; qty:number; price:number}[]; totalPrice: number; status: string; createdAt: number }

export default function MyOrdersPage() {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    if (!user || isAdmin) return;
    api.listOrders(user.id).then(setOrders).catch(() => setOrders([]));
  }, [user?.id, isAdmin]);

  // Cancel Order
  const handleCancel = async (id: string) => {
    if (!user) return;
    await api.cancelOrder(user.id, id);
    const list = await api.listOrders(user.id);
    setOrders(list);
  };

  if (isAdmin) {
    return (
      <Layout>
        <div className="container py-12 text-center text-muted-foreground">Admins: please use the Orders Management page</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
        {(!user || orders.length === 0) ? (
          <div className="text-muted-foreground">No orders yet</div>
        ) : (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="rounded border p-4">
                <div className="flex justify-between">
                  <div>Order ID:{o.id}</div>
                  <div className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-sm">Status:{o.status}
                  {o.status === 'pending' && (
                    <Button variant="destructive" size="sm" className="ml-4" onClick={() => handleCancel(o.id)}>Cancel Order</Button>
                  )}
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  {o.items.map((it, idx) => (
                    <div key={idx}>Car ID:{it.carId} × {it.qty}, unit price¥{it.price.toFixed(2)}</div>
                  ))}
                </div>
                <div className="mt-2 font-semibold">Total:¥{o.totalPrice.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { api, CarDTO } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface OrderRow { id: string; userId: string; items: {carId:string; qty:number; price:number}[]; totalPrice: number; status: string; createdAt: number }

export default function MyOrdersPage() {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [carMap, setCarMap] = useState<Record<string, CarDTO>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || isAdmin) return;
    setLoading(true);
    Promise.all([
      api.listOrders(user.id),
      api.getCars(true)
    ])
      .then(([orders, cars]) => {
        setOrders(orders);
        const map: Record<string, CarDTO> = {};
        cars.forEach((c: CarDTO) => { map[c.id] = c; });
        setCarMap(map);
      })
      .catch(() => { setOrders([]); setCarMap({}); })
      .finally(() => setLoading(false));
  }, [user?.id, isAdmin]);

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
        {loading ? (
          <div className="text-muted-foreground">Loading orders...</div>
        ) : (!user || orders.length === 0) ? (
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
                  {o.items.map((it, idx) => {
                    const car = carMap[it.carId];
                    return (
                      <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                        {car?.image && <img src={car.image} alt={car.name} className="h-12 w-20 object-cover rounded" />}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium line-clamp-1">{car?.name || `Car ID: ${it.carId}`}</div>
                          <div className="text-xs text-muted-foreground">Unit price: ¥{it.price.toFixed(2)}</div>
                        </div>
                        <div className="font-semibold">× {it.qty}</div>
                        <div className="text-green-700 font-bold">¥{(it.price * it.qty).toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 font-semibold text-right">Total: <span className="text-green-700">¥{o.totalPrice.toFixed(2)}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

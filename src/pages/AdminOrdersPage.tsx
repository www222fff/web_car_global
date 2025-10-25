import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { ProductDTO } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface OrderRow { id: string; userId: string; items: {productId:string; qty:number; price:number}[]; totalPrice: number; status: string; createdAt: number }

export default function AdminOrdersPage() {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [productMap, setProductMap] = useState<Record<string, ProductDTO>>({});

  useEffect(() => {
    if (!user || !isAdmin) return;
    Promise.all([
      api.listOrders(user.id, true),
  api.getProducts(true)
    ])
      .then(([orders, cars]) => {
        setOrders(orders);
  const map: Record<string, ProductDTO> = {};
  cars.forEach((p: ProductDTO) => { map[p.id] = p; });
  setProductMap(map);
      })
      .catch(() => { setOrders([]); setCarMap({}); });
  }, [user?.id, isAdmin]);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-12 text-center text-muted-foreground">Access denied</div>
      </Layout>
    );
  }

  // Delete Order
  const handleDelete = async (id: string) => {
    if (!user) return;
    await api.deleteOrder(user.id, id);
    const list = await api.listOrders(user.id, true);
    setOrders(list);
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">Orders Management</h1>
        {orders.length === 0 ? (
          <div className="text-muted-foreground">No orders yet</div>
        ) : (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="rounded border p-4">
                <div className="flex justify-between">
                  <div>Order ID:{o.id} (User:{o.userId})</div>
                  <div className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  {o.items.map((it, idx) => {
                    const product = productMap[it.productId];
                    return (
                      <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                        {product?.image && <img src={product.image} alt={product.name} className="h-12 w-20 object-cover rounded" />}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium line-clamp-1">{product?.name || `Product ID: ${it.productId}`}</div>
                          <div className="text-xs text-muted-foreground">Unit price: ¥{it.price.toFixed(2)}</div>
                        </div>
                        <div className="font-semibold">× {it.qty}</div>
                        <div className="text-green-700 font-bold">¥{(it.price * it.qty).toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span>Recipient Address: {o.address || '-'}</span><br />
                  <span>Contact: {o.contact || '-'}</span>
                </div>
                <div className="mt-2 text-sm">Status:{o.status}
                  <Button variant="destructive" size="sm" className="ml-4" onClick={() => handleDelete(o.id)}>Delete Order</Button>
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

import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface OrderRow { id: string; userId: string; items: {carId:string; qty:number; price:number}[]; totalPrice: number; status: string; createdAt: number }

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    if (!user) return;
    api.listOrders(user.id).then(setOrders).catch(() => setOrders([]));
  }, [user?.id]);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">我的订单</h1>
        {(!user || orders.length === 0) ? (
          <div className="text-muted-foreground">暂无订单</div>
        ) : (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="rounded border p-4">
                <div className="flex justify-between">
                  <div>订单号：{o.id}</div>
                  <div className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-sm">状态：{o.status}</div>
                <div className="mt-2 space-y-1 text-sm">
                  {o.items.map((it, idx) => (
                    <div key={idx}>车辆ID：{it.carId} × {it.qty}，单价¥{it.price.toFixed(2)}</div>
                  ))}
                </div>
                <div className="mt-2 font-semibold">总价：¥{o.totalPrice.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

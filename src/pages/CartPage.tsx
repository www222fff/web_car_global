import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

export default function CartPage() {
  const { user } = useAuth();
  const { items, update, remove } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => {
    const price = i.car?.price || 0;
    return sum + price * i.qty;
  }, 0);

  if (!user) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <div className="text-muted-foreground">请先登录以管理购物车</div>
          <div className="mt-4"><Link className="text-green-600" to="/login">去登录</Link></div>
        </div>
      </Layout>
    );
  }

    const checkout = async () => {
      try {
        await api.createOrder(user.id);
        // Ideally show toast, and refresh cart
        await new Promise((resolve) => setTimeout(resolve, 100)); // 确保后端已写入
        navigate("/orders");
      } catch (e) {
        alert((e as Error).message || '下单失败');
      }
    };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <Card>
          <CardHeader>
            <CardTitle>我的购物车</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-muted-foreground">购物车为空</div>
            ) : (
              <div className="space-y-4">
                {items.map((i) => {
                  const car = i.car;
                  if (!car) return null;
                  return (
                    <div key={i.carId} className="flex items-center gap-3 border-b pb-3">
                      <img src={car.image || ''} alt={car.name} className="h-16 w-24 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-medium line-clamp-1">{car.name}</div>
                        <div className="text-sm text-muted-foreground">¥{car.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => update(i.carId, Math.max(1, i.qty - 1))}>-</Button>
                        <Input value={i.qty} onChange={(e) => update(i.carId, Math.max(1, Number(e.target.value)||1))} className="w-16 text-center" />
                        <Button variant="outline" size="icon" onClick={() => update(i.carId, i.qty + 1)}>+</Button>
                      </div>
                      <Button variant="destructive" onClick={() => remove(i.carId)}>移除</Button>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-bold">合计：¥{total.toFixed(2)}</div>
                  <Button onClick={checkout}>去结算</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useUserAddress } from "@/hooks/use-user-address";

export default function CartPage() {
  const { user } = useAuth();
  const { items, update } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addressInfo, setAddressInfo] = useState<{address?: string, contact?: string}|null>(null);

  useEffect(() => {
    if (!user) return;
    fetch("/api/address", { headers: { "X-User-Id": user.id } })
      .then(res => res.ok ? res.json() : null)
      .then(data => setAddressInfo(data));
  }, [user]);

  const total = items.reduce((sum, i) => {
    const price = i.car?.price || 0;
    return sum + price * i.qty;
  }, 0);

  if (!user) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <div className="text-muted-foreground">Please log in to manage your cart</div>
          <div className="mt-4"><Link className="text-green-600" to="/login">Log in</Link></div>
        </div>
      </Layout>
    );
  }

    const { reload } = useCart();
    const checkout = async () => {
      setLoading(true);
      try {
        if (!addressInfo || !addressInfo.address || !addressInfo.contact) {
          alert("Please add your recipient address and contact info before checkout.");
          navigate("/address");
          return;
        }
        await api.createOrder(user.id);
        await reload(); // 结算后刷新购物车
        await new Promise((resolve) => setTimeout(resolve, 100));
        navigate("/orders");
      } catch (e) {
        alert((e as Error).message || 'Checkout failed');
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <Card>
          <CardHeader>
            <CardTitle>My Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-muted-foreground">Your cart is empty</div>
            ) : (
              <div className="space-y-4">
                {items.map((i) => {
                  const car = i.car;
                  if (!car) return null;
                  return (
                    <div key={i.carId} className="flex flex-wrap items-start gap-3 border-b pb-3">
                      <img src={car.image || ''} alt={car.name} className="h-16 w-24 object-cover rounded shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium line-clamp-1">{car.name}</div>
                        <div className="text-sm text-muted-foreground">¥{car.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto sm:ml-auto">
                        <Button variant="outline" size="icon" onClick={() => update(i.carId, i.qty - 1)}>-</Button>
                        <Input value={i.qty} onChange={(e) => {
                          const val = Number(e.target.value);
                          update(i.carId, Number.isFinite(val) ? val : i.qty);
                        }} className="w-16 text-center" />
                        <Button variant="outline" size="icon" onClick={() => update(i.carId, i.qty + 1)}>+</Button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-bold">Total:¥{total.toFixed(2)}</div>
                  <Button onClick={checkout} disabled={loading}>
                    {loading ? (
                      <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Processing...</span>
                    ) : (
                      'Checkout'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

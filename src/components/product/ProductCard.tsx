import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
}: ProductCardProps) {
  // 新增：本地状态用于反馈
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [contact, setContact] = useState("");

  // 新增：下单处理函数，调用 /api/orders
  const handleOrder = async () => {
    if (!contact.trim()) {
      setContact('请填写联系方式');
      return;
    }
    setSubmitting(true);
    setSuccess(false);
    try {
      const orderDate = new Date().toISOString();
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: name,
          num: quantity,
          contact,
          orderdata: JSON.stringify({ orderDate }),
        }),
      });
      setSuccess(true);
      setContact('下单成功！');
      setTimeout(() => {
        setSuccess(false);
        setContact("");
      }, 2000);
    } catch (e) {
      // 可选：处理错误
    }
    setSubmitting(false);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
          }
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";
          }}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-green-600">
            ¥{price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ¥{originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-2">
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="请输入联系方式（手机号/微信/邮箱）"
            value={contact}
            onChange={e => setContact(e.target.value)}
            disabled={submitting}
            style={success || contact === '请填写联系方式' ? { color: contact === '请填写联系方式' ? 'red' : 'green', fontWeight: 'bold' } : {}}
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2 items-center">
          <Button asChild className="flex-1">
            <Link to={`/products/${id}`}>查看详情</Link>
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center select-none">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleOrder}
            disabled={submitting}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        {/* 下单成功提示区域已由输入框高亮和内容提示替代，无需再渲染此区域 */}
      </CardFooter>
    </Card>
  );
}

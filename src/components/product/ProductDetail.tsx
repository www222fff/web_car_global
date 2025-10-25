import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react";
import { useState } from "react";

interface ProductDetailProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  image?: string | null;
  isActive?: number;
}

export function ProductDetail({
  id,
  name,
  description,
  price,
  images = [],
  image,
  isActive = 1,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contact, setContact] = useState("");

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOrder = async () => {
    if (!contact.trim()) {
      setContact('Please enter contact info');
      return;
    }
    setSubmitting(true);
    setSuccess(false);
    try {
      const orderDate = new Date().toISOString();
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: name,
          num: quantity,
          contact,
          orderdata: JSON.stringify({ orderDate }),
        }),
      });
      setSuccess(true);
      setContact('Order placed!');
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
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg relative">
            {isActive === 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                <span className="text-white text-lg font-bold">Sold</span>
              </div>
            )}
            <img
              src={images[selectedImageIndex] || image || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"}
              alt={name}
              className="w-full object-cover"
            />
          </div>
          <div className="flex space-x-2">
            {[...(images ?? []), image].filter(Boolean).map((img, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-md border-2 cursor-pointer ${
                  selectedImageIndex === index
                    ? "border-green-600"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={img as string}
                  alt={`${name} - view ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-green-600">
              ¥{price.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || isActive === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={isActive === 0}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Enter contact (phone/WeChat/email)"
                value={contact}
                onChange={e => setContact(e.target.value)}
                disabled={submitting || isActive === 0}
                style={success || contact === 'Please enter contact info' ? { color: contact === 'Please enter contact info' ? 'red' : 'green', fontWeight: 'bold' } : {}}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2" size="lg" onClick={handleOrder} disabled={submitting || isActive === 0}>
                <ShoppingCart className="h-4 w-4" />
                {isActive === 0 ? 'Sold' : 'Order Now'}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11" disabled={isActive === 0}>
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11" disabled={isActive === 0}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* 可扩展更多产品信息 */}
        </div>
      </div>
    </div>
  );
}

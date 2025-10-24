import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface CarDetailProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  image?: string;
  year?: number;
  mileage?: number;
  isActive?: number;
}

export function CarDetail({ id, name, description, price, images, image, year, mileage, isActive = 1 }: CarDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user } = useAuth();
  const { add, reload } = useCart();
  const { toast } = useToast();

  const gallery = images && images.length > 0 ? images : (image ? [image] : []);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = async () => {
    if (!user || isActive === 0) return;
    await add(id, quantity);
    await reload();
    toast({ title: "已加入购物车" });
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            {gallery[0] ? (
              <div className="relative">
                {isActive === 0 && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                    <span className="text-white text-lg font-bold">已售罄</span>
                  </div>
                )}
                <img src={gallery[selectedImageIndex]} alt={name} className="w-full object-cover" />
              </div>
            ) : (
              <div className="aspect-video w-full rounded bg-muted" />
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex space-x-2">
              {gallery.map((img, index) => (
                <div key={index} className={`overflow-hidden rounded-md border-2 cursor-pointer ${selectedImageIndex === index ? 'border-green-600' : 'border-transparent'}`} onClick={() => setSelectedImageIndex(index)}>
                  <img src={img} alt={`${name}-${index}`} className="h-20 w-20 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-green-600">¥{price.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">数量</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2" size="lg" onClick={handleAdd} disabled={!user || isActive === 0}>
                <ShoppingCart className="h-4 w-4" />
                {isActive === 0 ? '已售罄' : '加入购物车'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string | null;
  isActive?: number;
}

export function ProductCard(props: ProductCardProps & { onDelete?: (id: string) => void }) {
  const { id, name, description, price, originalPrice, image, isActive = 1, onDelete } = props;
  const [submitting, setSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user, isAdmin } = useAuth();
  const { add } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    add(id, quantity);
    setSubmitting(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    if (onDelete) {
      onDelete(id);
    }
  };

    const isSold = isActive === 0;

    return (
      <Card className="overflow-hidden transition-all hover:shadow-md relative opacity-100">
      <div className="aspect-square overflow-hidden">
        {isActive === 0 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <span className="text-white text-lg font-bold">已售出</span>
          </div>
        )}
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
            onClick={handleAddToCart}
            disabled={submitting || isActive === 0}
            title="加入购物车"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

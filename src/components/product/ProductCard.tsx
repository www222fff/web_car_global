import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  images?: string[];
  category?: string | null;
  isActive?: number;
}

export function ProductCard(props: ProductCardProps & { onDelete?: (id: string) => void }) {
  const { id, name, description, price, image, images, category, isActive = 1 } = props;
  const isSold = isActive === 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md relative opacity-100">
      <div className="aspect-square overflow-hidden">
        {isSold && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <span className="text-white text-lg font-bold">Sold out</span>
          </div>
        )}
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
            No image
          </div>
        )}
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
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2 items-center">
          <Button asChild className="flex-1">
            <Link to={`/products/${id}`}>View details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

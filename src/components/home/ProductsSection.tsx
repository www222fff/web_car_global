import { Button } from "@/components/ui/button";
import { ProductCard } from "../product/ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, CarDTO } from "@/lib/api";

export function ProductsSection() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  useEffect(() => {
    api.getCars().then((list) => setCars(list.slice(0, 4))).catch(() => setCars([]));
  }, []);
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">精选车源</h2>
            <p className="text-muted-foreground">严选优质二手车，价格透明，车况可靠</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">查看全部车辆</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <ProductCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </section>
  );
}

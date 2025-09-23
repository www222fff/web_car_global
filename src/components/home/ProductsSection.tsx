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
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Featured Cars</h2>
          <p className="text-muted-foreground">Curated quality used cars with transparent pricing and reliable condition</p>
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

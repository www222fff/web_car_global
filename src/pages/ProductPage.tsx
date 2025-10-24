import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductsSection } from "@/components/home/ProductsSection";
import { CarDetail } from "@/components/product/CarDetail";
import { useEffect, useState } from "react";
import { api, CarDTO } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!id) return;
    api.getCar(id).then(setCar).catch(() => setCar(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 text-center">Loading...</div>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">Sorry, the product you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  const toggleActive = async () => {
    if (!user || !isAdmin) return;
    if (car.isActive) {
      await api.deleteCar(user.id, car.id);
      window.location.href = "/products";
    }
  };

  return (
    <Layout>
      {isAdmin && (
        <div className="container mt-6 flex justify-end">
          <Button variant={car.isActive ? "destructive" : "default"} onClick={toggleActive}>
            {car.isActive ? "Remove Listing" : "Activate Listing"}
          </Button>
        </div>
      )}
      <CarDetail id={car.id} name={car.name} description={car.description} price={car.price} images={car.images} image={car.image || undefined} year={car.year || undefined} mileage={car.mileage || undefined} isActive={car.isActive} />
      <div className="container my-16">
        <ProductsSection />
      </div>
    </Layout>
  );
}

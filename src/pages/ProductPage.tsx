import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductsSection } from "@/components/home/ProductsSection";
import { getCarById } from "@/lib/storage";
import { CarDetail } from "@/components/product/CarDetail";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const car = id ? getCarById(id) : null;

  if (!car) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">车辆未找到</h1>
          <p className="mt-4">抱歉，您查找的车辆不存在。</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CarDetail id={car.id} name={car.name} description={car.description} price={car.price} images={car.images} image={car.image} year={car.year} mileage={car.mileage} />
      <div className="container my-16">
        <h2 className="mb-8 text-2xl font-bold">您可能也喜欢</h2>
        <ProductsSection />
      </div>
    </Layout>
  );
}

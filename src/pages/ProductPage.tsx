import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ProductDetail } from "@/components/product/ProductDetail";
import { useEffect, useState } from "react";
import { api, ProductDTO } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!id) return;
    api.getProduct(id).then(setProduct).catch(() => setProduct(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 text-center">Loading...</div>
      </Layout>
    );
  }

  if (!product) {
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
    if (product.isActive) {
      await api.deleteProduct(user.id, product.id);
      window.location.href = "/products";
    }
  };

  return (
    <Layout>
      {isAdmin && (
        <div className="container mt-6 flex justify-end">
          <Button variant={product.isActive ? "destructive" : "default"} onClick={toggleActive}>
            {product.isActive ? "Remove Listing" : "Activate Listing"}
          </Button>
        </div>
      )}
  <ProductDetail id={product.id} name={product.name} description={product.description} price={product.price} images={product.images} image={product.image || undefined} isActive={product.isActive} />
      <div className="container my-16">
        <ProductsSection />
      </div>
    </Layout>
  );
}

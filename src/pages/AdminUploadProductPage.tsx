import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/lib/api";

export default function AdminUploadProductPage() {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Bras");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="text-center text-muted-foreground">Access denied. Admins only.</div>
        </div>
      </Layout>
    );
  }

  const onImageChange = (file: File | null) => {
    if (!file) { setImageData(""); return; }
    const reader = new FileReader();
    reader.onload = () => setImageData(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) throw new Error("Not signed in");
      if (!name || !price || !imageData) throw new Error("Please provide name, price and image");
      const product = await api.createProduct(user.id, {
        name,
        description,
        price: Number(price),
        image: imageData,
        category,
        images: [imageData],
      });
      navigate(`/products/${product.id}`);
    } catch (err: any) {
      setError(err.message || "Submit failed");
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Add Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <Input placeholder="Product title, e.g. Wireless lightweight bra" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="Price (¥)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bras">Bras</SelectItem>
                      <SelectItem value="Underwear">Underwear</SelectItem>
                      <SelectItem value="Loungewear">Loungewear</SelectItem>
                      <SelectItem value="Sports bra">Sports bra</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div>
                  <input type="file" accept="image/*" onChange={(e) => onImageChange(e.target.files?.[0] || null)} />
                  {imageData && (
                    <img className="mt-2 h-40 w-auto rounded border object-cover" src={imageData} alt="Preview" />
                  )}
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <Button type="submit" className="w-full">Publish</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api, ProductDTO } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const { user, isAdmin } = useAuth();
  useEffect(() => { api.getProducts().then(setProducts).catch(() => setProducts([])); }, []);
  const maxPrice = useMemo(() => (products.length ? Math.max(...products.map((c) => c.price)) : 100000), [products]);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = [
    "all",
    ...Array.from(new Set(products.map((product) => product.category).filter(Boolean))) as string[],
  ];

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">All Lingerie</h1>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-medium">Search Products</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search…"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Category</h3>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Price Range</h3>
              <Slider
                defaultValue={[0, maxPrice]}
                max={Math.max(maxPrice, 1000)}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span>¥{priceRange[0]}</span>
                <span>¥{priceRange[1]}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setPriceRange([0, maxPrice]);
              }}
            >
              Reset filters
            </Button>
          </div>

          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more products.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

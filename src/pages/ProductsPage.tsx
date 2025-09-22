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
import { api, CarDTO } from "@/lib/api";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cars, setCars] = useState<CarDTO[]>([]);
  useEffect(() => { api.getCars().then(setCars).catch(() => setCars([])); }, []);
  const maxPrice = useMemo(() => (cars.length ? Math.max(...cars.map((c) => c.price)) : 100000), [cars]);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);

  const filteredProducts = cars.filter((product) => {
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
    ...Array.from(new Set(cars.map((product) => product.category).filter(Boolean))) as string[],
  ];

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">全部车辆</h1>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-medium">搜索车辆</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-medium">车型分类</h3>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "全部分类" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-4 font-medium">价格范围</h3>
              <Slider
                defaultValue={[0, maxPrice]}
                max={Math.max(maxPrice, 10000)}
                step={1000}
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
              重置筛选
            </Button>
          </div>

          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} image={product.image || undefined} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">未找到产品</h3>
                <p className="text-muted-foreground">
                  尝试调整您的筛选条件以查看更多产品。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

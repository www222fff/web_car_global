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
import { useState } from "react";

// Sample products data
const allProducts = [
  {
    id: "1",
    name: "大麦青汁基础版",
    description: "纯天然大麦草精华，每日健康饮品",
    price: 99,
    originalPrice: 129,
    image: "/images/product1.jpg",
    category: "基础系列",
  },
  {
    id: "2",
    name: "大麦青汁高级版",
    description: "添加多种水果精华，口感更佳",
    price: 129,
    originalPrice: 159,
    image: "/images/product2.jpg",
    category: "高级系列",
  },
  {
    id: "3",
    name: "大麦青汁家庭装",
    description: "30袋大容量，全家共享健康",
    price: 239,
    originalPrice: 299,
    image: "/images/product3.jpg",
    category: "家庭系列",
  },
  {
    id: "4",
    name: "大麦青汁礼盒装",
    description: "精美包装，送礼佳选",
    price: 299,
    originalPrice: 359,
    image: "/images/product4.jpg",
    category: "礼品系列",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);

  // Filter products based on search, category, and price range
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Get unique categories
  const categories = [
    "all",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">全部产品</h1>

        <div className="grid gap-8 md:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-medium">搜索产品</h3>
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
              <h3 className="mb-4 font-medium">产品分类</h3>
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
                defaultValue={[0, 500]}
                max={500}
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
                setPriceRange([0, 500]);
              }}
            >
              重置筛选
            </Button>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
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

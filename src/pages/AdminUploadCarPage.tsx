import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
aimport { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/lib/api";

export default function AdminUploadCarPage() {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("文胸");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="text-center text-muted-foreground">无权访问，仅管理员可发布商品</div>
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
      if (!user) throw new Error("未登录");
      if (!name || !price || !imageData) throw new Error("请完善名称/价格/图片");
      const car = await api.createCar(user.id, {
        name,
        description,
        price: Number(price),
        image: imageData,
        category,
        images: [imageData],
      });
      navigate(`/products/${car.id}`);
    } catch (err: any) {
      setError(err.message || "提交失败");
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>发布商品</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <Input placeholder="商品标题，如：轻薄无钢圈文胸" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="价格 (¥)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="文胸">文胸</SelectItem>
                      <SelectItem value="内裤">内裤</SelectItem>
                      <SelectItem value="家居服">家居服</SelectItem>
                      <SelectItem value="运动内衣">运动内衣</SelectItem>
                      <SelectItem value="配件">配件</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea placeholder="商品描述" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div>
                  <input type="file" accept="image/*" onChange={(e) => onImageChange(e.target.files?.[0] || null)} />
                  {imageData && (
                    <img className="mt-2 h-40 w-auto rounded border object-cover" src={imageData} alt="预览" />
                  )}
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <Button type="submit" className="w-full">发布</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
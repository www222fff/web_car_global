import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductsSection } from "@/components/home/ProductsSection";

// Sample products data - in a real application, this would come from an API
const products = {
  "1": {
    id: "1",
    name: "大麦青汁���础版",
    description:
      "纯天然大麦草精华，每日健康饮品，富含多种维生素和矿物质，帮助改善体质。",
    price: 99,
    originalPrice: 129,
    images: [
      "/images/product1.jpg",
    ],
    details:
      "大麦青汁基础版是从优质大麦草中提取的天然饮品，富含叶绿素、膳食纤维、维生素和矿物质。每一份都经过严格的品质控制，确保您获得最佳的营养价值。适合日常饮用，帮助提高身体免疫力，增强活力。",
    ingredients:
      "大麦草粉末（有机）、小麦草粉末、螺旋藻、水果复合物（苹果、香蕉、橙子）、天然甜味剂（甜叶菊）。不含人工色素、防腐剂和添加糖。",
    instructions:
      "每日1-2次，每次1袋（3克）。将粉末倒入200-300毫升清水中，充分搅拌后饮用。建议在早晨空腹或餐前30分钟饮用，以获得最佳吸收效果。",
  },
  "2": {
    id: "2",
    name: "大麦青汁高级版",
    description: "添加多种水果精华，口感更佳，营养更全面，适合挑剔的味蕾。",
    price: 129,
    originalPrice: 159,
    images: [
      "/images/product2.jpg",   
    ],
    details:
      "大麦青汁高级版在基础版的配方上增加了多种水果精华，不仅提高了口感，还增加了更多的维生素和抗氧化物质。特别添加的苹果和蜂蜜成分，使得口感更加顺滑，适合对味道有较高要求的消费者。",
    ingredients:
      "大麦草粉末（有机）、小麦草粉末、螺旋藻、水果复合物（苹果、蓝莓、香蕉、草莓）、蜂蜜粉、天然甜味剂（甜叶菊）。不含人工色素、防腐剂和添加糖。",
    instructions:
      "每日1-2次，每次1袋（3克）。将粉末倒入200-300毫升清水中，充分搅拌后饮用。也可以与果汁或酸奶混合，创造出个性化的健康饮品。建议在早晨空腹或餐前30分钟饮用。",
  },
  "3": {
    id: "3",
    name: "大麦青��家庭装",
    description: "30袋大容量，全家共享健康，经济实惠的家庭选择。",
    price: 239,
    originalPrice: 299,
    images: [
      "/images/product3.jpg",
    ],
    details:
      "大麦青汁家庭装提供30袋装的大容量包装，基于我们经典的配方，适合全家人日常饮用。这款经济实惠的包装让您可以与家人一起分享健康生活方式，共同享受大麦青汁带来的健康益处。",
    ingredients:
      "大麦草粉末（有机）、小麦草粉末、螺旋藻、水果复合物（苹果、香蕉、橙子）、天然甜味剂（甜叶菊）。不含人工色素、防腐剂和添加糖。",
    instructions:
      "每人每日1-2次，每次1袋（3克）。将粉末倒入200-300毫升清水中，充分搅拌后饮用。建议在早晨空腹或餐前30分钟饮用，以获得最佳吸收效果。适合所有家庭成员饮用，包括老人和青少年。",
  },
  "4": {
    id: "4",
    name: "大麦青汁礼盒装",
    description: "精美包装，送礼佳选，展现您对亲友健康的关心。",
    price: 299,
    originalPrice: 359,
    images: [
      "/images/product4.jpg",
    ],
    details:
      "大麦青汁礼盒装采用高档包装设计，内含20袋我们的高级版大麦青汁和一个精美的专用搅拌杯。这款礼盒是送给亲友、商业伙伴或重要客户的理想健康礼品，展现您对他们健康的关心和重视。",
    ingredients:
      "大麦草粉末（有机）、小麦草粉末、螺旋藻、水果复合物（苹果、蓝莓、香蕉、草莓）、蜂蜜粉、天然甜味剂（甜叶菊）。不含人工色素、防腐剂和添加糖。",
    instructions:
      "每日1-2次，每次1袋（3克）。使用随附的专用搅拌杯，将粉末倒入200-300毫升清水中，充分摇晃后饮用。也可以与果汁或酸奶混合。建议在早晨空腹或餐前30分钟饮用，以获得最佳吸收效果。",
  },
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? products[id as keyof typeof products] : null;

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">产品未找到</h1>
          <p className="mt-4">抱歉，您查找的产品不存在。</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductDetail {...product} />
      <div className="container my-16">
        <h2 className="mb-8 text-2xl font-bold">您可能也喜欢</h2>
        <ProductsSection />
      </div>
    </Layout>
  );
}

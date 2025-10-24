import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Shirt, Ruler, Recycle } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-600" />,
    title: "品质保障",
    description: "精选柔软亲肤面料与可靠工艺，贴身更安心。",
  },
  {
    icon: <Shirt className="h-10 w-10 text-blue-600" />,
    title: "舒适版型",
    description: "多种款式覆盖日常/运动/家居，兼顾支撑与舒适。",
  },
  {
    icon: <Ruler className="h-10 w-10 text-amber-600" />,
    title: "尺码贴心",
    description: "提供详细尺码建议与穿着指南，轻松找到合适大小。",
  },
  {
    icon: <Recycle className="h-10 w-10 text-slate-600" />,
    title: "无忧售后",
    description: "支持便捷退换与客服咨询，购物更省心。",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            我们的承诺
          </h2>
          <p className="text-muted-foreground">
            舒适、合身、好看且耐穿——让每一次贴身穿着都愉悦
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2">{benefit.icon}</div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Battery, Droplets, Leaf } from "lucide-react";

const benefits = [
  {
    icon: <Heart className="h-10 w-10 text-red-500" />,
    title: "促进心血管健康",
    description: "富含抗氧化物质，帮助降低血压和胆固醇，保护心血管系统。",
  },
  {
    icon: <Battery className="h-10 w-10 text-yellow-500" />,
    title: "增强能量",
    description: "提供多种维生素和矿物质，帮助提高身体能量水平，消除疲劳感。",
  },
  {
    icon: <Droplets className="h-10 w-10 text-blue-500" />,
    title: "促进排毒",
    description: "含有叶绿素和多种酶，帮助清理体内毒素，促进身体排毒。",
  },
  {
    icon: <Leaf className="h-10 w-10 text-green-500" />,
    title: "提高免疫力",
    description: "富含维生素和抗氧化剂，帮助增强免疫系统，抵抗疾病。",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            大麦青汁的健康功效
          </h2>
          <p className="text-muted-foreground">
            源自自然的多种营养成分，为您的健康保驾护航
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

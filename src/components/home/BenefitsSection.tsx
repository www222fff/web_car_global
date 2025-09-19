import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, FileCheck, Wrench, Car } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-600" />,
    title: "严选质检",
    description: "多项车况检测与历史核验，排除重大事故、火烧、水泡。",
  },
  {
    icon: <FileCheck className="h-10 w-10 text-blue-600" />,
    title: "透明报告",
    description: "提供详细检测报告与维保记录，车辆信息一目了然。",
  },
  {
    icon: <Wrench className="h-10 w-10 text-amber-600" />,
    title: "售后保障",
    description: "基础质保与7天无忧问题处理，购车更放心。",
  },
  {
    icon: <Car className="h-10 w-10 text-slate-600" />,
    title: "多样车源",
    description: "轿车、SUV、MPV等多种选择，满足通勤与家庭出行需求。",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            我们的服务保障
          </h2>
          <p className="text-muted-foreground">
            车况透明、质检可靠、售后无忧，助您放心选车
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

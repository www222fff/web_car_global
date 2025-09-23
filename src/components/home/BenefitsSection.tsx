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
    title: "Rigorous Inspection",
    description: "Multi-point condition checks and history verification; excludes major accidents, fire, and flood damage.",
  },
  {
    icon: <FileCheck className="h-10 w-10 text-blue-600" />,
    title: "Transparent Reports",
    description: "Detailed inspection reports and maintenance records for full transparency.",
  },
  {
    icon: <Wrench className="h-10 w-10 text-amber-600" />,
    title: "After-sales Support",
    description: "Basic warranty and 7-day hassle-free issue handling for peace of mind.",
  },
  {
    icon: <Car className="h-10 w-10 text-slate-600" />,
    title: "Wide Selection",
    description: "Sedans, SUVs, MPVs and more to meet commuting and family needs.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Our Guarantees
          </h2>
          <p className="text-muted-foreground">
            Transparent condition, reliable inspection, and worry-free after-sales—helping you buy with confidence
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

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
    title: "Quality Assurance",
    description: "Skin-friendly fabrics and reliable craftsmanship for peace of mind.",
  },
  {
    icon: <Shirt className="h-10 w-10 text-blue-600" />,
    title: "Comfort Fit",
    description: "Styles for everyday, sport, and lounge—supportive yet comfortable.",
  },
  {
    icon: <Ruler className="h-10 w-10 text-amber-600" />,
    title: "Size Guidance",
    description: "Detailed fit advice and size guide to find your perfect match.",
  },
  {
    icon: <Recycle className="h-10 w-10 text-slate-600" />,
    title: "Hassle-free Support",
    description: "Easy returns and friendly customer service for stress-free shopping.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Our Promise
          </h2>
          <p className="text-muted-foreground">
            Comfort, fit, style, and durability—making everyday wear feel great
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

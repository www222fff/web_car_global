import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <ProductsSection />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
}

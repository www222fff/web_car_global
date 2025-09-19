import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="rounded-2xl bg-green-600 px-6 py-12 text-center sm:px-12 md:py-24">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            开始您的健康之旅
          </h2>
          <p className="mb-8 text-lg text-green-100 md:text-xl">
            立即尝试大麦青汁，感受自然能量带来的健康改变
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50"
              asChild
            >
              <Link to="/products">立即购买</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

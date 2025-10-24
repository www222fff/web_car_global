import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
      <div className="container relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <div className="space-y-6 text-center max-w-3xl">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                ��身之选，绽放自信<span className="text-green-600">舒适每一天</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                精选高品质内衣与家居服，兼顾舒适与美感，支持在线选购与购物车管理。
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row justify-center">
              <Button size="lg" asChild>
                <Link to="/products">选购内衣</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((id) => (
                  <div
                    key={id}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-white"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/women/${id + 30}.jpg`}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-medium">1000+</span> 好评推荐
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg flex items-center justify-center bg-black h-[220px] md:h-[350px] lg:h-[350px] w-full max-w-5xl">
            <img
              src="https://images.unsplash.com/photo-1520975954732-35dd22f2ffb5?q=80&w=1600&auto=format&fit=crop"
              className="h-full w-full object-cover"
              alt="Lingerie collection banner"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

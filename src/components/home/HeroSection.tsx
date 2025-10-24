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
                Comfort made effortless, <span className="text-green-600">confidence every day</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Curated lingerie and loungewear that balance comfort and style. Browse online and manage your cart with ease.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row justify-center">
              <Button size="lg" asChild>
                <Link to="/products">Shop lingerie</Link>
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
                <span className="font-medium">1000+</span> positive reviews
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg flex items-center justify-center bg-black h-[220px] md:h-[350px] lg:h-[350px] w-full max-w-5xl">
            <img
              src="/images/group.jpg"
              className="h-full w-full object-cover"
              alt="Lingerie collection banner"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

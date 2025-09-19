import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
      <div className="container relative z-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                放心选车，<span className="text-green-600">轻松成交</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                精选优质二手车源，透明车况，支持在线咨询与购物车管理。
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/products">查看车辆</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">登录</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((id) => (
                  <div
                    key={id}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-white"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/men/${id + 30}.jpg`}
                      alt="用户头像"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-medium">1000+</span> 用户好评
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg flex items-center justify-center bg-black h-[220px] md:h-[350px] lg:h-[350px]">
            <video
              src="/images/group.jpg"
              className="h-full w-full object-cover"
              poster="https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=800&fit=crop"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

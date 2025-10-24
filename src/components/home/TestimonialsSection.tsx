import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    quote: "面料很柔软，透气也不错，长时间穿着依然舒适。",
    author: "张女士",
    role: "设计师",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote: "尺码建议很准确，运动系列支撑到位，体验很好。",
    author: "王女士",
    role: "健身爱好者",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    quote: "款式好看，做工细致，售后服务也很及时。",
    author: "李小姐",
    role: "新手妈妈",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            用户评价
          </h2>
          <p className="text-muted-foreground">听听她们怎么说</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="pb-2 flex items-center">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

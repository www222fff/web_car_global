import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Sample testimonials data
const testimonials = [
	{
		quote: "车辆检测报告很详细，销售服务专业，提车流程高效。",
		author: "张女士",
		role: "上班族",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		quote: "价格透明，没有隐形费用，购车体验非常顺畅。",
		author: "王先生",
		role: "工程师",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		quote: "车况与描述一致，售后响应及时，值得推荐。",
		author: "李女士",
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
					<p className="text-muted-foreground">听听我们的客户怎么说</p>
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

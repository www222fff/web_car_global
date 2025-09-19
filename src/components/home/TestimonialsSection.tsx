import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Sample testimonials data
const testimonials = [
	{
		quote: "大麦青汁已经成为我每日生活的一部分，精力明显提升，很推荐！",
		author: "张女士",
		role: "上班族",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		quote: "喝了半年的大麦青汁，身体各项指标都有明显改善，非常满意这个产品。",
		author: "王先生",
		role: "健身教练",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		quote: "口感比想象中好很多，孩子们也愿意喝，全家人的健康守护者。",
		author: "李女士",
		role: "家庭主妇",
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

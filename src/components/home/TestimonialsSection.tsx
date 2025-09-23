import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Sample testimonials data
const testimonials = [
	{
		quote: "The vehicle inspection report was thorough, the service professional, and the pickup process efficient.",
		author: "Ms. Zhang",
		role: "Office Worker",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		quote: "Transparent pricing with no hidden fees; the buying experience was very smooth.",
		author: "Mr. Wang",
		role: "Engineer",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		quote: "The car matched the description, after-sales support was prompt—highly recommended.",
		author: "Ms. Li",
		role: "New Mom",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
	},
];

export function TestimonialsSection() {
	return (
		<section className="py-16 md:py-24 bg-green-50">
			<div className="container">
				<div className="mb-12 text-center">
					<h2 className="mb-2 text-3xl font-bold tracking-tight">
						Customer Reviews
					</h2>
					<p className="text-muted-foreground">Hear what our customers say</p>
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

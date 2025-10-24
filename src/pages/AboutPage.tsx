import { Layout } from "@/components/layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-green-50 py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              About Us
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              We focus on lingerie and loungewear that blend comfort and aesthetics, delivering a truly effortless daily wearing experience.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                <div className="mt-4 space-y-4">
                  <p>
                    Founded in 2018, we believe lingerie is more than a necessity—it’s a way to express and care for yourself. From fabrics and fit to craftsmanship, we iterate relentlessly to make everyday wear more comfortable.
                  </p>
                  <p>
                    Listening closely to feedback, we’ve built a complete range covering everyday, sport, and lounge scenarios to meet diverse comfort needs.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                <div className="mt-4 space-y-4">
                  <p>Help more people find truly well-fitting, comfortable lingerie—crafted with attention to every detail.</p>
                  <p>Stay transparent and sincere, from material selection to after-sales, building long-term trust with our customers.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1547764696-3b05cda36c5b?q=80&w=1600&auto=format&fit=crop"
              alt="Our team"
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Comfort, fit, and responsibility—creating well-made pieces that last
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Quality First</h3>
              <p>Skin-friendly materials and solid craftsmanship—built to last.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Transparency</h3>
              <p>Clear fabric and care details to help you choose wisely.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Constant Innovation</h3>
              <p>We keep refining fit and details so comfort and style go hand-in-hand.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Customer First</h3>
              <p>Friendly support and easy after‑sales, built on long-term trust.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Environmental Care</h3>
              <p>Prioritizing durable, friendlier materials to reduce waste.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Giving Back</h3>
              <p>We care about women’s health and confidence, and support related causes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Team</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            Pattern makers, fabric engineers, supply chain and support—together safeguarding your comfort
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { id: 1, name: "Ms. Liu", role: "Founder & Creative Director", image: "https://randomuser.me/api/portraits/women/12.jpg" },
            { id: 2, name: "Ms. Wang", role: "Fabric Engineer", image: "https://randomuser.me/api/portraits/women/22.jpg" },
            { id: 3, name: "Ms. Zhang", role: "Pattern Maker", image: "https://randomuser.me/api/portraits/women/28.jpg" },
            { id: 4, name: "Ms. Chen", role: "Quality Manager", image: "https://randomuser.me/api/portraits/women/56.jpg" },
            { id: 5, name: "Ms. Zhou", role: "Marketing Lead", image: "https://randomuser.me/api/portraits/women/44.jpg" },
            { id: 6, name: "Ms. Yang", role: "Support Lead", image: "https://randomuser.me/api/portraits/women/48.jpg" },
            { id: 7, name: "Ms. Zhao", role: "Supply Chain Manager", image: "https://randomuser.me/api/portraits/women/66.jpg" },
            { id: 8, name: "Ms. Sun", role: "Store Manager", image: "https://randomuser.me/api/portraits/women/75.jpg" },
          ].map((member) => (
            <div key={member.id} className="text-center">
              <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

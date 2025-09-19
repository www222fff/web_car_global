import { Layout } from "@/components/layout/Layout";
import { CtaSection } from "@/components/home/CtaSection";

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-green-50 py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              关于我们
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              我们致力于通过高品质的大麦青汁产品，帮助人们实现更健康、更活力的生活方式
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  我们的故事
                </h2>
                <div className="mt-4 space-y-4">
                  <p>
                    大麦青汁的故事始于2010年，当时我们的创始人张博士在日本考察传统健康食品时，被大麦青汁的神奇功效所吸引。他意识到，在现代快节奏的生活中，人们越来越难以获取全面的营养，而大麦青汁作为一种浓缩的营养饮品，正好可以弥补这一缺口。
                  </p>
                  <p>
                    回国后，张博士组建了一支专业的研发团队，经过三年的研发和实验，终于在2013年推出了第一款适合中国人口味的大麦青汁产品。从那时起，我们一直致力于提高产品质量，扩展产品线，以满足不同消费者的需求。
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  我们的使命
                </h2>
                <div className="mt-4 space-y-4">
                  <p>
                    我们的使命是通过提供高品质的大麦青汁产品，帮助人们实现更健康、更平衡的生活方式。我们相信，健康不仅仅是身体没有疾病，而是身体、心理和社会适应能力的完全良好状态。
                  </p>
                  <p>
                    我们希望通过我们的产品，让每个人都能轻松获取自然、全面的营养，提高生活质量，享受健康带来的活力和幸福。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/images/group.jpg"
              alt="我们的团队"
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              我们的价值观
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              这些核心价值观指导着我们的每一个决策和行动
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">品质第一</h3>
              <p>
                我们坚持使用最优质的���材料，采用先进的生产工艺，确保每一款产品都达到最高标准。我们的生产过程符合严格的质量控制体系，每批产品都经过多重检测，确保安全可靠。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">诚信透明</h3>
              <p>
                我们坚持诚信经营，对消费者负责。我们清晰地标注产品成分和营养价值，不夸大产品功效，让消费者充分了解产品信息，做出明智的选择。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">创新发展</h3>
              <p>
                我们不断投入研发，探索新技术、新配方，提高产品的口感和功效。我们密切关注健康领域的最新研究，将科学成果应用到产品开发中，为消费者提供更好的健康解决方案。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">客户至上</h3>
              <p>
                我们始终将客户的需求和反馈放在首位。我们不断优化产品和服务，���供专业的健康咨询，建立长期的客户关系，帮助客户实现健康目标。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">环境责任</h3>
              <p>
                我们关注产品全生命周期的环境影响。我们选用环保包装材料，优化生产流程，减少资源消耗和废弃物排放，为保护环境贡献自己的力量。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">社会回馈</h3>
              <p>
                我们积极参与社会公益活动，推广健康知识，支持健康教育。我们相信，企业的发展离不开社会的支持，我们有责任回馈社会，创造更大的社会价值。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">我们的团队</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            由营养学专家、食品科学家和健康顾问组成的专业团队
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { id: 1, name: "张博士", role: "创始人兼CEO", image: "/images/member1.jpg" },
            { id: 2, name: "李教授", role: "首席营养学家", image: "/images/member2.jpg" },
            { id: 3, name: "王主任", role: "产品研发总监", image: "/images/member3.jpg" },
            { id: 4, name: "陈经理", role: "质量控制经理", image: "/images/member4.jpg" },
            { id: 5, name: "王女士", role: "市场总监", image: "/images/wang.jpg" },
            { id: 6, name: "杨主管", role: "客户服务主管", image: "/images/member6.jpg" },
            { id: 7, name: "赵经理", role: "供应链经理", image: "/images/member7.jpg" },
            { id: 8, name: "孙顾问", role: "健康顾问", image: "/images/member8.jpg" },
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

      <CtaSection />
    </Layout>
  );
}

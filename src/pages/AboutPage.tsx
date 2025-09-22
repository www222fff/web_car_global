import { Layout } from "@/components/layout/Layout";

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
              我们致力于打造值得信赖的二手车交易平台，以透明车况和专业服务让购车更简单
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
                  我们的���事
                </h2>
                <div className="mt-4 space-y-4">
                  <p>
                    我们的故事始于2015年，几位资深汽车人希望用更透明的方式重塑二手车交易体验。我们深知买车不易，于是从源头把控车源、建立标准化检测，减少信息不对称。
                  </p>
                  <p>
                    经过多年沉淀，我们形成了严谨的车况评估体系与完善的服务流程，让每一位用户都能高效、安心地找到合适的车辆。
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  我们的使命
                </h2>
                <div className="mt-4 space-y-4">
                  <p>
                    我们的使命是让二手车交易更简单可信：车况透明、价格透明、流程高效。
                  </p>
                  <p>
                    无论是通勤代步还是家庭出行，我们希望帮助每位用户以合理的预算买到称心如意的车。
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
                我们关注产品全生命周期的环境影响。我们选���环保包装材料，优化生产流程，减少资源消耗和废弃物排放，为保护环境贡献自己的力量。
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
            由车辆评估师、资深销售顾问与服务工程师组成的专业团队
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
            { id: 8, name: "孙顾问", role: "车辆顾问", image: "/images/member8.jpg" },
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

  {/* <CtaSection /> */}
    </Layout>
  );
}

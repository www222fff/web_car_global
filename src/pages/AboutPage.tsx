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
              我们专注于舒适与美学并重的内衣与家居服，致力于为每一位消费者提供贴身而自在的穿着体验。
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">我们的故事</h2>
                <div className="mt-4 space-y-4">
                  <p>
                    品牌成立于 2018 年，我们相信内衣不仅是必需品，更是表达自我与关爱自我的方式。我们从面料、版型到工艺不断打磨，只为带来更舒适的日常穿着。
                  </p>
                  <p>
                    通过对用户反馈的持续倾听与快速打样，我们形成了覆盖日常、运动与家居的完整产品线，适配不同场景的舒适需求。
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">我们的使命</h2>
                <div className="mt-4 space-y-4">
                  <p>让更多人找到真正合身且舒适的内衣，用心呈现每一处细节。</p>
                  <p>坚持透明与真诚，从原料选择到售后服务，打造值得长期信赖的品牌体验。</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1547764696-3b05cda36c5b?q=80&w=1600&auto=format&fit=crop"
              alt="我们的团队"
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">我们的价值观</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              以舒适、合身与可持续为核心，打造经久耐穿的贴身之选
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">品质第一</h3>
              <p>精选亲肤面料与稳固工艺，每一针一线都经得起考验。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">诚信透明</h3>
              <p>清晰标注面料与护理说明，帮助你做出明智选择。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">持续创新</h3>
              <p>不断优化版型与细节，让舒适与美感同时在线。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">客户至上</h3>
              <p>提供贴心客服与无忧售后，与你保持长期信任关系。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">环保责任</h3>
              <p>优先选择更耐穿与更友好的材料，减少不必要的浪费。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">社会回馈</h3>
              <p>关注女性健康与身心自信议题，持续参与公益行动。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">我们的团队</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            由版型师、面料工程师、供应链与客服团队共同守护你的舒适体验
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { id: 1, name: "刘女士", role: "创始人兼设计总监", image: "https://randomuser.me/api/portraits/women/12.jpg" },
            { id: 2, name: "王女���", role: "面料工程师", image: "https://randomuser.me/api/portraits/women/22.jpg" },
            { id: 3, name: "张女士", role: "版型师", image: "https://randomuser.me/api/portraits/women/28.jpg" },
            { id: 4, name: "陈女士", role: "质量管理", image: "https://randomuser.me/api/portraits/women/56.jpg" },
            { id: 5, name: "周女士", role: "市场负责人", image: "https://randomuser.me/api/portraits/women/44.jpg" },
            { id: 6, name: "杨女士", role: "客服主管", image: "https://randomuser.me/api/portraits/women/48.jpg" },
            { id: 7, name: "赵女士", role: "供应链经理", image: "https://randomuser.me/api/portraits/women/66.jpg" },
            { id: 8, name: "孙女士", role: "门店经理", image: "https://randomuser.me/api/portraits/women/75.jpg" },
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

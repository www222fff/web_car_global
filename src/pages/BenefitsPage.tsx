import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Battery,
  Droplets,
  Leaf,
  Brain,
  ShieldCheck,
  Activity,
  Eye,
} from "lucide-react";

const healthBenefits = [
  {
    icon: <Heart className="h-10 w-10 text-red-500" />,
    title: "促进心血管健康",
    description: "富含抗氧化物质，帮助降低血压和胆固醇，保护心血管系统。",
    details:
      "大麦青汁中的叶绿素、维生素K和多种抗氧化剂能帮助维护血管健康，降低心脏病风险。研究表明，长期饮用大麦青汁可有效降低血压和胆固醇水平，改善血液循环，促进心脏健康。",
  },
  {
    icon: <Battery className="h-10 w-10 text-yellow-500" />,
    title: "增强能量",
    description: "提供多种维生素和矿物质，帮助提高身体能量水平，消除疲劳感。",
    details:
      "大麦青汁富含B族维生素、铁和镁等多种能量代谢所必需的营养素���这些成分可以促进葡萄糖转化为能量的过程，提高身体能量水平，减轻疲劳感，特别适合工作繁忙、精力不足的现代人。",
  },
  {
    icon: <Droplets className="h-10 w-10 text-blue-500" />,
    title: "促进排毒",
    description: "含有叶绿素和多种酶，帮助清理体内毒素，促进身体排毒。",
    details:
      '大麦青汁中的叶绿素被称为"绿色血液"，其分子结构与血红蛋白相似，能帮助携带氧气和排出体内毒素。同时，大麦青汁中的多种酶和膳食纤维能促进肠道蠕动，帮助排出体内废物，净化肠道环境。',
  },
  {
    icon: <Leaf className="h-10 w-10 text-green-500" />,
    title: "提高免疫力",
    description: "富含维生素和抗氧化剂，帮助增强免疫系统，抵抗疾病。",
    details:
      "大麦青汁含有丰富的维生素C、E和多种抗氧化物质，能增强免疫细胞活性，提高机体抵抗力。研究表明，长期饮用大麦青汁的人群感冒等常见疾病的发生率明显降低，恢复速度也更快。",
  },
  {
    icon: <Brain className="h-10 w-10 text-purple-500" />,
    title: "改善脑功能",
    description: "富含对脑健康有益的营养物质，帮助提高认知功能和记忆力。",
    details:
      "大麦青汁中的抗氧化物质和欧米伽-3脂肪酸能保护脑细胞免受自由基损伤，促进神经细胞健康。研究发现，大麦青汁中的多种B族维生素也有助于改善认知功能、提高注意力和记忆力，对预防认知衰退有积极作用。",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-indigo-500" />,
    title: "抗炎作用",
    description: "具有天然抗炎特性，有助于减轻体内炎症反应。",
    details:
      "大麦青汁中含有多种具有抗炎特性的植物营养素，如黄酮类化合物和叶绿素。这些成分能抑制炎症介质的产生，缓解体内炎症反应，对关节炎、肠道炎症等慢性炎症性疾病有辅助改善作用。",
  },
  {
    icon: <Activity className="h-10 w-10 text-pink-500" />,
    title: "平衡酸碱度",
    description: "属于碱性食品，有助于平衡体内酸碱度，维持健康状态。",
    details:
      "现代饮食中酸性食物过多会导致体内酸性环境，长期可能影响健康。大麦青汁作为强碱性食品，能中和体内过多的酸性物质，帮助恢复酸碱平衡，减轻疲劳感，提高身体活力和抵抗力。",
  },
  {
    icon: <Eye className="h-10 w-10 text-cyan-500" />,
    title: "保护视力",
    description: "含有叶黄素和玉米黄质，有助于保护眼睛健康，预防视力问题。",
    details:
      "大麦青汁中含有叶黄素和玉米黄质等对眼睛健康至关重要的营养素。这些成分��吸收有害蓝光，保护视网膜免受氧化损伤，减少黄斑变性和白内障等眼部疾病的风险，特别适合长时间使用电子设备的人群。",
  },
];

const faqs = [
  {
    question: "大麦青汁的最佳饮用时间是什么时候？",
    answer:
      "大麦青汁最好在早晨空腹或餐前30分钟饮用，这样可以获得最佳的吸收效果。如果您有胃部不适的情况，可以在餐后饮用。每日建议饮用1-2次。",
  },
  {
    question: "长期饮用大麦青汁会有副作用吗？",
    answer:
      "大麦青汁是纯天然食品，对大多数人来说是安全的，长期饮用通常不会有副作用。但如果您有麦类过敏史，应谨慎使用。另外，如果您正在服用药物，建议在饮用前咨询医生，以避免可能的相互作用。",
  },
  {
    question: "大麦青汁适合哪些人群？",
    answer:
      "大麦青汁适合大多数人群，特别是现代生活压力大、饮食不规律、缺乏蔬果摄入的人群。它也适合需要提高免疫力、改善消化系统、降低胆固醇的人群。孕妇、哺乳期妇女和儿童在使用前应咨询医生。",
  },
  {
    question: "大麦青汁的营养成分主要有哪些？",
    answer:
      "大麦青汁富含多种营养成分，包括叶绿素��膳食纤维、多种维生素（如维生素A、C、E、K和B族维生素）、矿物质（如铁、钙、镁、钾）、抗氧化物质和多种酶。这些成分协同作用，为身体提供全面的营养支持。",
  },
  {
    question: "大麦青汁如何帮助减肥？",
    answer:
      "大麦青汁含有丰富的膳食纤维，可以增加饱腹感，减少进食量。同时，它还能促进肠道蠕动，帮助排出体内废物，改善新陈代谢。此外，大麦青汁中的多种营养成分可以为减肥期间的身体提供必要的营养支持，避免营养不良。",
  },
  {
    question: "大麦青汁与其他青汁产品相比有什么优势？",
    answer:
      "大麦青汁相比其他青汁产品，营养更全面均衡，尤其是叶绿素含量更高。另外，大麦青汁的味道相对更温和，更容易被接受。我们的产品采用低温干燥技术，最大程度保留了大麦草的营养成分，不添加任何人工色素、防腐剂和添加糖。",
  },
];

export default function BenefitsPage() {
  return (
    <Layout>
      <div className="bg-green-50 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              大麦青汁的健康功效
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              了解大麦青汁如何通过其丰富的营养成分为您的健康带来全面的改善和保障
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {healthBenefits.slice(0, 4).map((benefit, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2">{benefit.icon}</div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              健康功效详解
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              深入了解大麦青汁的各项健康功效及其背后的科学原理
            </p>
          </div>

          <div className="space-y-8">
            {healthBenefits.map((benefit, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">{benefit.icon}</div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="mb-4">{benefit.description}</p>
                    <p className="text-muted-foreground">{benefit.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">常见问题</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            关于大麦青汁功效与使用的常见问题解答
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
}

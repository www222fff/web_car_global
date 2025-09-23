import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AtSign, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "请输入有效的电子邮件地址" }),
  phone: z.string().min(11, { message: "请输入有效的电话号码" }),
  subject: z.string().min(5, { message: "主题至少需要5个字符" }),
  message: z.string().min(10, { message: "留言至少需要10个字符" }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "提交成功",
        description: "我们会尽快回复您的留言，感谢您的关注！",
      });
      form.reset();
    }, 1500);
  }

  return (
    <Layout>
      <div className="bg-green-50 py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              如果您有任何问题、建议或合作意向，请随时Contact Us，我们将竭诚为您服务
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-medium">公司地址</h3>
                    <p className="text-sm text-muted-foreground">
                      上海市浦东新区张江高科技园区
                      <br />
                      碧波路999号
                      <br />
                      邮编: 201203
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-medium">联系电话</h3>
                    <p className="text-sm text-muted-foreground">
                      客服热线: 086-15020782726
                      <br />
                      工作时间: 周一至周五 9:00-18:00
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <AtSign className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-medium">电子邮箱</h3>
                    <p className="text-sm text-muted-foreground">
                      客户服务: abc@qq.com
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-bold">给我们留言</h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>姓名</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入您的姓名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>电子邮箱</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="请输入您的电子邮箱"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>电话</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="请输入您的电话号码"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>主题</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入留言主题" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>留言内容</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="请输入您的留言内容"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          请详细描述您的问题或建议，我们会尽快回复您。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "提交中..." : "提交留言"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">我们的位置</h2>
        </div>
        <div className="overflow-hidden rounded-lg border">
          {/* In a real project, this would be a real map component */}
          <div className="aspect-video bg-slate-200 flex items-center justify-center">
            <p className="text-xl text-slate-600">
              地图位置: 上海市浦东新区张江高科技园区
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

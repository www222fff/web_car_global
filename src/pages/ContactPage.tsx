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
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
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

    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "Submitted",
        description: "Thanks for your message. We’ll get back to you soon!",
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
              Have a question, feedback, or partnership idea? Reach out—we’re here to help.
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
                    <h3 className="mb-2 font-medium">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      Zhangjiang Hi-Tech Park, Pudong, Shanghai
                      <br />
                      Bibow Rd 999
                      <br />
                      Postal code: 201203
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      Customer Service: 086-15020782726
                      <br />
                      Hours: Mon–Fri 9:00–18:00
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <AtSign className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Support: abc@qq.com
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Leave us a message</h2>

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
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
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
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
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
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your request"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide as much detail as you can so we can help quickly.
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
                    {isSubmitting ? "Submitting…" : "Send message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Our Location</h2>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-video bg-slate-200 flex items-center justify-center">
            <p className="text-xl text-slate-600">
              Map: Zhangjiang Hi-Tech Park, Pudong, Shanghai
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

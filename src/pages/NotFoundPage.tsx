import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <h2 className="text-3xl font-semibold">页面未找到</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          抱歉，您访问的页面不存在或已被移除。请尝试访问其他页面或返回首页。
        </p>
        <Button asChild>
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </div>
  );
}

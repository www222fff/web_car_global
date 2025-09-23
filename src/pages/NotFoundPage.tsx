import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Sorry, the page you requested doesn't exist or has been removed. Please try another page or go back home.
        </p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}

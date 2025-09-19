import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">大麦青汁</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            首页
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            产品
          </Link>
          <Link
            to="/benefits"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            健康功效
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            关于我们
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            联系我们
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] text-white">
              0
            </span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-50 bg-background transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="container flex flex-col space-y-4 p-4">
          <Link
            to="/"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            首页
          </Link>
          <Link
            to="/products"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            产品
          </Link>
          <Link
            to="/benefits"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            健康功效
          </Link>
          <Link
            to="/about"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            关于我们
          </Link>
          <Link
            to="/contact"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            联系我们
          </Link>
        </nav>
      </div>
    </header>
  );
}

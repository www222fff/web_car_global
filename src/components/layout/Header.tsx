import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">二手车市场</span>
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
            车辆
          </Link>
          {user && (
            <Link
              to="/orders"
              className="text-sm font-medium transition-colors hover:text-green-600"
            >
              我的订单
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/admin/upload"
                className="text-sm font-medium transition-colors hover:text-green-600"
              >
                发布车辆
              </Link>
              <Link
                to="/admin/orders"
                className="text-sm font-medium transition-colors hover:text-green-600"
              >
                订单管理
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>登录</Button>
              <Button onClick={() => navigate('/register')}>注册</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.username}</span>
              <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>退出</Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] text-white">
              {count}
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
            车辆
          </Link>
          {isAdmin && (
            <Link
              to="/admin/upload"
              className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              发布车辆
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600" onClick={() => setIsMenuOpen(false)}>登录</Link>
              <Link to="/register" className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600" onClick={() => setIsMenuOpen(false)}>注册</Link>
            </>
          ) : (
            <button className="flex h-10 items-center border-b text-sm font-medium text-left hover:text-green-600" onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}>退出</button>
          )}
        </nav>
      </div>
    </header>
  );
}

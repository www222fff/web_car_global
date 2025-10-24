import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if (typeof window !== 'undefined') {
    // Control main content transform when mobile menu is open
    // @ts-expect-error global assignment
    window.__setMainTransform = (open: boolean) => {
      const main = document.getElementById('main-content');
      if (main) {
        main.style.transform = open ? 'translateX(75vw)' : '';
      }
    };
  }
  const { user, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">Lingerie Boutique</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium transition-colors hover:text-green-600"
          >
            Lingerie
          </Link>
          {user && !isAdmin && (
            <Link
              to="/orders"
              className="text-sm font-medium transition-colors hover:text-green-600"
            >
              My Orders
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/admin/upload"
                className="text-sm font-medium transition-colors hover:text-green-600"
              >
                Add Product
              </Link>
              <Link
                to="/admin/orders"
                className="text-sm font-medium transition-colors hover:text-green-600"
              >
                Order Management
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>Log in</Button>
              <Button onClick={() => navigate('/register')}>Sign up</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.username}</span>
              <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>Log out</Button>
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
          "md:hidden absolute left-0 top-16 h-[calc(100vh-4rem)] w-3/4 z-50 bg-background transition-transform duration-300 ease-in-out shadow-lg",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ willChange: 'transform' }}
        onTransitionEnd={() => {
          if (typeof window !== 'undefined' && (window as any).__setMainTransform) {
            (window as any).__setMainTransform(isMenuOpen);
          }
        }}
      >
        <nav className="flex flex-col space-y-4 p-4">
          <Link
            to="/"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Lingerie
          </Link>
          {user && (
            <Link
              to="/orders"
              className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              My Orders
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/admin/upload"
                className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Product
              </Link>
              <Link
                to="/admin/orders"
                className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Order Management
              </Link>
            </>
          )}
          {!user ? (
            <>
              <Link to="/login" className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="flex h-10 items-center border-b text-sm font-medium transition-colors hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </>
          ) : (
            <button className="flex h-10 items-center border-b text-sm font-medium text-left hover:text-green-600" onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}>Log out</button>
          )}
        </nav>
      </div>
    </header>
  );
}

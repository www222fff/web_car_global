import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Lingerie Boutique</h3>
            <img
              src="https://images.unsplash.com/photo-1519742908083-976d3e506cd8?auto=format&fit=crop&w=200&q=80"
              alt="Brand logo"
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <p className="text-sm text-muted-foreground">
              Curated lingerie and loungewear with skin-friendly comfort and refined fit.
            </p>
            <div className="flex gap-2 mt-2">
              <a
                href="https://weibo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Weibo"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://wechat.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="WeChat"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Lingerie Boutique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">大麦青汁</h3>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
              alt="品牌logo"
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <p className="text-sm text-muted-foreground">
              源自自然的健康能量，每一天的绿色活力。
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
            <h3 className="text-sm font-semibold">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  产品
                </Link>
              </li>
              <li>
                <Link
                  to="/benefits"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  健康功效
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">关于</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  联系我们
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-green-600"
                >
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">联系我们</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">
                邮箱: 705701550@qq.com
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 大麦青汁. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}

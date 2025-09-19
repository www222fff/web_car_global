import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username.trim(), password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "登录失败");
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>登录</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <Input placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <Input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <Button type="submit" className="w-full">登录</Button>
              </form>
              <div className="mt-4 text-sm text-muted-foreground">
                还没有账号？<Link className="text-green-600" to="/register">去注册</Link>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">提示：默认管理员账号 admin / admin</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

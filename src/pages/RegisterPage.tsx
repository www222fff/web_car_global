import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username.trim(), password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "注册失败");
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>注册</CardTitle>
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
                <Button type="submit" className="w-full">注册</Button>
              </form>
              <div className="mt-4 text-sm text-muted-foreground">
                已有账号？<Link className="text-green-600" to="/login">去登录</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

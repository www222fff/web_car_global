// 临时声明 D1Database 类型（如有 Cloudflare D1 依赖请替换为官方类型）
type D1Database = {
  prepare: (sql: string) => {
    run: (...args: any[]) => Promise<any>;
    all: (...args: any[]) => Promise<any>;
    first: <T=any>() => Promise<T>;
    bind: (...args: any[]) => any;
  };
};
import { ensureSchema, seedIfNeeded, ensureJsonResponse, badRequest } from "./_utils";
import { randomUUID } from "./_utils";

interface Env { DB: D1Database }
interface OnRequestArgs { request: Request; env: Env }
export async function onRequest({ request, env }: OnRequestArgs) {
  await ensureSchema(env);
  await seedIfNeeded(env);
  const url = new URL(request.url);
  const db = env.DB as D1Database;

  if (request.method === 'POST') {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    if (url.pathname.endsWith('/api/users/login') || body.action === 'login') {
      const { username, password } = body;
      if (!username || !password) return badRequest('缺少用户名或密码');
      const row = await db.prepare(`SELECT id, username, role FROM users WHERE username=? AND password=?`).bind(username, password).first();
      if (!row) return badRequest('用户名或密码不正确', 401);
      return ensureJsonResponse(row);
    }
    if (url.pathname.endsWith('/api/users/register') || body.action === 'register') {
      const { username, password } = body;
      if (!username || !password) return badRequest('缺少用户名或密码');
      const exists = await db.prepare(`SELECT 1 FROM users WHERE username=?`).bind(username).first();
      if (exists) return badRequest('用户名已存在');
      const id = randomUUID();
      // default role user
      await db.prepare(`INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, 'user')`).bind(id, username, password).run();
      const row = await db.prepare(`SELECT id, username, role FROM users WHERE id=?`).bind(id).first();
      return ensureJsonResponse(row);
    }
    return badRequest('未知操作', 404);
  }

  if (request.method === 'GET') {
    if (url.pathname.endsWith('/api/users/me')) {
      const userId = request.headers.get('X-User-Id');
      if (!userId) return badRequest('未登录', 401);
      const row = await db.prepare(`SELECT id, username, role FROM users WHERE id=?`).bind(userId).first();
      if (!row) return badRequest('未找到用户', 404);
      return ensureJsonResponse(row);
    }
  }

  return badRequest('不支持的请求方法', 405);
}

  if (request.method === 'DELETE') {
    if (!isAdmin) return badRequest('仅管理员可操作', 403);
    if (!id) return badRequest('缺少车辆ID');
    await db.prepare('DELETE FROM cars WHERE id=?').bind(id).run();
    return ensureJsonResponse({ success: true });
  }
// 临时声明 D1Database 类型（如有 Cloudflare D1 依赖请替换为官方类型）
type D1Database = {
  prepare: (sql: string) => {
    run: (...args: any[]) => Promise<any>;
    all: (...args: any[]) => Promise<any>;
    first: <T=any>() => Promise<T>;
    bind: (...args: any[]) => any;
  };
};
import { ensureSchema, seedIfNeeded, getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";

interface Env { DB: D1Database }
interface OnRequestArgs { request: Request; env: Env }
export async function onRequest({ request, env }: OnRequestArgs) {
  await ensureSchema(env);
  await seedIfNeeded(env);
  const url = new URL(request.url);
  const db = env.DB as D1Database;
  const user = await getUserFromRequest(request, env);
  const isAdmin = !!user && user.role === 'admin';

  const id = url.searchParams.get('id');

  if (request.method === 'GET') {
    if (id) {
      const row = await db.prepare(`SELECT id, name, description, price, image, year, mileage, category, createdBy, images, isActive FROM cars WHERE id=?`).bind(id).first();
      if (!row) return badRequest('车辆未找到', 404);
      const car = { ...row, images: row.images ? JSON.parse(row.images) : [] };
      return ensureJsonResponse(car);
    }
    const includeAll = isAdmin && url.searchParams.get('all') === '1';
    const rs = await db.prepare(`SELECT id, name, description, price, image, year, mileage, category, createdBy, images, isActive FROM cars ${includeAll ? '' : 'WHERE isActive=1'} ORDER BY rowid DESC`).all();
    const cars = (rs.results || []).map((r: any) => ({ ...r, images: r.images ? JSON.parse(r.images) : [] }));
    return ensureJsonResponse(cars);
  }

  if (request.method === 'POST') {
    if (!isAdmin) return badRequest('仅管理员可发布车辆', 403);
    const body = await request.json();
    const { name, description, price, image, year, mileage, category, images } = body || {};
    if (!name || !price) return badRequest('缺少必要字段');
    const id = crypto.randomUUID();
    await db.prepare(`INSERT INTO cars (id, name, description, price, image, year, mileage, category, createdBy, images, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`) 
      .bind(id, name, description || '', Number(price), image || null, year || null, mileage || null, category || null, user!.id, JSON.stringify(images || (image ? [image] : [])))
      .run();
    const row = await db.prepare(`SELECT id, name, description, price, image, year, mileage, category, createdBy, images, isActive FROM cars WHERE id=?`).bind(id).first();
    const car = { ...row, images: row.images ? JSON.parse(row.images) : [] };
    return ensureJsonResponse(car, 201);
  }

  if (request.method === 'PATCH') {
    if (!isAdmin) return badRequest('仅管理员可操作', 403);
    if (!id) return badRequest('缺少车辆ID');
    const body = await request.json();
    const { isActive, name, description, price, image, year, mileage, category, images } = body || {};
    // Build dynamic update
    const sets: string[] = [];
    const vals: any[] = [];
    if (typeof isActive === 'number') { sets.push('isActive=?'); vals.push(isActive); }
    if (name !== undefined) { sets.push('name=?'); vals.push(name); }
    if (description !== undefined) { sets.push('description=?'); vals.push(description); }
    if (price !== undefined) { sets.push('price=?'); vals.push(Number(price)); }
    if (image !== undefined) { sets.push('image=?'); vals.push(image || null); }
    if (year !== undefined) { sets.push('year=?'); vals.push(year || null); }
    if (mileage !== undefined) { sets.push('mileage=?'); vals.push(mileage || null); }
    if (category !== undefined) { sets.push('category=?'); vals.push(category || null); }
    if (images !== undefined) { sets.push('images=?'); vals.push(JSON.stringify(images)); }
    if (!sets.length) return badRequest('无更新内容');
    vals.push(id);
    await db.prepare(`UPDATE cars SET ${sets.join(', ')} WHERE id=?`).bind(...vals).run();
    const row = await db.prepare(`SELECT id, name, description, price, image, year, mileage, category, createdBy, images, isActive FROM cars WHERE id=?`).bind(id).first();
    const car = { ...row, images: row.images ? JSON.parse(row.images) : [] };
    return ensureJsonResponse(car);
  }

  return badRequest('不支持的请求方法', 405);
}

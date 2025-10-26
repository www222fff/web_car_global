import { getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";
type D1Database = {
  prepare: (sql: string) => {
    run: (...args: any[]) => Promise<any>;
    all: (...args: any[]) => Promise<any>;
    first: <T=any>() => Promise<T>;
    bind: (...args: any[]) => any;
  };
};
interface Env { DB: D1Database }
interface OnRequestArgs { request: Request; env: Env }

export async function onRequest({ request, env }: OnRequestArgs) {
  const url = new URL(request.url);
  const db = env.DB as D1Database;
  const user = await getUserFromRequest(request, env);
  const isAdmin = !!user && user.role === 'admin';

  const id = url.searchParams.get('id');

  if (request.method === 'DELETE') {
    if (!isAdmin) return badRequest('Admins only', 403);
    if (!id) return badRequest('Missing product ID');
    await db.prepare('DELETE FROM products WHERE id=?').bind(id).run();
    return ensureJsonResponse({ success: true });
  }

  if (request.method === 'GET') {
    if (id) {
      const row = await db.prepare(`SELECT id, name, description, price, image, category, createdBy, images, isActive FROM products WHERE id=?`).bind(id).first();
      if (!row) return badRequest('Product not found', 404);
      const product = { ...row, images: row.images ? JSON.parse(row.images) : [] };
      return ensureJsonResponse(product);
    }
    const rs = await db.prepare(`SELECT id, name, description, price, image, category, createdBy, images, isActive FROM products ORDER BY rowid DESC`).all();
    const products = (rs.results || []).map((r: any) => ({ ...r, images: r.images ? JSON.parse(r.images) : [] }));
    return ensureJsonResponse(products);
  }

  if (request.method === 'POST') {
    if (!isAdmin) return badRequest('Admins only', 403);
    const body = await request.json();
    const { name, description, price, image, category, images } = body || {};
    if (!name || !price) return badRequest('Missing required fields');
    const id = crypto.randomUUID();
    await db.prepare(`INSERT INTO products (id, name, description, price, image, category, createdBy, images, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`) 
      .bind(id, name, description || '', Number(price), image || null, category || null, user!.id, JSON.stringify(images || (image ? [image] : [])))
      .run();
    const row = await db.prepare(`SELECT id, name, description, price, image, category, createdBy, images, isActive FROM products WHERE id=?`).bind(id).first();
    const product = { ...row, images: row.images ? JSON.parse(row.images) : [] };
    return ensureJsonResponse(product, 201);
  }

  if (request.method === 'PATCH') {
    if (!isAdmin) return badRequest('Admins only', 403);
    if (!id) return badRequest('Missing product ID');
    const body = await request.json();
    const { isActive, name, description, price, image, category, images } = body || {};
    // Build dynamic update
    const sets: string[] = [];
    const vals: any[] = [];
    if (typeof isActive === 'number') { sets.push('isActive=?'); vals.push(isActive); }
    if (name !== undefined) { sets.push('name=?'); vals.push(name); }
    if (description !== undefined) { sets.push('description=?'); vals.push(description); }
    if (price !== undefined) { sets.push('price=?'); vals.push(Number(price)); }
    if (image !== undefined) { sets.push('image=?'); vals.push(image || null); }
    if (category !== undefined) { sets.push('category=?'); vals.push(category || null); }
    if (images !== undefined) { sets.push('images=?'); vals.push(JSON.stringify(images)); }
    if (!sets.length) return badRequest('No updates');
    vals.push(id);
    await db.prepare(`UPDATE products SET ${sets.join(', ')} WHERE id=?`).bind(...vals).run();
    const row = await db.prepare(`SELECT id, name, description, price, image, category, createdBy, images, isActive FROM products WHERE id=?`).bind(id).first();
    const product = { ...row, images: row.images ? JSON.parse(row.images) : [] };
    return ensureJsonResponse(product);
  }

  return badRequest('Method not allowed', 405);
}

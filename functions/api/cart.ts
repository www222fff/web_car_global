import { getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";

export async function onRequest({ request, env }) {
  const db = env.DB as D1Database;
  const user = await getUserFromRequest(request, env);
  if (!user) return badRequest('Unauthorized', 401);

  if (request.method === 'GET') {
  const rs = await db.prepare(`SELECT c.productId, c.qty, products.name as productName, products.price as price, products.image as productImage FROM cart c LEFT JOIN products ON products.id=c.productId WHERE c.userId=?`).bind(user.id).all();
  const items = (rs.results || []).map((r: any) => ({ productId: r.productId, qty: r.qty, product: { id: r.productId, name: r.productName, price: r.price, image: r.productImage } }));
    const count = items.reduce((s: number, i: any) => s + i.qty, 0);
    return ensureJsonResponse({ items, count });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const { productId, qty, mode } = body || {};
    if (!productId || !qty) return badRequest('Missing productId or qty');
    if (mode === 'set') {
      await db.prepare(`INSERT INTO cart (userId, productId, qty) VALUES (?, ?, ?) ON CONFLICT(userId, productId) DO UPDATE SET qty=excluded.qty`).bind(user.id, productId, Number(qty)).run();
    } else {
      const existing = await db.prepare(`SELECT qty FROM cart WHERE userId=? AND productId=?`).bind(user.id, productId).first<{qty:number}>();
      const newQty = (existing?.qty || 0) + Number(qty);
      await db.prepare(`INSERT INTO cart (userId, productId, qty) VALUES (?, ?, ?) ON CONFLICT(userId, productId) DO UPDATE SET qty=excluded.qty`).bind(user.id, productId, newQty).run();
    }
    return ensureJsonResponse({ success: true });
  }

  if (request.method === 'PUT') {
    const body = await request.json();
  const { productId, qty } = body || {};
  if (!productId || qty === undefined) return badRequest('Missing productId or qty');
  await db.prepare(`INSERT INTO cart (userId, productId, qty) VALUES (?, ?, ?) ON CONFLICT(userId, productId) DO UPDATE SET qty=excluded.qty`).bind(user.id, productId, Number(qty)).run();
    return ensureJsonResponse({ success: true });
  }

  if (request.method === 'DELETE') {
    const body = await request.json();
  const { productId } = body || {};
  if (!productId) return badRequest('Missing productId');
  await db.prepare(`DELETE FROM cart WHERE userId=? AND productId=?`).bind(user.id, productId).run();
    return ensureJsonResponse({ success: true });
  }

  return badRequest('Method not allowed', 405);
}

import { ensureSchema, seedIfNeeded, getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";

export async function onRequest({ request, env }) {
  await ensureSchema(env);
  await seedIfNeeded(env);
  const db = env.DB as D1Database;
  const user = await getUserFromRequest(request, env);
  if (!user) return badRequest('Unauthorized', 401);

  if (request.method === 'GET') {
    const rs = await db.prepare(`SELECT c.carId, c.qty, cars.name as carName, cars.price as carPrice, cars.image as carImage FROM cart c LEFT JOIN cars ON cars.id=c.carId WHERE c.userId=?`).bind(user.id).all();
    const items = (rs.results || []).map((r: any) => ({ carId: r.carId, qty: r.qty, car: { id: r.carId, name: r.carName, price: r.carPrice, image: r.carImage } }));
    const count = items.reduce((s: number, i: any) => s + i.qty, 0);
    return ensureJsonResponse({ items, count });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const { carId, qty, mode } = body || {};
    if (!carId || !qty) return badRequest('Missing carId or qty');
    if (mode === 'set') {
      await db.prepare(`INSERT INTO cart (userId, carId, qty) VALUES (?, ?, ?) ON CONFLICT(userId, carId) DO UPDATE SET qty=excluded.qty`).bind(user.id, carId, Number(qty)).run();
    } else {
      const existing = await db.prepare(`SELECT qty FROM cart WHERE userId=? AND carId=?`).bind(user.id, carId).first<{qty:number}>();
      const newQty = (existing?.qty || 0) + Number(qty);
      await db.prepare(`INSERT INTO cart (userId, carId, qty) VALUES (?, ?, ?) ON CONFLICT(userId, carId) DO UPDATE SET qty=excluded.qty`).bind(user.id, carId, newQty).run();
    }
    return ensureJsonResponse({ success: true });
  }

  if (request.method === 'PUT') {
    const body = await request.json();
    const { carId, qty } = body || {};
    if (!carId || qty === undefined) return badRequest('Missing carId or qty');
    await db.prepare(`INSERT INTO cart (userId, carId, qty) VALUES (?, ?, ?) ON CONFLICT(userId, carId) DO UPDATE SET qty=excluded.qty`).bind(user.id, carId, Number(qty)).run();
    return ensureJsonResponse({ success: true });
  }

  if (request.method === 'DELETE') {
    const body = await request.json();
    const { carId } = body || {};
    if (!carId) return badRequest('Missing carId');
    await db.prepare(`DELETE FROM cart WHERE userId=? AND carId=?`).bind(user.id, carId).run();
    return ensureJsonResponse({ success: true });
  }

  return badRequest('Method not allowed', 405);
}

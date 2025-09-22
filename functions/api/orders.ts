
import { ensureSchema, seedIfNeeded, getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";

export async function onRequest({ request, env }) {
  await ensureSchema(env);
  await seedIfNeeded(env);
  const db = env.DB as D1Database;
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const user = await getUserFromRequest(request, env);
    if (!user) return badRequest('未登录', 401);
    const isAdmin = user.role === 'admin';
    const all = isAdmin && url.searchParams.get('all') === '1';
    const stmt = all
      ? `SELECT id, userId, items, totalPrice, status, createdAt FROM orders ORDER BY createdAt DESC`
      : `SELECT id, userId, items, totalPrice, status, createdAt FROM orders WHERE userId=? ORDER BY createdAt DESC`;
    const rs = all ? await db.prepare(stmt).all() : await db.prepare(stmt).bind(user.id).all();
    const orders = (rs.results || []).map((r: any) => ({ ...r, items: JSON.parse(r.items) }));
    return ensureJsonResponse(orders);
  }

  if (request.method === 'POST') {
    const user = await getUserFromRequest(request, env);
    if (!user) return badRequest('未登录', 401);
    const body = await request.json().catch(() => ({}));
    let items: any[] | null = Array.isArray(body?.items) ? body.items : null;
    if (!items) {
      // build from cart
      const rs = await db.prepare(`SELECT c.carId, c.qty, cars.price FROM cart c LEFT JOIN cars ON cars.id=c.carId WHERE c.userId=?`).bind(user.id).all();
      items = (rs.results || []).map((r: any) => ({ carId: r.carId, qty: r.qty, price: r.price }));
    }
    if (!items || items.length === 0) return badRequest('订单为空');
    // compute total from DB prices
    let total = 0;
    const validated: {carId:string; qty:number; price:number}[] = [];
    for (const it of items) {
      const row = await db.prepare(`SELECT price, isActive FROM cars WHERE id=?`).bind(it.carId).first<{price:number,isActive:number}>();
      if (!row) return badRequest(`车辆不存在: ${it.carId}`);
      if (row.isActive === 0) return badRequest(`车辆已售出: ${it.carId}`);
      const price = Number(row.price);
      const qty = Number(it.qty || 1);
      validated.push({ carId: it.carId, qty, price });
      total += price * qty;
    }
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    await db.prepare(`INSERT INTO orders (id, userId, items, totalPrice, status, createdAt) VALUES (?, ?, ?, ?, 'pending', ?)`)
      .bind(id, user.id, JSON.stringify(validated), total, createdAt).run();
    // 标记车辆为已售出
    for (const it of validated) {
      await db.prepare(`UPDATE cars SET isActive=0 WHERE id=?`).bind(it.carId).run();
    }
    // Clear cart after order
    await db.prepare(`DELETE FROM cart WHERE userId=?`).bind(user.id).run();
    return ensureJsonResponse({ id, totalPrice: total, status: 'pending', createdAt, items: validated }, 201);
  }

  // 订单取消（与删除订单行为一致，直接删除订单并恢复车辆可售）
  if (request.method === 'PATCH') {
    const user = await getUserFromRequest(request, env);
    if (!user) return badRequest('未登录', 401);
    const body = await request.json().catch(() => ({}));
    const { id, status } = body || {};
    if (!id || status !== 'cancelled') return badRequest('参数错误');
    // 只允许本人或管理员取消
    const order = await db.prepare('SELECT * FROM orders WHERE id=?').bind(id).first();
    if (!order) return badRequest('订单不存在');
    if (order.userId !== user.id && user.role !== 'admin') return badRequest('无权限');
    // 恢复车辆可售
    const items = JSON.parse(order.items || '[]');
    for (const it of items) {
      await db.prepare('UPDATE cars SET isActive=1 WHERE id=?').bind(it.carId).run();
    }
    await db.prepare('DELETE FROM orders WHERE id=?').bind(id).run();
    return ensureJsonResponse({ success: true });
  }

  // 管理员删除订单
  if (request.method === 'DELETE') {
    const user = await getUserFromRequest(request, env);
    if (!user || user.role !== 'admin') return badRequest('无权限', 403);
    const body = await request.json().catch(() => ({}));
    const { id } = body || {};
    if (!id) return badRequest('缺少订单ID');
    const order = await db.prepare('SELECT * FROM orders WHERE id=?').bind(id).first();
    if (!order) return badRequest('订单不存在');
    // 删除订单时无论状态都恢复车辆可售
    const items = JSON.parse(order.items || '[]');
    for (const it of items) {
      await db.prepare('UPDATE cars SET isActive=1 WHERE id=?').bind(it.carId).run();
    }
    await db.prepare('DELETE FROM orders WHERE id=?').bind(id).run();
    return ensureJsonResponse({ success: true });
  }

  return badRequest('不支持的请求方法', 405);
}

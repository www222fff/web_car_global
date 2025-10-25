import { getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";

export async function onRequest({ request, env }) {
  const db = env.DB;
  const user = await getUserFromRequest(request, env);
  if (!user) return badRequest('Unauthorized', 401);
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const user = await getUserFromRequest(request, env);
    if (!user) return badRequest('Unauthorized', 401);
    const isAdmin = user.role === 'admin';
    const all = isAdmin && url.searchParams.get('all') === '1';
    const stmt = all
      ? `SELECT id, userId, items, totalPrice, status, createdAt, address, contact FROM orders ORDER BY createdAt DESC`
      : `SELECT id, userId, items, totalPrice, status, createdAt, address, contact FROM orders WHERE userId=? ORDER BY createdAt DESC`;
    const rs = all ? await db.prepare(stmt).all() : await db.prepare(stmt).bind(user.id).all();
    const orders = (rs.results || []).map((r: any) => ({ ...r, items: JSON.parse(r.items) }));
    return ensureJsonResponse(orders);
  }

  if (request.method === 'POST') {
    const user = await getUserFromRequest(request, env);
    if (!user) return badRequest('Unauthorized', 401);
    const body = await request.json().catch(() => ({}));
    let items: any[] | null = Array.isArray(body?.items) ? body.items : null;
    let address = body.address, contact = body.contact;
    if (!items) {
      // build from cart
  const rs = await db.prepare(`SELECT c.productId, c.qty, products.price FROM cart c LEFT JOIN products ON products.id=c.productId WHERE c.userId=?`).bind(user.id).all();
  items = (rs.results || []).map((r: any) => ({ productId: r.productId, qty: r.qty, price: r.price }));
    }
    if (!items || items.length === 0) return badRequest('Empty order');
    // fetch address/contact if not provided
    if (!address || !contact) {
      const addrRow = await db.prepare('SELECT address, contact FROM addresses WHERE userId=?').bind(user.id).first();
      address = addrRow?.address || '';
      contact = addrRow?.contact || '';
    }
    if (!address || !contact) return badRequest('Missing address or contact');
    // compute total from DB prices
    let total = 0;
    const validated: {productId:string; qty:number; price:number}[] = [];
    for (const it of items) {
      const row = await db.prepare(`SELECT price, isActive FROM products WHERE id=?`).bind(it.productId).first<{price:number,isActive:number}>();
      if (!row) return badRequest(`Product not found: ${it.productId}`);
      if (row.isActive === 0) return badRequest(`Product already sold: ${it.productId}`);
      const price = Number(row.price);
      const qty = Number(it.qty || 1);
      validated.push({ productId: it.productId, qty, price });
      total += price * qty;
    }
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    await db.prepare(`INSERT INTO orders (id, userId, items, totalPrice, status, createdAt, address, contact) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)`)
      .bind(id, user.id, JSON.stringify(validated), total, createdAt, address, contact).run();
    // 标记车辆为已售出
    for (const it of validated) {
      await db.prepare(`UPDATE products SET isActive=0 WHERE id=?`).bind(it.productId).run();
    }
    // Clear cart after order
    await db.prepare(`DELETE FROM cart WHERE userId=?`).bind(user.id).run();
    return ensureJsonResponse({ id, totalPrice: total, status: 'pending', createdAt, items: validated, address, contact }, 201);
  }

  // 订单取消（与删除订单行为一致，直接删除订单并恢复车辆可售）
  if (request.method === 'PATCH') {
    const user = await getUserFromRequest(request, env);
    if (!user) return badRequest('Unauthorized', 401);
    const body = await request.json().catch(() => ({}));
    const { id, status } = body || {};
    if (!id || status !== 'cancelled') return badRequest('Invalid parameters');
    // 只允许本人或管理员取消
    const order = await db.prepare('SELECT * FROM orders WHERE id=?').bind(id).first();
    if (!order) return badRequest('Order not found');
    if (order.userId !== user.id && user.role !== 'admin') return badRequest('Forbidden');
    // 恢复车辆可售
    const items = JSON.parse(order.items || '[]');
    for (const it of items) {
      await db.prepare('UPDATE products SET isActive=1 WHERE id=?').bind(it.productId).run();
    }
    await db.prepare('DELETE FROM orders WHERE id=?').bind(id).run();
    return ensureJsonResponse({ success: true });
  }

  // 管理员删除订单
  if (request.method === 'DELETE') {
    const user = await getUserFromRequest(request, env);
    if (!user || user.role !== 'admin') return badRequest('Forbidden', 403);
    const body = await request.json().catch(() => ({}));
    const { id } = body || {};
    if (!id) return badRequest('Missing order ID');
    const order = await db.prepare('SELECT * FROM orders WHERE id=?').bind(id).first();
    if (!order) return badRequest('Order not found');
    // 删除订单时无论状态都恢复车辆可售
    const items = JSON.parse(order.items || '[]');
    for (const it of items) {
      await db.prepare('UPDATE products SET isActive=1 WHERE id=?').bind(it.productId).run();
    }
    await db.prepare('DELETE FROM orders WHERE id=?').bind(id).run();
    return ensureJsonResponse({ success: true });
  }

  return badRequest('Method not allowed', 405);
}

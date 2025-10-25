import { getUserFromRequest, ensureJsonResponse, badRequest } from "./_utils";

export async function onRequest({ request, env }) {
  const db = env.DB;
  const user = await getUserFromRequest(request, env);
  if (!user) return badRequest('Unauthorized', 401);

  if (request.method === 'GET') {
    const row = await db.prepare('SELECT address, contact FROM addresses WHERE userId=?').bind(user.id).first();
    return ensureJsonResponse(row || {});
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const { address, contact } = body || {};
    if (!address || !contact) return badRequest('Missing address or contact');
    await db.prepare('INSERT INTO addresses (userId, address, contact) VALUES (?, ?, ?) ON CONFLICT(userId) DO UPDATE SET address=excluded.address, contact=excluded.contact')
      .bind(user.id, address, contact).run();
    return ensureJsonResponse({ success: true });
  }

  return badRequest('Method not allowed', 405);
}

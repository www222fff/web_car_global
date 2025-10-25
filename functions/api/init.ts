import { ensureSchema, seedIfNeeded } from './_utils';

export async function onRequest(context: any) {
  try {
    await ensureSchema(context.env);
    await seedIfNeeded(context.env);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
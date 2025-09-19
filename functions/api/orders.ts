export async function onRequestPost({ request, env }) {
  const { product, num, contact, orderdata } = await request.json();
  await env.damaiqingzhiorder
    .prepare(
      `INSERT INTO orders (product, num, contact, orderdata) VALUES (?, ?, ?, ?)`
    )
    .bind(product, num, contact, orderdata)
    .run();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

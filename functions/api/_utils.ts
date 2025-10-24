// 临时声明 D1Database 类型（如有 Cloudflare D1 依赖请替换为官方类型）
type D1Database = {
  prepare: (sql: string) => {
    run: (...args: any[]) => Promise<any>;
    all: (...args: any[]) => Promise<any>;
    first: <T=any>() => Promise<T>;
    bind: (...args: any[]) => any;
  };
};

// 兼容 Cloudflare Workers/浏览器/Node 的 randomUUID polyfill
export function randomUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: 生成简单的 UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type Role = "admin" | "user";

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}

export interface CarItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  year?: number | null;
  mileage?: number | null;
  category?: string | null;
  createdBy: string;
  images?: string[] | null;
  isActive?: number; // 1 active, 0 inactive
}

export async function ensureSchema(env: any) {
  const db = env.DB as D1Database;
  // Users
  await db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );`).run();

  // Cars (复用表结构作为商品表)
  await db.prepare(`CREATE TABLE IF NOT EXISTS cars (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    year INTEGER,
    mileage INTEGER,
    category TEXT,
    createdBy TEXT NOT NULL,
    images TEXT,
    isActive INTEGER NOT NULL DEFAULT 1
  );`).run();

  // Ensure isActive column exists (for existing DBs)
  try {
    const info = await db.prepare(`PRAGMA table_info(cars)`).all();
    const hasIsActive = Array.isArray(info.results) && info.results.some((r: any) => r.name === "isActive");
    if (!hasIsActive) {
      await db.prepare(`ALTER TABLE cars ADD COLUMN isActive INTEGER NOT NULL DEFAULT 1;`).run();
    }
  } catch {}

  // Cart
  await db.prepare(`CREATE TABLE IF NOT EXISTS cart (
    userId TEXT NOT NULL,
    carId TEXT NOT NULL,
    qty INTEGER NOT NULL,
    PRIMARY KEY (userId, carId)
  );`).run();

  // Orders
  await db.prepare(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    items TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt INTEGER NOT NULL,
    address TEXT,
    contact TEXT
  );`).run();

  // Addresses
  await db.prepare(`CREATE TABLE IF NOT EXISTS addresses (
    userId TEXT PRIMARY KEY,
    address TEXT NOT NULL,
    contact TEXT NOT NULL
  );`).run();
}

export async function seedIfNeeded(env: any) {
  const db = env.DB as D1Database;
  // Seed admin user
  const admin = await db.prepare(`SELECT id FROM users WHERE role = 'admin' LIMIT 1;`).first<{id:string}>();
  if (!admin) {
    const id = randomUUID();
    await db.prepare(`INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?);`).bind(id, 'admin', 'admin', 'admin').run();
  }

  // Seed sample products (lingerie)
  const countRow = await db.prepare(`SELECT COUNT(*) as c FROM cars;`).first<{c:number}>();
  const count = countRow ? Number((countRow as any).c) : 0;
  if (count === 0) {
    const adminIdRow = await db.prepare(`SELECT id FROM users WHERE role='admin' LIMIT 1;`).first<{id:string}>();
    const createdBy = adminIdRow?.id || randomUUID();
    const samples: Omit<CarItem, 'id'>[] = [
      {
        name: '轻薄无钢圈文胸',
        description: '亲肤透气，轻盈承托，适合日常长时间穿着',
        price: 199,
        image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop',
        category: '文胸',
        createdBy,
        images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
      {
        name: '莫代尔高腰内裤 3 条装',
        description: '柔软亲肤，弹力贴合，日常舒适之选',
        price: 129,
        image: 'https://images.unsplash.com/photo-1603252109744-5f17d0c0d5f1?q=80&w=1200&auto=format&fit=crop',
        category: '内裤',
        createdBy,
        images: ['https://images.unsplash.com/photo-1603252109744-5f17d0c0d5f1?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
      {
        name: '棉质家居睡衣套装',
        description: '宽松版型，透气面料，放松每一刻',
        price: 239,
        image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=1200&auto=format&fit=crop',
        category: '家居服',
        createdBy,
        images: ['https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
    ];
    for (const s of samples) {
      const id = randomUUID();
      await db.prepare(`INSERT INTO cars (id, name, description, price, image, year, mileage, category, createdBy, images, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`)
        .bind(id, s.name, s.description, s.price, s.image ?? null, null, null, s.category ?? null, s.createdBy, JSON.stringify(s.images ?? []), s.isActive ?? 1)
        .run();
    }
  }
}

export async function getUserFromRequest(request: Request, env: any) {
  const userId = request.headers.get('X-User-Id');
  if (!userId) return null;
  const row = await (env.DB as D1Database).prepare(`SELECT id, username, role FROM users WHERE id = ?`).bind(userId).first();
  return row || null;
}

export function ensureJsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export function badRequest(message: string, status = 400) {
  return ensureJsonResponse({ error: message }, status);
}

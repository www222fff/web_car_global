import { randomUUID } from "crypto";

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

  // Cars
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
    createdAt INTEGER NOT NULL
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

  // Seed sample cars
  const countRow = await db.prepare(`SELECT COUNT(*) as c FROM cars;`).first<{c:number}>();
  const count = countRow ? Number((countRow as any).c) : 0;
  if (count === 0) {
    const adminIdRow = await db.prepare(`SELECT id FROM users WHERE role='admin' LIMIT 1;`).first<{id:string}>();
    const createdBy = adminIdRow?.id || randomUUID();
    const samples: Omit<CarItem, 'id'>[] = [
      {
        name: '大众 高尔夫 2018款 1.4T',
        description: '一手车，保养良好，内饰干净，城市通勤佳选',
        price: 56000,
        year: 2018,
        mileage: 68000,
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c1a87b6cf?q=80&w=1200&auto=format&fit=crop',
        category: '轿车',
        createdBy,
        images: ['https://images.unsplash.com/photo-1605559424843-9e4c1a87b6cf?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
      {
        name: '本田 CR-V 2017款 2.0L 两驱',
        description: '空间大，油耗低，家用首选，支持二手检测报告',
        price: 88000,
        year: 2017,
        mileage: 92000,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
        category: 'SUV',
        createdBy,
        images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
      {
        name: '丰田 卡罗拉 2019款 1.2T',
        description: '市区代步，车况优秀，无重大事故',
        price: 78000,
        year: 2019,
        mileage: 54000,
        image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop',
        category: '轿车',
        createdBy,
        images: ['https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
      {
        name: '别克 GL8 2016款 2.4L',
        description: '商务接待，空间宽敞，7座舒适',
        price: 95000,
        year: 2016,
        mileage: 130000,
        image: 'https://images.unsplash.com/photo-1518306727298-4c27b3cd1c09?q=80&w=1200&auto=format&fit=crop',
        category: 'MPV',
        createdBy,
        images: ['https://images.unsplash.com/photo-1518306727298-4c27b3cd1c09?q=80&w=1200&auto=format&fit=crop'],
        isActive: 1,
      },
    ];
    for (const s of samples) {
      const id = randomUUID();
      await db.prepare(`INSERT INTO cars (id, name, description, price, image, year, mileage, category, createdBy, images, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`)
        .bind(id, s.name, s.description, s.price, s.image ?? null, s.year ?? null, s.mileage ?? null, s.category ?? null, s.createdBy, JSON.stringify(s.images ?? []), s.isActive ?? 1)
        .run();
    }
  }
}

export async function getUserFromRequest(request: Request, env: any) {
  const userId = request.headers.get('X-User-Id');
  if (!userId) return null;
  const row = await (env.DB as D1Database).prepare(`SELECT id, username, role FROM users WHERE id = ?`).bind(userId).first<User>();
  return row || null;
}

export function ensureJsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export function badRequest(message: string, status = 400) {
  return ensureJsonResponse({ error: message }, status);
}

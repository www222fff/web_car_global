export type Role = "admin" | "user";
export interface User {
  id: string;
  username: string;
  password: string; // plain for demo only
  role: Role;
}

export interface CarItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // data URL or path
  year?: number | null;
  mileage?: number | null; // km
  category?: string | null; // 轿车/SUV/MPV/其他
  images?: string[]; // optional gallery
  createdBy: string; // user id
}

export interface CartItem { carId: string; qty: number }

export interface Env { DB: D1Database }

function uid() {
  // Cloudflare Workers have crypto.randomUUID(), use a fallback.
  try { return crypto.randomUUID(); } catch (e) { return (Date.now().toString(36) + Math.random().toString(36).slice(2,8)).toLowerCase(); }
}

// Users
export async function loadUsers(env: Env): Promise<User[]> {
  const res = await env.DB.prepare('SELECT * FROM users').all<User>();
  return (res.results || []) as User[];
}

export async function getUserById(env: Env, id: string): Promise<User | null> {
  const res = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).all<User>();
  return res.results?.[0] ?? null;
}

export async function getUserByUsername(env: Env, username: string): Promise<User | null> {
  const res = await env.DB.prepare('SELECT * FROM users WHERE username = ?').bind(username).all<User>();
  return res.results?.[0] ?? null;
}

export async function saveUser(env: Env, user: User) {
  await env.DB.prepare('INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)')
    .bind(user.id, user.username, user.password, user.role)
    .run();
}

export async function updateUserPassword(env: Env, id: string, newPassword: string) {
  await env.DB.prepare('UPDATE users SET password = ? WHERE id = ?').bind(newPassword, id).run();
}

export async function authenticate(env: Env, username: string, password: string): Promise<User | null> {
  const res = await env.DB.prepare('SELECT * FROM users WHERE username = ? AND password = ?').bind(username, password).all<User>();
  return res.results?.[0] ?? null;
}

export async function seedAdminIfNeeded(env: Env): Promise<User> {
  const res = await env.DB.prepare("SELECT * FROM users WHERE role = 'admin' LIMIT 1").all<User>();
  if (res.results && res.results.length > 0) return res.results[0];
  const admin: User = { id: uid(), username: 'admin', password: 'admin', role: 'admin' };
  await saveUser(env, admin);
  return admin;
}

export async function registerUser(env: Env, username: string, password: string): Promise<User> {
  const exists = await getUserByUsername(env, username);
  if (exists) throw new Error('用户名已存在');
  const users = await loadUsers(env);
  const role: Role = users.length === 0 ? 'admin' : 'user';
  const user: User = { id: uid(), username, password, role };
  await saveUser(env, user);
  return user;
}

// Cars
export async function loadCars(env: Env): Promise<CarItem[]> {
  const res = await env.DB.prepare('SELECT * FROM cars ORDER BY rowid DESC').all<any>();
  return (res.results || []).map((c: any) => ({
    ...c,
    price: Number(c.price),
    year: c.year == null ? null : Number(c.year),
    mileage: c.mileage == null ? null : Number(c.mileage),
    images: c.images ? JSON.parse(c.images) : [],
  })) as CarItem[];
}

export async function getCarById(env: Env, id: string): Promise<CarItem | null> {
  const res = await env.DB.prepare('SELECT * FROM cars WHERE id = ?').bind(id).all<any>();
  const c = res.results?.[0];
  if (!c) return null;
  return { ...c, price: Number(c.price), images: c.images ? JSON.parse(c.images) : [] } as CarItem;
}

export async function addCar(env: Env, input: Omit<CarItem, 'id'>): Promise<CarItem> {
  const id = uid();
  await env.DB.prepare(
    `INSERT INTO cars (id, name, description, price, image, year, mileage, category, createdBy, images)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    input.name,
    input.description,
    input.price,
    input.image,
    input.year ?? null,
    input.mileage ?? null,
    input.category ?? null,
    input.createdBy,
    JSON.stringify(input.images ?? [])
  ).run();
  return { ...input, id } as CarItem;
}

export async function seedSampleCarsIfNeeded(env: Env, adminId: string) {
  const cars = await loadCars(env);
  if (cars.length > 0) return;
  const samples: Omit<CarItem, 'id'>[] = [
    {
      name: '大众 高尔夫 2018款 1.4T',
      description: '一手车，保养良好，内饰干净，城市通勤佳选',
      price: 56000,
      year: 2018,
      mileage: 68000,
      image: '/images/product1.jpg',
      category: '轿车',
      createdBy: adminId,
      images: ['/images/product1.jpg']
    },
    {
      name: '本田 CR-V 2017款 2.0L 两驱',
      description: '空间大，油耗低，家用首选，支持二手检测报告',
      price: 88000,
      year: 2017,
      mileage: 92000,
      image: '/images/product2.jpg',
      category: 'SUV',
      createdBy: adminId,
      images: ['/images/product2.jpg']
    },
    {
      name: '丰田 卡罗拉 2019款 1.2T',
      description: '市区代步，车况优秀，无重大事故',
      price: 78000,
      year: 2019,
      mileage: 54000,
      image: '/images/product3.jpg',
      category: '轿车',
      createdBy: adminId,
      images: ['/images/product3.jpg']
    },
    {
      name: '别克 GL8 2016款 2.4L',
      description: '商务接待，空间宽敞，7座舒适',
      price: 95000,
      year: 2016,
      mileage: 130000,
      image: '/images/product4.jpg',
      category: 'MPV',
      createdBy: adminId,
      images: ['/images/product4.jpg']
    }
  ];
  for (const s of samples) {
    await addCar(env, s);
  }
}

// Cart
export async function getCart(env: Env, userId: string): Promise<CartItem[]> {
  const res = await env.DB.prepare('SELECT carId, qty FROM cart WHERE userId = ?').bind(userId).all<CartItem>();
  return (res.results || []) as CartItem[];
}

export async function saveCartItem(env: Env, userId: string, carId: string, qty: number) {
  await env.DB.prepare(
    `INSERT INTO cart (userId, carId, qty) VALUES (?, ?, ?)
      ON CONFLICT(userId, carId) DO UPDATE SET qty = excluded.qty`
  ).bind(userId, carId, qty).run();
}

export async function addToCart(env: Env, userId: string, carId: string, qty = 1) {
  // Increase existing or insert
  await env.DB.prepare(
    `INSERT INTO cart (userId, carId, qty) VALUES (?, ?, ?)
     ON CONFLICT(userId, carId) DO UPDATE SET qty = qty + excluded.qty`
  ).bind(userId, carId, qty).run();
}

export async function updateCartItem(env: Env, userId: string, carId: string, qty: number) {
  if (qty <= 0) {
    await env.DB.prepare('DELETE FROM cart WHERE userId = ? AND carId = ?').bind(userId, carId).run();
  } else {
    await saveCartItem(env, userId, carId, qty);
  }
}

export async function removeFromCart(env: Env, userId: string, carId: string) {
  await env.DB.prepare('DELETE FROM cart WHERE userId = ? AND carId = ?').bind(userId, carId).run();
}

export async function getCartCount(env: Env, userId: string): Promise<number> {
  const res = await env.DB.prepare('SELECT SUM(qty) as total FROM cart WHERE userId = ?').bind(userId).all<any>();
  const total = res.results?.[0]?.total;
  return total == null ? 0 : Number(total);
}

// Bootstrap demo
export async function bootstrapDemo(env: Env) {
  const admin = await seedAdminIfNeeded(env);
  await seedSampleCarsIfNeeded(env, admin.id);
}

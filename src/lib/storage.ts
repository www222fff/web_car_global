export type Role = "admin" | "user";
export interface User {
  id: string;
  username: string;
  password: string; // Plain for demo only
  role: Role;
}

export interface CarItem {
  id: string;
  name: string; // title
  description: string;
  price: number;
  image: string; // data URL or path
  year?: number;
  mileage?: number; // km
  category?: string; // 轿车/SUV/MPV/其他
  images?: string[]; // optional gallery
  createdBy: string; // user id
}

export interface CartItem { carId: string; qty: number }

const KEYS = {
  users: "app_users",
  currentUserId: "app_current_user_id",
  cars: "app_cars",
  cartPrefix: "app_cart_", // + userId
};

function uid() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toLowerCase();
}

// Users
export function loadUsers(): User[] {
  const raw = localStorage.getItem(KEYS.users);
  return raw ? (JSON.parse(raw) as User[]) : [];
}
export function saveUsers(users: User[]) {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}
export function getCurrentUser(): User | null {
  const id = localStorage.getItem(KEYS.currentUserId);
  if (!id) return null;
  return loadUsers().find((u) => u.id === id) || null;
}
export function setCurrentUser(userId: string | null) {
  if (!userId) localStorage.removeItem(KEYS.currentUserId);
  else localStorage.setItem(KEYS.currentUserId, userId);
}
export function seedAdminIfNeeded(): User {
  const users = loadUsers();
  let admin = users.find((u) => u.role === "admin");
  if (!admin) {
    admin = { id: uid(), username: "admin", password: "admin", role: "admin" };
    users.push(admin);
    saveUsers(users);
  }
  return admin;
}
export function registerUser(username: string, password: string): User {
  const users = loadUsers();
  if (users.some((u) => u.username === username)) {
    throw new Error("用户名已存在");
  }
  const role: Role = users.length === 0 ? "admin" : "user"; // first user becomes admin (fallback)
  const user: User = { id: uid(), username, password, role };
  users.push(user);
  saveUsers(users);
  return user;
}
export function authenticate(username: string, password: string): User | null {
  const users = loadUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  return user || null;
}

// Cars
export function loadCars(): CarItem[] {
  const raw = localStorage.getItem(KEYS.cars);
  return raw ? (JSON.parse(raw) as CarItem[]) : [];
}
export function saveCars(cars: CarItem[]) {
  localStorage.setItem(KEYS.cars, JSON.stringify(cars));
}
export function seedSampleCarsIfNeeded(adminId: string) {
  const cars = loadCars();
  if (cars.length > 0) return;
  const samples: CarItem[] = [
    {
      id: uid(),
      name: "大众 高尔夫 2018款 1.4T",
      description: "一手车，保养良好，内饰干净，城市通勤佳选",
      price: 56000,
      year: 2018,
      mileage: 68000,
      image: "/images/product1.jpg",
      category: "轿车",
      createdBy: adminId,
      images: ["/images/product1.jpg"],
    },
    {
      id: uid(),
      name: "本田 CR-V 2017款 2.0L 两驱",
      description: "空间大，油耗低，家用首选，支持二手检测报告",
      price: 88000,
      year: 2017,
      mileage: 92000,
      image: "/images/product2.jpg",
      category: "SUV",
      createdBy: adminId,
      images: ["/images/product2.jpg"],
    },
    {
      id: uid(),
      name: "丰田 卡罗拉 2019款 1.2T",
      description: "市区代步，车况优秀，无重大事故",
      price: 78000,
      year: 2019,
      mileage: 54000,
      image: "/images/product3.jpg",
      category: "轿车",
      createdBy: adminId,
      images: ["/images/product3.jpg"],
    },
    {
      id: uid(),
      name: "别克 GL8 2016款 2.4L",
      description: "商务接待，空间宽敞，7座舒适",
      price: 95000,
      year: 2016,
      mileage: 130000,
      image: "/images/product4.jpg",
      category: "MPV",
      createdBy: adminId,
      images: ["/images/product4.jpg"],
    },
  ];
  saveCars(samples);
}
export function addCar(input: Omit<CarItem, "id">): CarItem {
  const car: CarItem = { ...input, id: uid() };
  const cars = loadCars();
  cars.unshift(car);
  saveCars(cars);
  return car;
}
export function getCarById(id: string): CarItem | null {
  return loadCars().find((c) => c.id === id) || null;
}

// Cart
function cartKey(userId: string) {
  return KEYS.cartPrefix + userId;
}
export function getCart(userId: string): CartItem[] {
  const raw = localStorage.getItem(cartKey(userId));
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
}
export function saveCart(userId: string, items: CartItem[]) {
  localStorage.setItem(cartKey(userId), JSON.stringify(items));
}
export function addToCart(userId: string, carId: string, qty = 1) {
  const items = getCart(userId);
  const it = items.find((i) => i.carId === carId);
  if (it) it.qty += qty; else items.push({ carId, qty });
  saveCart(userId, items);
}
export function updateCartItem(userId: string, carId: string, qty: number) {
  const items = getCart(userId).map((i) => (i.carId === carId ? { ...i, qty } : i)).filter((i) => i.qty > 0);
  saveCart(userId, items);
}
export function removeFromCart(userId: string, carId: string) {
  const items = getCart(userId).filter((i) => i.carId !== carId);
  saveCart(userId, items);
}
export function getCartCount(userId: string): number {
  return getCart(userId).reduce((s, i) => s + i.qty, 0);
}

// Bootstrap demo data once
export function bootstrapDemo() {
  const admin = seedAdminIfNeeded();
  seedSampleCarsIfNeeded(admin.id);
}

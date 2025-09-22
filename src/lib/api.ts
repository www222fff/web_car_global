export interface UserDTO { id: string; username: string; role: 'admin'|'user' }
export interface CarDTO { id: string; name: string; description: string; price: number; image?: string|null; year?: number|null; mileage?: number|null; category?: string|null; createdBy: string; images?: string[]; isActive?: number }
export interface CartItemDTO { carId: string; qty: number; car?: { id: string; name: string; price: number; image?: string|null } }

function withHeaders(userId?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (userId) headers['X-User-Id'] = userId;
  return { headers };
}

export const api = {
  async login(username: string, password: string): Promise<UserDTO> {
    const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', username, password }) });
    if (!res.ok) throw new Error((await res.json()).error || '登录失败');
    return res.json();
  },
  async register(username: string, password: string): Promise<UserDTO> {
    const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'register', username, password }) });
    if (!res.ok) throw new Error((await res.json()).error || '注册失败');
    return res.json();
  },
  async getCars(all = false): Promise<CarDTO[]> {
    const res = await fetch(`/api/cars${all ? '?all=1' : ''}`);
    if (!res.ok) throw new Error('获取车辆失败');
    return res.json();
  },
  async getCar(id: string): Promise<CarDTO> {
    const res = await fetch(`/api/cars?id=${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('车辆未找到');
    return res.json();
  },
  async createCar(userId: string, data: Partial<CarDTO>): Promise<CarDTO> {
    const res = await fetch('/api/cars', { method: 'POST', ...withHeaders(userId), body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error || '发布失败');
    return res.json();
  },
  async updateCar(userId: string, id: string, data: Partial<CarDTO>): Promise<CarDTO> {
    const res = await fetch(`/api/cars?id=${encodeURIComponent(id)}`, { method: 'PATCH', ...withHeaders(userId), body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error || '更新失败');
    return res.json();
  },
  async getCart(userId: string): Promise<{ items: CartItemDTO[]; count: number }> {
    const res = await fetch('/api/cart', { method: 'GET', ...withHeaders(userId) });
    if (!res.ok) throw new Error('获取购物车失败');
    return res.json();
  },
  async addToCart(userId: string, carId: string, qty = 1) {
    const res = await fetch('/api/cart', { method: 'POST', ...withHeaders(userId), body: JSON.stringify({ carId, qty }) });
    if (!res.ok) throw new Error('添加购物车失败');
    return res.json();
  },
  async setCartItem(userId: string, carId: string, qty: number) {
    const res = await fetch('/api/cart', { method: 'PUT', ...withHeaders(userId), body: JSON.stringify({ carId, qty }) });
    if (!res.ok) throw new Error('更新购物车失败');
    return res.json();
  },
  async removeFromCart(userId: string, carId: string) {
    const res = await fetch('/api/cart', { method: 'DELETE', ...withHeaders(userId), body: JSON.stringify({ carId }) });
    if (!res.ok) throw new Error('移除购物车失败');
    return res.json();
  },
  async listOrders(userId: string, all = false) {
    const res = await fetch(`/api/orders${all ? '?all=1' : ''}`, { method: 'GET', ...withHeaders(userId) });
    if (!res.ok) throw new Error('获取订单失败');
    return res.json();
  },
  async createOrder(userId: string, items?: { carId: string; qty: number }[]) {
    const res = await fetch('/api/orders', { method: 'POST', ...withHeaders(userId), body: JSON.stringify(items ? { items } : {}) });
    if (!res.ok) throw new Error('下单失败');
    return res.json();
  },
};

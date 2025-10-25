export interface UserDTO { id: string; username: string; role: 'admin'|'user' }
export interface ProductDTO { id: string; name: string; description: string; price: number; image?: string|null; category?: string|null; createdBy: string; images?: string[]; isActive?: number }
export interface CartItemDTO { productId: string; qty: number; product?: { id: string; name: string; price: number; image?: string|null } }

function withHeaders(userId?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (userId) headers['X-User-Id'] = userId;
  return { headers };
}

export const api = {
  async deleteProduct(userId: string, id: string) {
    const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: 'DELETE', ...withHeaders(userId) });
    if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
    return res.json();
  },
  async login(username: string, password: string): Promise<UserDTO> {
    const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', username, password }) });
    if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
    return res.json();
  },
  async register(username: string, password: string): Promise<UserDTO> {
    const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'register', username, password }) });
    if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
    return res.json();
  },
  async getProducts(all = false): Promise<ProductDTO[]> {
    const res = await fetch(`/api/products${all ? '?all=1' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },
  async getProduct(id: string): Promise<ProductDTO> {
    const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },
  async createProduct(userId: string, data: Partial<ProductDTO>): Promise<ProductDTO> {
    const res = await fetch('/api/products', { method: 'POST', ...withHeaders(userId), body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error || 'Create failed');
    return res.json();
  },
  async updateProduct(userId: string, id: string, data: Partial<ProductDTO>): Promise<ProductDTO> {
    const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: 'PATCH', ...withHeaders(userId), body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
    return res.json();
  },
  async getCart(userId: string): Promise<{ items: CartItemDTO[]; count: number }> {
    const res = await fetch('/api/cart', { method: 'GET', ...withHeaders(userId) });
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  },
  async addToCart(userId: string, productId: string, qty = 1) {
    const res = await fetch('/api/cart', { method: 'POST', ...withHeaders(userId), body: JSON.stringify({ productId, qty }) });
    if (!res.ok) throw new Error('Failed to add to cart');
    return res.json();
  },
  async setCartItem(userId: string, productId: string, qty: number) {
    const res = await fetch('/api/cart', { method: 'PUT', ...withHeaders(userId), body: JSON.stringify({ productId, qty }) });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json();
  },
  async removeFromCart(userId: string, productId: string) {
    const res = await fetch('/api/cart', { method: 'DELETE', ...withHeaders(userId), body: JSON.stringify({ productId }) });
    if (!res.ok) throw new Error('Failed to remove from cart');
    return res.json();
  },
  async listOrders(userId: string, all = false) {
    const res = await fetch(`/api/orders${all ? '?all=1' : ''}`, { method: 'GET', ...withHeaders(userId) });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },
  async deleteOrder(userId: string, id: string) {
    const res = await fetch('/api/orders', { method: 'DELETE', ...withHeaders(userId), body: JSON.stringify({ id }) });
    if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
    return res.json();
  },
  async cancelOrder(userId: string, id: string) {
    const res = await fetch('/api/orders', { method: 'PATCH', ...withHeaders(userId), body: JSON.stringify({ id, status: 'cancelled' }) });
    if (!res.ok) throw new Error((await res.json()).error || 'Cancel failed');
    return res.json();
  },
  async createOrder(userId: string) {
    const res = await fetch('/api/orders', { method: 'POST', ...withHeaders(userId) });
    if (!res.ok) throw new Error((await res.json()).error || 'Checkout failed');
    return res.json();
  },
};

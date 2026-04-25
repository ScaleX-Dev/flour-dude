/**
 * Studio Admin API utilities
 * All requests go through the Payload REST API at /api/payload/*
 * Authentication via the `payload-token` cookie (sent automatically by the browser).
 */

const BASE = '/api/payload';

// ─── Generic fetch ────────────────────────────────────────────────────────────

export async function studioFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `API error ${res.status}`;
    try {
      const body = await res.json();
      message = body?.errors?.[0]?.message ?? body?.message ?? message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface PayloadUser {
  id: number;
  email: string;
}

export async function loginUser(emailOrUsername: string, password: string): Promise<PayloadUser> {
  const isEmail = emailOrUsername.includes('@');
  const body = isEmail
    ? { email: emailOrUsername, password }
    : { username: emailOrUsername, password };

  const data = await studioFetch<{ user: PayloadUser; token: string }>(
    '/users/login',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
  return data.user;
}

export async function logoutUser(): Promise<void> {
  await studioFetch('/users/logout', { method: 'POST' });
}

export async function getCurrentUser(): Promise<PayloadUser | null> {
  try {
    const data = await studioFetch<{ user: PayloadUser | null }>('/users/me');
    return data.user ?? null;
  } catch {
    return null;
  }
}

// ─── Media upload ─────────────────────────────────────────────────────────────

export interface UploadedMedia {
  id: number;
  url: string;
  filename: string;
}

export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('alt', file.name.replace(/\.[^.]+$/, ''));

  const res = await fetch(`${BASE}/media`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
    // Do NOT set Content-Type manually; browser sets multipart boundary automatically
  });

  if (!res.ok) {
    let message = `Upload failed: ${res.status}`;
    try {
      const body = await res.json();
      message = body?.errors?.[0]?.message ?? body?.message ?? message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const json = await res.json();
  return json.doc as UploadedMedia;
}

// ─── Cakes ────────────────────────────────────────────────────────────────────

export interface CakeItem {
  id: number;
  name: string;
  description?: string | null;
  photos?: Array<{ image?: { id: number; url?: string | null } | number | null }> | null;
  occasion_tags?: string[] | null;
  starting_price?: number | null;
  show_price?: boolean | null;
  featured?: boolean | null;
  whatsapp_message_override?: string | null;
  updatedAt?: string;
  createdAt?: string;
}

export interface CakeListResponse {
  docs: CakeItem[];
  totalDocs: number;
  totalPages: number;
  page: number;
}

export async function listCakes(page = 1, limit = 50): Promise<CakeListResponse> {
  return studioFetch<CakeListResponse>(
    `/cake-portfolio-items?depth=2&limit=${limit}&page=${page}&sort=-updatedAt`
  );
}

export async function getCake(id: number): Promise<CakeItem> {
  return studioFetch<CakeItem>(`/cake-portfolio-items/${id}?depth=2`);
}

export async function createCake(data: Record<string, unknown>): Promise<CakeItem> {
  const res = await studioFetch<{ doc: CakeItem }>(
    '/cake-portfolio-items',
    { method: 'POST', body: JSON.stringify(data) }
  );
  return res.doc;
}

export async function updateCake(id: number, data: Record<string, unknown>): Promise<CakeItem> {
  const res = await studioFetch<{ doc: CakeItem }>(
    `/cake-portfolio-items/${id}`,
    { method: 'PATCH', body: JSON.stringify(data) }
  );
  return res.doc;
}

export async function deleteCake(id: number): Promise<void> {
  await studioFetch(`/cake-portfolio-items/${id}`, { method: 'DELETE' });
}

// ─── Banners (Promotions) ─────────────────────────────────────────────────────

export interface BannerItem {
  id: number;
  headline: string;
  sub_headline?: string | null;
  description?: string | null;
  image?: { id: number; url?: string | null } | number | null;
  cta_text?: string | null;
  cta_url?: string | null;
  active?: boolean | null;
  expires_at?: string | null;
  banner_type?: 'seasonal' | 'homepage' | 'menu' | 'global' | null;
  updatedAt?: string;
  createdAt?: string;
}

export interface BannerListResponse {
  docs: BannerItem[];
  totalDocs: number;
  totalPages: number;
  page: number;
}

export async function listBanners(page = 1, limit = 50): Promise<BannerListResponse> {
  return studioFetch<BannerListResponse>(
    `/promotions?depth=2&limit=${limit}&page=${page}&sort=-updatedAt`
  );
}

export async function getBanner(id: number): Promise<BannerItem> {
  return studioFetch<BannerItem>(`/promotions/${id}?depth=2`);
}

export async function createBanner(data: Record<string, unknown>): Promise<BannerItem> {
  const res = await studioFetch<{ doc: BannerItem }>(
    '/promotions',
    { method: 'POST', body: JSON.stringify(data) }
  );
  return res.doc;
}

export async function updateBanner(id: number, data: Record<string, unknown>): Promise<BannerItem> {
  const res = await studioFetch<{ doc: BannerItem }>(
    `/promotions/${id}`,
    { method: 'PATCH', body: JSON.stringify(data) }
  );
  return res.doc;
}

export async function deleteBanner(id: number): Promise<void> {
  await studioFetch(`/promotions/${id}`, { method: 'DELETE' });
}

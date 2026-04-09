export interface Media {
  id: number;
  alt?: string | null;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  category: number | MenuCategory;
  price: number;
  description?: string | null;
  isFeatured?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CakePortfolioItem {
  id: number;
  title: string;
  description?: string | null;
  image?: number | Media | null;
  priceFrom?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: number;
  customerName: string;
  message: string;
  rating?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Promotion {
  id: number;
  title: string;
  body?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  active?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

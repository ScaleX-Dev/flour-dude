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
  slug?: string | null;
  sort_order?: number | null;
  icon_emoji?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  category: number | MenuCategory;
  price?: number;
  price_lkr?: number;
  photo?: number | Media | null;
  available?: boolean | null;
  badge?: string | null;
  allergens?: string[] | null;
  sort_order?: number | null;
  description?: string | null;
  isFeatured?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CakePortfolioItem {
  id: number;
  name?: string;
  title: string;
  photos?: Array<{ image?: number | Media | null }>; 
  occasion_tags?: string[] | null;
  description?: string | null;
  image?: number | Media | null;
  featured?: boolean | null;
  show_price?: boolean | null;
  starting_price?: number | null;
  whatsapp_message_override?: string | null;
  priceFrom?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: number;
  quote?: string;
  customer_name?: string;
  occasion?: string | null;
  star_rating?: '3' | '4' | '5' | null;
  active?: boolean | null;
  sort_order?: number | null;
  customerName: string;
  message: string;
  rating?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string | Record<string, unknown>;
  category?: 'order' | 'general' | 'catering' | 'delivery' | null;
  sort_order?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Promotion {
  id: number;
  headline?: string;
  sub_headline?: string | null;
  description?: string | null;
  image?: number | Media | null;
  cta_text?: string | null;
  cta_url?: string | null;
  expires_at?: string | null;
  banner_type?: 'seasonal' | 'homepage' | 'menu' | 'global' | null;
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

export interface HeroBanner {
  id: number;
  image?: number | Media | null;
  headline: string;
  sub_headline?: string | null;
  cta_1_text?: string | null;
  cta_2_text?: string | null;
  active?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  whatsapp_number: string;
  owner_email: string;
  uber_rating?: string | null;
  uber_review_count?: number | null;
  cakes_made_count?: number | null;
  opening_hours?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  uber_eats_url?: string | null;
  pickme_url?: string | null;
  instagram_handle?: string | null;
}

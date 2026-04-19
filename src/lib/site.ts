import type { CakePortfolioItem, FAQ, MenuCategory, MenuItem, Testimonial } from '@/payload-types';
import { formatLKR } from '@/lib/formatting';
import { WA, buildWhatsAppURL } from '@/lib/whatsapp';

export const siteConfig = {
  name: 'Flour Dude',
  domain: 'flourdude.lk',
  description:
    'Cafe, custom cake studio, and B2B catering in Galle, Sri Lanka. WhatsApp-first ordering for cakes, daily cafe menu, and event catering.',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://flourdude.lk',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94XXXXXXXXX',
  instagramHandle: '@flour_dude',
  hours: 'Every day, 8:30 AM - 9:00 PM',
  ratingLabel: '5.0 stars on Uber Eats (140+ verified reviews)',
  locations: ['Bandara Mawatha, Galle', 'Thalapitiya Road, Galle']
} as const;

export const whatsappMessages = {
  default: "Hi Flour Dude! I'd like to place an order. Can you help?",
  cakeOrder: "Hi Flour Dude! I'd like to order a [CAKE NAME]. Can you help?",
  customCake: "Hi Flour Dude! I'd like to order a custom cake. Can you tell me about designs and pricing?",
  b2b: "Hi Flour Dude! I'm interested in catering for an event. Can we discuss?",
  menu: 'Hi Flour Dude! I have a question about your menu.'
} as const;

export function buildWhatsAppLink(message: string): string {
  return buildWhatsAppURL(message, siteConfig.whatsappNumber);
}

export function formatLkr(value: number): string {
  return formatLKR(value);
}

export const whatsappLinks = {
  default: WA.default,
  customCake: WA.customCake,
  b2b: WA.b2b,
  menu: WA.menu,
  cakeOrder: WA.cakeOrder
};

export const heroImages = {
  cake: '/images/hero-cake.jpg',
  waffle: '/images/hero-menu.jpg',
  celebration: '/images/hero-events.jpg'
} as const;

type MenuCategorySeed = Pick<MenuCategory, 'name' | 'description'> & {
  slug: string;
};

type MenuItemSeed = Pick<MenuItem, 'name' | 'description' | 'price'> & {
  categorySlug: string;
  isFeatured?: boolean;
  imageUrl?: string;
};

type CakeSeed = Pick<CakePortfolioItem, 'title' | 'description' | 'priceFrom'> & {
  imageUrl: string;
  accent: string;
};

export const menuCategories: MenuCategorySeed[] = [
  { slug: 'hot-coffee', name: 'Hot Coffee', description: 'Classic espresso-based hot drinks.' },
  { slug: 'cold-coffee', name: 'Cold Coffee', description: 'Iced coffee lineup and creamy cold favorites.' },
  { slug: 'matcha', name: 'Matcha', description: 'Earthy matcha in hot and iced formats.' },
  { slug: 'ice-blends', name: 'Frappes & Blends', description: 'Thick blended drinks and indulgent textures.' },
  { slug: 'iced-tea', name: 'Iced Tea', description: 'Light fruit iced teas for all-day refreshment.' },
  { slug: 'milkshakes', name: 'Milkshakes', description: 'Dessert-style milkshakes with bold flavors.' },
  { slug: 'refreshers', name: 'Refreshers', description: 'Citrus and tropical coolers.' },
  { slug: 'savory', name: 'Savory', description: 'Wraps, sandwiches, quesadilla and more.' },
  { slug: 'waffles-sweets', name: 'Waffles & Sweets', description: 'Sweet waffle plates and add-ons.' },
  { slug: 'cakes-muffins', name: 'Cakes & Muffins', description: 'Daily slices, cake jars, and fresh muffins.' },
  { slug: 'brownies-cookies', name: 'Brownies & Cookies', description: 'Baked treats and shareable snack boxes.' }
];

export const menuItems: MenuItemSeed[] = [
  {
    categorySlug: 'hot-coffee',
    name: 'Espresso Single',
    description: 'Balanced espresso shot.',
    price: 400,
    imageUrl: '/images/hero-events.jpg'
  },
  {
    categorySlug: 'hot-coffee',
    name: 'Espresso Double',
    description: 'Double espresso for a stronger finish.',
    price: 550,
    imageUrl: '/images/hero-events.jpg'
  },
  { categorySlug: 'hot-coffee', name: 'Americano', description: 'Espresso with hot water.', price: 450 },
  { categorySlug: 'hot-coffee', name: 'Cappuccino', description: 'Espresso, steamed milk, milk foam.', price: 650 },
  { categorySlug: 'hot-coffee', name: 'Flat White', description: 'Silky microfoam with espresso.', price: 650 },
  { categorySlug: 'hot-coffee', name: 'Latte', description: 'Smooth espresso latte.', price: 650 },
  { categorySlug: 'hot-coffee', name: 'Latte Macchiato', description: 'Layered milk and espresso.', price: 650 },
  { categorySlug: 'hot-coffee', name: 'Cafe Mocha', description: 'Espresso with chocolate and milk.', price: 750 },
  { categorySlug: 'hot-coffee', name: 'Hot Chocolate', description: 'Rich cocoa and steamed milk.', price: 600 },

  {
    categorySlug: 'cold-coffee',
    name: 'Iced Americano',
    description: 'Chilled espresso over ice.',
    price: 500,
    imageUrl: '/images/hero-events.jpg'
  },
  {
    categorySlug: 'cold-coffee',
    name: 'Iced Latte',
    description: 'Espresso with milk over ice.',
    price: 700,
    imageUrl: '/images/hero-events.jpg'
  },
  { categorySlug: 'cold-coffee', name: 'Vanilla Latte', description: 'Iced latte with vanilla.', price: 750 },
  { categorySlug: 'cold-coffee', name: 'Iced Caramel Latte', description: 'Caramel-infused iced latte.', price: 750 },
  { categorySlug: 'cold-coffee', name: 'Cinnamon Iced Latte', description: 'Warm cinnamon notes in iced milk coffee.', price: 650 },
  { categorySlug: 'cold-coffee', name: 'Spanish Latte', description: 'Creamy sweet condensed milk latte.', price: 700 },
  { categorySlug: 'cold-coffee', name: 'Iced Mocha', description: 'Chocolate and espresso over ice.', price: 750 },
  { categorySlug: 'cold-coffee', name: 'Spanish Mocha Latte', description: 'Mocha twist on Spanish latte.', price: 750 },
  { categorySlug: 'cold-coffee', name: 'Iced Vienna Coffee', description: 'Iced coffee with cream crown.', price: 1000 },
  { categorySlug: 'cold-coffee', name: 'Nutella Latte', description: 'Hazelnut-cocoa latte blend.', price: 1000 },
  { categorySlug: 'cold-coffee', name: 'Affogato', description: 'Espresso over creamy ice cream.', price: 600 },
  { categorySlug: 'cold-coffee', name: 'Iced Chocolate', description: 'Cold chocolate milk drink.', price: 650 },

  {
    categorySlug: 'matcha',
    name: 'Iced Matcha Latte',
    description: 'Ceremonial-style matcha with milk and ice.',
    price: 850,
    imageUrl: '/images/hero-menu.jpg'
  },
  { categorySlug: 'matcha', name: 'Hot Matcha Latte', description: 'Warm whisked matcha latte.', price: 750 },
  { categorySlug: 'matcha', name: 'Strawberry Iced Matcha', description: 'Layered strawberry and iced matcha.', price: 1000 },

  {
    categorySlug: 'ice-blends',
    name: 'Coffee Caramel',
    description: 'Blended caramel coffee frappe.',
    price: 950,
    imageUrl: '/images/hero-menu.jpg'
  },
  { categorySlug: 'ice-blends', name: 'Double Chocolate', description: 'Thick blended chocolate drink.', price: 1000 },

  {
    categorySlug: 'iced-tea',
    name: 'Peach Iced Tea',
    description: 'Light black tea with peach notes.',
    price: 500,
    imageUrl: '/images/menu-feature-cheesecake.jpg'
  },
  { categorySlug: 'iced-tea', name: 'Lime Iced Tea', description: 'Citrus iced tea.', price: 500 },
  { categorySlug: 'iced-tea', name: 'Strawberry Iced Tea', description: 'Berry-forward iced tea.', price: 500 },
  { categorySlug: 'iced-tea', name: 'Blueberry Iced Tea', description: 'Blueberry infused iced tea.', price: 550 },

  {
    categorySlug: 'milkshakes',
    name: 'Nutella Milkshake',
    description: 'Chocolate-hazelnut milkshake.',
    price: 900,
    imageUrl: '/images/menu-feature-cheesecake.jpg'
  },
  { categorySlug: 'milkshakes', name: 'Kit Kat Milkshake', description: 'Chocolate wafer shake.', price: 900 },
  { categorySlug: 'milkshakes', name: "Dude's Cookie Shake", description: 'Cookie-thick signature shake.', price: 850 },
  { categorySlug: 'milkshakes', name: 'Strawberry Milk Cloud', description: 'Strawberry cream milkshake.', price: 900 },

  {
    categorySlug: 'refreshers',
    name: 'Lime & Mint Refresher',
    description: 'Crisp lime with mint.',
    price: 600,
    imageUrl: '/images/hero-menu.jpg'
  },
  { categorySlug: 'refreshers', name: 'Strawberry Refresher', description: 'Strawberry cooler.', price: 650 },
  { categorySlug: 'refreshers', name: 'Passion Refresher', description: 'Tropical passion cooler.', price: 650 },
  { categorySlug: 'refreshers', name: 'Tropical Refresher', description: 'Mixed tropical fruit refresher.', price: 700 },

  {
    categorySlug: 'savory',
    name: 'Chicken Wrap',
    description: 'Grilled chicken wrap.',
    price: 900,
    imageUrl: '/images/menu-feature-savory.jpg'
  },
  { categorySlug: 'savory', name: 'Chicken Waffles', description: 'Savory waffle and chicken combo.', price: 900 },
  { categorySlug: 'savory', name: 'Smoked Chicken Sandwich', description: 'Toasted smoked chicken sandwich.', price: 1100 },
  { categorySlug: 'savory', name: 'Quesadilla', description: 'Cheese and chicken quesadilla.', price: 1450 },
  { categorySlug: 'savory', name: 'Fries', description: 'Crispy fries.', price: 600 },
  { categorySlug: 'savory', name: 'Scrambled Eggs', description: 'Soft scrambled eggs.', price: 500 },

  {
    categorySlug: 'waffles-sweets',
    name: 'Nutella Waffle',
    description: 'Warm waffle with Nutella.',
    price: 1100,
    imageUrl: '/images/menu-feature-waffle.jpg'
  },
  { categorySlug: 'waffles-sweets', name: 'Kit Kat / Oreo Waffle', description: 'Loaded with crushed bars and cookies.', price: 1200 },
  { categorySlug: 'waffles-sweets', name: 'Choco Peanut Waffle', description: 'Chocolate waffle with roasted peanut crunch.', price: 900 },
  { categorySlug: 'waffles-sweets', name: 'Messy Waffle', description: 'Nutella, strawberry, or Kit Kat loaded finish.', price: 1300, isFeatured: true },
  { categorySlug: 'waffles-sweets', name: 'French Toast', description: 'Golden French toast plate.', price: 850 },

  {
    categorySlug: 'cakes-muffins',
    name: 'Matilda Chocolate Fudge Cake',
    description: 'Dense chocolate sponge finished with rich fudge ganache.',
    price: 900,
    isFeatured: true,
    imageUrl: '/images/cake-portfolio-3.jpg'
  },
  {
    categorySlug: 'cakes-muffins',
    name: 'Oreo Cake',
    description: 'Cookies-and-cream cake finished with Oreo crumble.',
    price: 550,
    imageUrl: '/images/cake-portfolio-2.jpg'
  },
  {
    categorySlug: 'cakes-muffins',
    name: 'Coffee Cake',
    description: 'Moist coffee sponge layered with silky coffee cream.',
    price: 850,
    imageUrl: '/images/cake-portfolio-1.jpg'
  },
  {
    categorySlug: 'cakes-muffins',
    name: 'Strawberry Lemon Bar',
    description: 'Bright lemon base with strawberry glaze and buttery crumb.',
    price: 650,
    imageUrl: '/images/menu-feature-cheesecake.jpg'
  },
  {
    categorySlug: 'cakes-muffins',
    name: 'Double Chocolate Banana Muffins',
    description: 'Banana muffin loaded with dark chocolate and cocoa chips.',
    price: 480,
    imageUrl: '/images/cake-portfolio-4.jpg'
  },
  { categorySlug: 'cakes-muffins', name: 'Strawberry Cheesecake', description: 'Creamy baked cheesecake with strawberry notes.', price: 1200 },
  { categorySlug: 'cakes-muffins', name: 'Passion Cheesecake', description: 'Tangy passion fruit cheesecake.', price: 1200 },
  { categorySlug: 'cakes-muffins', name: 'Tiramisu', description: 'Coffee-soaked layered tiramisu.', price: 1300 },
  { categorySlug: 'cakes-muffins', name: 'Tres Leches', description: 'Three-milk soaked cake slice.', price: 700 },
  { categorySlug: 'cakes-muffins', name: 'Cafe Mocha Cake', description: 'Mocha-infused cake slice.', price: 850 },
  { categorySlug: 'cakes-muffins', name: 'Banana Muffin', description: 'Soft classic banana muffin.', price: 320 },
  { categorySlug: 'cakes-muffins', name: 'Cream Cheese Banana Muffin', description: 'Banana muffin with cream cheese core.', price: 550 },

  {
    categorySlug: 'brownies-cookies',
    name: 'Fudge Brownie',
    description: 'Dense and rich chocolate brownie.',
    price: 300,
    imageUrl: '/images/cake-portfolio-3.jpg'
  },
  { categorySlug: 'brownies-cookies', name: 'Nutella Brownie', description: 'Fudge brownie with Nutella swirl.', price: 350 },
  { categorySlug: 'brownies-cookies', name: 'Peanut Butter Brownie', description: 'Brownie finished with peanut butter.', price: 450 },
  {
    categorySlug: 'brownies-cookies',
    name: 'Chocolate Chip Cookies',
    description: 'Classic soft-center cookie.',
    price: 180,
    imageUrl: '/images/menu-feature-cheesecake.jpg'
  },
  { categorySlug: 'brownies-cookies', name: 'Double Chocolate Chip Cookies', description: 'Dark cocoa cookie with chocolate chips.', price: 220 },
  { categorySlug: 'brownies-cookies', name: 'Cookie Choco Tub', description: 'Shareable chocolate cookie tub.', price: 500 }
];

export const cakePortfolio: CakeSeed[] = [
  {
    title: 'Lotus Biscoff Celebration Cake',
    description: 'Three layers, biscoff crunch center, caramel drip, lotus shards.',
    priceFrom: 9500,
    imageUrl: '/images/cake-portfolio-1.jpg',
    accent: 'bg-[#f4d7b5]'
  },
  {
    title: 'Pastel Birthday Garden Cake',
    description: 'Hand-piped florals with soft pink and sage tones for birthdays.',
    priceFrom: 12000,
    imageUrl: '/images/cake-portfolio-2.jpg',
    accent: 'bg-[#f7d4cf]'
  },
  {
    title: 'Chocolate Fudge Matilda Tower',
    description: 'Bold cocoa sponge with extra ganache for serious chocoholics.',
    priceFrom: 8900,
    imageUrl: '/images/cake-portfolio-3.jpg',
    accent: 'bg-[#dcc1a2]'
  },
  {
    title: 'Wedding White Textured Cake',
    description: 'Elegant minimal texture work, pearl finish, fresh flower styling.',
    priceFrom: 18000,
    imageUrl: '/images/cake-portfolio-4.jpg',
    accent: 'bg-[#efe5d8]'
  }
];

export const testimonials: Pick<Testimonial, 'customerName' | 'message' | 'rating'>[] = [
  {
    customerName: 'Ishara P.',
    rating: 5,
    message:
      'Ordered a custom birthday cake and it looked exactly like the reference photo. Taste was unreal and delivery was on time.'
  },
  {
    customerName: 'Nadeesha H. (Hotel Partner)',
    rating: 5,
    message:
      'Flour Dude handles our corporate dessert platters for events in Galle. Very responsive, clean packaging, consistently fresh.'
  },
  {
    customerName: 'Uber Eats Customer',
    rating: 5,
    message: 'Best waffles in town. Fast delivery and generous portions every single time.'
  }
];

export const faqs: Pick<FAQ, 'question' | 'answer'>[] = [
  {
    question: 'How far in advance should I place a custom cake order?',
    answer:
      'For standard custom designs, please message us at least 48 hours in advance. Wedding and large event cakes usually need 5 to 7 days.'
  },
  {
    question: 'Do you offer same-day delivery in Galle?',
    answer: 'Yes, selected menu items are available for same-day delivery via Uber Eats and PickMe Food based on availability.'
  },
  {
    question: 'Can businesses request recurring catering?',
    answer:
      'Yes. We offer recurring weekly and monthly catering for hotels, offices, and planners. Send your event frequency and headcount on WhatsApp.'
  }
];

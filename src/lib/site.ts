import type { CakePortfolioItem, FAQ, MenuCategory, MenuItem, Testimonial } from '@/payload-types';

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
  b2b: "Hi Flour Dude! I'm interested in catering for an event. Can we discuss?"
} as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatLkr(value: number): string {
  return `LKR ${new Intl.NumberFormat('en-LK').format(value)}`;
}

export const heroImages = {
  cake:
    'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1600,h_1100/samples/food/fish-vegetables.jpg',
  waffle:
    'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_900/samples/food/dessert.jpg',
  celebration:
    'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_900/samples/people/kitchen-bar.jpg'
} as const;

type MenuCategorySeed = Pick<MenuCategory, 'name' | 'description'> & {
  slug: string;
};

type MenuItemSeed = Pick<MenuItem, 'name' | 'description' | 'price'> & {
  categorySlug: string;
  isFeatured?: boolean;
};

type CakeSeed = Pick<CakePortfolioItem, 'title' | 'description' | 'priceFrom'> & {
  imageUrl: string;
  accent: string;
};

export const menuCategories: MenuCategorySeed[] = [
  { slug: 'cakes', name: 'Cakes', description: 'Layer cakes and slices for everyday cravings.' },
  { slug: 'waffles', name: 'Waffles', description: 'Loaded waffles, sweet and savory.' },
  {
    slug: 'wraps-sandwiches',
    name: 'Wraps & Sandwiches',
    description: 'Cafe-ready options for brunch and tea time.'
  },
  { slug: 'coffee-tea', name: 'Coffee & Tea', description: 'Hot brews and iced cafe classics.' },
  { slug: 'chocolate-drinks', name: 'Chocolate Drinks', description: 'Rich and creamy chocolate bar drinks.' },
  {
    slug: 'custom-cakes',
    name: 'Custom Cakes',
    description: 'Personalised creations made to brief via WhatsApp.'
  },
  {
    slug: 'b2b-event-catering',
    name: 'B2B / Event Catering',
    description: 'Corporate trays, wedding dessert tables, and hotel partnerships.'
  }
];

export const menuItems: MenuItemSeed[] = [
  {
    categorySlug: 'cakes',
    name: 'Matilda Chocolate Cake',
    description: 'Dense chocolate sponge with silky ganache and cocoa crumbs.',
    price: 900,
    isFeatured: true
  },
  {
    categorySlug: 'cakes',
    name: 'Tres Leches',
    description: 'Vanilla sponge soaked in a three-milk blend with whipped cream.',
    price: 1100,
    isFeatured: true
  },
  {
    categorySlug: 'cakes',
    name: 'Oreo Cake',
    description: 'Cookies-and-cream mini cake topped with crushed Oreos.',
    price: 550
  },
  {
    categorySlug: 'cakes',
    name: 'Strawberry Cheesecake',
    description: 'Baked cheesecake with fresh strawberry glaze.',
    price: 1400
  },
  {
    categorySlug: 'waffles',
    name: 'Nutella Waffle',
    description: 'Warm waffle, Nutella drizzle, roasted almonds, vanilla cream.',
    price: 1300,
    isFeatured: true
  },
  {
    categorySlug: 'waffles',
    name: 'Messy Waffle',
    description: 'Brownie bits, caramel, chocolate sauce, and soft serve scoop.',
    price: 1500
  },
  {
    categorySlug: 'waffles',
    name: 'Chicken Waffle',
    description: 'Crispy chicken, honey-chili glaze, and herb mayo.',
    price: 1200
  },
  {
    categorySlug: 'wraps-sandwiches',
    name: 'Chicken Wrap',
    description: 'Smoked chicken, slaw, garlic aioli, grilled tortilla.',
    price: 1150
  },
  {
    categorySlug: 'wraps-sandwiches',
    name: 'Smoked Chicken Sandwich',
    description: 'Triple toasted sandwich with cheddar and caramelized onions.',
    price: 1450
  },
  {
    categorySlug: 'coffee-tea',
    name: 'Caramel Latte',
    description: 'Espresso, steamed milk, caramel blend.',
    price: 850
  },
  {
    categorySlug: 'coffee-tea',
    name: 'Iced Ceylon Milk Tea',
    description: 'Slow-brewed Ceylon tea over ice with creamy milk.',
    price: 780
  },
  {
    categorySlug: 'chocolate-drinks',
    name: 'Dark Chocolate Mocha',
    description: 'Dark chocolate and espresso, topped with cream.',
    price: 920
  },
  {
    categorySlug: 'chocolate-drinks',
    name: 'Belgian Hot Chocolate',
    description: 'Thick hot chocolate with cinnamon dust.',
    price: 980
  }
];

export const cakePortfolio: CakeSeed[] = [
  {
    title: 'Lotus Biscoff Celebration Cake',
    description: 'Three layers, biscoff crunch center, caramel drip, lotus shards.',
    priceFrom: 9500,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_1200/samples/food/pot-mussels.jpg',
    accent: 'bg-[#f4d7b5]'
  },
  {
    title: 'Pastel Birthday Garden Cake',
    description: 'Hand-piped florals with soft pink and sage tones for birthdays.',
    priceFrom: 12000,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_1200/samples/food/spices.jpg',
    accent: 'bg-[#f7d4cf]'
  },
  {
    title: 'Chocolate Fudge Matilda Tower',
    description: 'Bold cocoa sponge with extra ganache for serious chocoholics.',
    priceFrom: 8900,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_1200/samples/food/dessert.jpg',
    accent: 'bg-[#dcc1a2]'
  },
  {
    title: 'Wedding White Textured Cake',
    description: 'Elegant minimal texture work, pearl finish, fresh flower styling.',
    priceFrom: 18000,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_1200/samples/people/jazz.jpg',
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

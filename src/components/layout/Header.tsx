import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/cakes', label: 'Cakes' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/order', label: 'Order' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  return (
    <header className="border-b border-brand-caramel/40 bg-brand-cream/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-wide text-brand-cocoa">
          Flour Dude
        </Link>
        <nav className="hidden gap-4 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-caramel">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

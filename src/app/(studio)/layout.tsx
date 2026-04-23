import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flour Dude Studio',
  description: 'Admin studio for Flour Dude',
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

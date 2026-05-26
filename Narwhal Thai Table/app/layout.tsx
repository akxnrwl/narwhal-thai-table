import type { Metadata, Viewport } from 'next';
import './globals.css';
import ComingSoonTicker from '@/components/ComingSoonTicker';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const SITE_URL = 'https://narwhalthaihb.com'; // update when domain is live

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Narwhal Thai Table · A Thai Family Table in Huntington Beach',
    template: '%s · Narwhal Thai Table',
  },
  description: "A Thai family table on Beach Boulevard, Huntington Beach. Every dish hand-prepared by Chef Rainny, of MasterChef Thailand Season 1.",
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'Narwhal Thai Table',
    locale: 'en_US',
    title: 'Narwhal Thai Table · Huntington Beach',
    description: 'A Thai family table on Beach Boulevard. Every dish by Chef Rainny, of MasterChef Thailand Season 1.',
    // images: [{ url: '/og-cover.jpg', width: 1200, height: 630, alt: 'Narwhal Thai Table' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='%230B1F33'/%3E%3Ctext x='50%25' y='54%25' font-family='Bodoni Moda,Georgia,serif' font-style='italic' font-size='38' fill='%23B08D3C' text-anchor='middle' dominant-baseline='middle'%3EN%3C/text%3E%3C/svg%3E" },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1F33',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ComingSoonTicker />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

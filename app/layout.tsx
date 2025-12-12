import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://decemilia.cloud'),
  title: {
    default: 'Decemilia | Web Applications & Digital Solutions',
    template: '%s | Decemilia',
  },
  description: 'We build web applications, e-commerce solutions, automation workflows, and custom software for ambitious businesses.',
  keywords: ['Web Development', 'Custom Software', 'E-commerce Solutions', 'Automation', 'Micro-SaaS', 'Next.js', 'React'],
  authors: [{ name: 'Decemilia' }],
  creator: 'Decemilia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://decemilia.cloud',
    title: 'Decemilia | Web Applications & Digital Solutions',
    description: 'We build web applications, e-commerce solutions, automation workflows, and custom software.',
    siteName: 'Decemilia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decemilia | Web Applications & Digital Solutions',
    description: 'Custom web applications, e-commerce, and automation solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

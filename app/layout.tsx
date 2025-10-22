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
  metadataBase: new URL('https://decemilia.com'),
  title: {
    default: 'Yusuf Yesilyurt | Software Engineer',
    template: '%s | Yusuf Yesilyurt',
  },
  description: 'Software Engineer specializing in JavaScript, Python, React, and modern web technologies. Master\'s in Computer Engineering from Wroclaw University.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'JavaScript', 'Python', 'React', 'TypeScript', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Yusuf Yesilyurt' }],
  creator: 'Yusuf Yesilyurt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://decemilia.com',
    title: 'Yusuf Yesilyurt | Software Engineer',
    description: 'Software Engineer specializing in JavaScript, Python, and modern web technologies.',
    siteName: 'Yusuf Yesilyurt Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yusuf Yesilyurt | Software Engineer',
    description: 'Software Engineer specializing in JavaScript, Python, and modern web technologies.',
    creator: '@yesilyurt',
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

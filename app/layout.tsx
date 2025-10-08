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
    default: 'Decemilia | Cloud-Native Solutions by Yusuf Yesilyurt',
    template: '%s | Decemilia',
  },
  description: 'Decemilia delivers cutting-edge cloud-native solutions and modern web development. Founded by Yusuf Yesilyurt, we build scalable applications with Next.js, TypeScript, and cloud technologies.',
  keywords: ['Cloud Native', 'Web Development', 'Full Stack', 'React', 'Next.js', 'TypeScript', 'Decemilia', 'Yusuf Yesilyurt', 'Cloud Solutions'],
  authors: [{ name: 'Yusuf Yesilyurt' }],
  creator: 'Yusuf Yesilyurt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://decemilia.cloud',
    title: 'Decemilia | Cloud-Native Solutions',
    description: 'Cloud-native solutions and modern web development by Yusuf Yesilyurt.',
    siteName: 'Decemilia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decemilia | Cloud-Native Solutions',
    description: 'Cloud-native solutions and modern web development by Yusuf Yesilyurt.',
    creator: '@decemilia',
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

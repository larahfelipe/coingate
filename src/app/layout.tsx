import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';

import { AppHeader } from '@/components/app-header';
import { AppProvider } from '@/providers/app-provider';
import { type Children } from '@/types';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'coingate | real-time cryptocurrency data & market insights',
  description:
    'coingate provides real-time crypto market data, in-depth charts, and comprehensive analytics to help you make informed investment decisions. Track thousands of cryptocurrencies with up-to-the-minute insights and performance metrics.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <AppProvider>
          <AppHeader />

          {children}
        </AppProvider>
      </body>
    </html>
  );
}

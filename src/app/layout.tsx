import { AppHeader } from '@/components/app-header';
import { AppProvider } from '@/providers/app-provider';
import { Children } from '@/types';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'coingate | real-time cryptocurrency data & market nsights',
  description:
    'coingate provides real-time crypto market data, in-depth charts, and comprehensive analytics to help you make informed investment decisions. Track thousands of cryptocurrencies with up-to-the-minute insights and performance metrics.',
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-black via-[#03003b] to-[#08086b]`}
      >
        <AppProvider>
          <AppHeader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

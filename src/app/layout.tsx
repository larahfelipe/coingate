import { Header } from '@/components/header';
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
  title: 'coingate | Real-time Cryptocurrency data & Market Insights',
  description:
    'coingate provides real-time crypto market data, in-depth charts, and comprehensive analytics to help you make informed investment decisions. Track thousands of cryptocurrencies with up-to-the-minute insights and performance metrics.',
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-black via-[#03003b] to-[#08086b]`}
      >
        <div className="p-4 space-y-18">
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </div>
      </body>
    </html>
  );
}

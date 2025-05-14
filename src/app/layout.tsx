import { Header } from "@/components/header";
import { Children } from "@/types";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "coingate | Real-Time Cryptocurrency data & Market Insights",
  description: "coingate provides real-time crypto market data, in-depth charts, and comprehensive analytics to help you make informed investment decisions. Track thousands of cryptocurrencies with up-to-the-minute insights and performance metrics.",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} font-sans antialiased p-4 min-h-screen bg-gradient-to-br from-[#1e0037] via-black to-[#2c0056]`}
      >
        <Header />
        <main className="my-12">
          {children}
        </main>
      </body>
    </html>
  );
}

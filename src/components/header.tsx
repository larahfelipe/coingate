'use client';

import { ConnectWalletBtn } from '@/components/connect-wallet-btn';
import { NavLink } from '@/components/navlink';
import { Bank, Coins } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { Logo } from './logo';

export const Header: FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="bg-white/5 backdrop-blur-md border border-white/5 shadow-sm py-2 w-full flex items-center rounded-3xl relative">
      <Logo className="absolute inset-0 left-6" />
      <nav className="ml-auto mr-6 md:mx-auto">
        <ul className="flex gap-8 md:gap-12">
          <li>
            <NavLink
              href="/coins"
              name="Coins"
              isActive={isActive('/coins')}
              icon={<Coins size={20} />}
            />
          </li>
          <li>
            <NavLink
              href="/exchanges"
              name="Exchanges"
              isActive={isActive('/exchanges')}
              icon={<Bank size={20} />}
            />
          </li>
        </ul>
      </nav>
      <ConnectWalletBtn />
    </header>
  );
};

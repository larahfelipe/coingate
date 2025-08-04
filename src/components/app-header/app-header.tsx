'use client';

import { AppHeaderNavLink } from '@/components/app-header/app-header-nav-link';
import { ConnectWalletBtn } from '@/components/app-header/connect-wallet-btn';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { Bank, Coins } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { ComponentProps, FC } from 'react';

type AppHeaderProps = {
  className?: ComponentProps<'header'>['className'];
};

export const AppHeader: FC<AppHeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header
      className={cn(
        'flex items-center rounded-2xl sticky top-4 z-50 mx-2 sm:mx-6 mb-14 py-2 px-2 bg-white/5 backdrop-blur-md border shadow-md',
        className,
      )}
    >
      <Logo className="h-8 w-auto ml-2.5" />
      <nav className="mx-auto">
        <ul className="flex gap-8 md:gap-6">
          <li>
            <AppHeaderNavLink
              href="/coins"
              name="coins"
              activePath={isActive('/coins')}
              icon={<Coins size={18} />}
            />
          </li>
          <li>
            <AppHeaderNavLink
              href="/exchanges"
              name="exchanges"
              activePath={isActive('/exchanges')}
              icon={<Bank size={18} />}
            />
          </li>
        </ul>
      </nav>
      <ConnectWalletBtn />
    </header>
  );
};

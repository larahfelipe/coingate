'use client';

import { type ComponentProps, type FC } from 'react';

import { Coins, Landmark } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { AppHeaderNavLink } from '@/components/app-header/app-header-nav-link';
import { ConnectWalletBtn } from '@/components/app-header/connect-wallet-btn';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { cn } from '@/lib/utils';

type AppHeaderProps = ComponentProps<'header'>;

const routes = [
  { name: 'coins', path: '/coins', icon: <Coins size={18} /> },
  { name: 'exchanges', path: '/exchanges', icon: <Landmark size={18} /> },
];

export const AppHeader: FC<AppHeaderProps> = ({ className, ...props }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header
      className={cn(
        'sticky h-14 w-[calc(100%-2rem)] flex top-4 z-50 mx-auto px-4 rounded-xl border dark:border-gray-700/60 bg-background/80 backdrop-blur-xs supports-backdrop-filter:bg-background/40 shadow-xs transition-all',
        className,
      )}
      {...props}
    >
      <Logo className="mr-6 sm:mr-12" />

      <nav className="flex items-center space-x-6 sm:space-x-8 text-sm">
        {routes.map((route) => (
          <AppHeaderNavLink
            key={route.path}
            href={route.path}
            name={route.name}
            icon={route.icon}
            activePath={isActive(route.path)}
          />
        ))}
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />

        <ConnectWalletBtn />
      </div>
    </header>
  );
};

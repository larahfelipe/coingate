'use client';

import { ConnectWalletBtn } from '@/components/connect-wallet-btn';
import { NavLink } from '@/components/navlink';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bank, ChartBar, Coins, MagnifyingGlass } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { ComponentProps, FC } from 'react';
import { Logo } from './logo';

type HeaderProps = {
  className?: ComponentProps<'header'>['className'];
};

export const Header: FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header
      className={cn(
        'bg-white/5 backdrop-blur-md border shadow-md py-2.5 w-full flex items-center rounded-2xl sticky top-4 z-50',
        className,
      )}
    >
      <div className="flex items-center ml-4 mr-8">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="mx-auto">
        <ul className="flex gap-8 md:gap-6">
          <li>
            <NavLink
              href="/coins"
              name="Coins"
              activePath={isActive('/coins')}
              icon={
                <Coins
                  weight={isActive('/coins') ? 'fill' : 'regular'}
                  size={18}
                />
              }
            />
          </li>
          <li>
            <NavLink
              href="/exchanges"
              name="Exchanges"
              activePath={isActive('/exchanges')}
              icon={
                <Bank
                  weight={isActive('/exchanges') ? 'fill' : 'regular'}
                  size={18}
                />
              }
            />
          </li>
          <li>
            <NavLink
              disabled
              href="/charts"
              name="Charts"
              activePath={isActive('/charts')}
              icon={
                <ChartBar
                  weight={isActive('/charts') ? 'fill' : 'regular'}
                  size={18}
                />
              }
            />
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2 mr-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              >
                <MagnifyingGlass size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ConnectWalletBtn disabled className="ml-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border border-gray-800 shadow-xl">
            <DropdownMenuItem className="hover:bg-gray-800 text-gray-300 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 text-gray-300 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 text-red-400 cursor-pointer">
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

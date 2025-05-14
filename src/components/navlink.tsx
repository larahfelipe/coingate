import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, JSX } from 'react';

type NavLinkProps = {
  isActive: boolean;
  href: string;
  name: string;
  icon?: JSX.Element;
};

export const NavLink: FC<NavLinkProps> = ({ isActive, href, name, icon }) => (
  <Link
    href={href}
    className={cn(
      'flex items-center gap-2 py-1 border-b-1 transition-all',
      isActive
        ? 'border-white text-white'
        : 'border-transparent text-white/70 hover:border-white/30',
    )}
  >
    {icon}
    <span className="group-hover-text-glow max-sm:hidden">{name}</span>
  </Link>
);

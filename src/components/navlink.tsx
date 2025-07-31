import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ComponentProps, FC, JSX } from 'react';

type NavLinkProps = {
  activePath: boolean;
  href: string;
  name: string;
  disabled?: boolean;
  icon?: JSX.Element;
  className?: ComponentProps<'a'>['className'];
};

export const NavLink: FC<NavLinkProps> = ({
  activePath,
  href,
  name,
  disabled,
  icon,
  className,
}) => {
  if (disabled) return null;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 py-1 border-b-1 transition-all',
        activePath
          ? 'border-white text-white'
          : 'border-transparent text-white/70 hover:border-white/30',
        className,
      )}
    >
      {icon}
      <span className="group-hover-text-glow max-sm:hidden">{name}</span>
    </Link>
  );
};

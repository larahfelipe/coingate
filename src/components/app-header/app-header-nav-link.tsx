import { type ComponentProps, type FC, type JSX } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

type AppHeaderNavLinkProps = {
  activePath: boolean;
  href: string;
  name: string;
  disabled?: boolean;
  icon?: JSX.Element;
  className?: ComponentProps<'a'>['className'];
};

export const AppHeaderNavLink: FC<AppHeaderNavLinkProps> = ({
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
        'flex h-full items-center gap-2 relative text-sm font-medium transition-colors hover:text-primary',
        activePath ? 'text-primary' : 'text-muted-foreground',
        className,
      )}
    >
      {icon}

      <span className="max-sm:hidden">{name}</span>

      {activePath && (
        <div className="w-full h-[2px] absolute bottom-0 bg-primary" />
      )}
    </Link>
  );
};

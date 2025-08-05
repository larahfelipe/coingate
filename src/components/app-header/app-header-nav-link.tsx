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
      className={cn('flex items-center gap-2 relative', className)}
    >
      {icon}

      <span className="group-hover-text-glow max-sm:hidden">{name}</span>

      {activePath && (
        <div className="w-full h-[1px] absolute bottom-[-1rem] bg-white" />
      )}
    </Link>
  );
};

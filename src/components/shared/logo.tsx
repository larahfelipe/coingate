import { ComponentProps, FC } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { CoinIcon } from '@phosphor-icons/react';

type LogoProps = {
  className?: ComponentProps<'div'>['className'];
};

export const Logo: FC<LogoProps> = ({ className }) => (
  <Link
    href="/"
    className={cn('min-w-fit self-center flex items-center gap-2', className)}
  >
    <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center">
      <CoinIcon className="size-5 text-primary" />
    </div>

    <h3 className="font-bold text-lg tracking-tight text-primary max-sm:hidden">
      coingate
    </h3>
  </Link>
);

import { type ComponentProps, type FC } from 'react';

import { ArrowDownRight, ArrowUpRight } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

type PriceChangeIconProps = {
  value: number;
  className?: ComponentProps<'div'>['className'];
};

export const getPriceChangeColor = (value: number) => {
  if (value > 0) return 'text-emerald-400';
  if (value < 0) return 'text-rose-400';
  return 'text-slate-400';
};

export const PriceChangeIcon: FC<PriceChangeIconProps> = ({
  value,
  className,
}) => {
  if (value > 0)
    return (
      <ArrowUpRight
        className={cn('size-4', className, getPriceChangeColor(value))}
      />
    );

  if (value < 0)
    return (
      <ArrowDownRight
        className={cn('size-4', className, getPriceChangeColor(value))}
      />
    );

  return null;
};

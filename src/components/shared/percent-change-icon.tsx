import { ComponentProps, type FC } from 'react';

import { CaretDown, CaretUp, Minus } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

type PercentChangeIconProps = {
  value: number;
  textSize?: number;
  iconSize?: number;
  className?: ComponentProps<'div'>['className'];
};

export const PercentChangeIcon: FC<PercentChangeIconProps> = ({
  className,
  value,
  textSize,
  iconSize = 18,
}) => {
  const valuePercent = value.toFixed(2) + '%';

  if (value === 0 || valuePercent.includes('0.00'))
    return (
      <div
        className={cn(
          'flex items-center gap-1.5 *:text-muted-foreground *:dark:text-muted-foreground',
          className,
        )}
      >
        <Minus size={iconSize} />

        <span style={{ fontSize: textSize }}>
          {valuePercent.replace('-', '')}
        </span>
      </div>
    );

  return value > 0 ? (
    <div
      className={cn(
        'flex items-center gap-1.5 *:text-emerald-500 *:dark:text-emerald-400',
        className,
      )}
    >
      <CaretUp size={iconSize} />

      <span style={{ fontSize: textSize }}>{valuePercent}</span>
    </div>
  ) : (
    <div
      className={cn(
        'flex items-center gap-1.5 *:text-red-500 *:dark:text-red-400',
        className,
      )}
    >
      <CaretDown size={iconSize} />

      <span style={{ fontSize: textSize }}>{valuePercent}</span>
    </div>
  );
};

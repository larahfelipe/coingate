import { type ComponentProps, type FC } from 'react';

import { CaretDown, CaretUp, Minus } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

type PercentChangeIconProps = {
  value?: number;
  textSize?: number;
  iconSize?: number;
  className?: ComponentProps<'div'>['className'];
};

export const PercentChangeIcon: FC<PercentChangeIconProps> = ({
  className,
  textSize,
  value,
  iconSize = 16,
}) => {
  const valuePercent = (value ?? 0).toFixed(1) + '%';

  if (!value || value === 0 || valuePercent.includes('0.0'))
    return (
      <div
        className={cn(
          'flex items-center gap-1 *:text-muted-foreground *:dark:text-muted-foreground',
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
        'flex items-center gap-1 *:text-emerald-500 *:dark:text-emerald-400',
        className,
      )}
    >
      <CaretUp size={iconSize} />

      <span style={{ fontSize: textSize }}>{valuePercent}</span>
    </div>
  ) : (
    <div
      className={cn(
        'flex items-center gap-1 *:text-red-500 *:dark:text-red-400',
        className,
      )}
    >
      <CaretDown size={iconSize} />

      <span style={{ fontSize: textSize }}>{valuePercent}</span>
    </div>
  );
};

import { cn } from '@/lib/utils';
import { CaretDown, CaretUp, Minus } from '@phosphor-icons/react';
import { FC, HTMLAttributes } from 'react';

type PercentChangeIconProps = {
  value: number;
  textSize?: number;
  iconSize?: number;
  className?: HTMLAttributes<HTMLDivElement>['className'];
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
          'flex items-center gap-1.5 [&>*]:text-gray-400',
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
        'flex items-center gap-1.5 [&>*]:text-emerald-400',
        className,
      )}
    >
      <CaretUp size={iconSize} />
      <span style={{ fontSize: textSize }}>{valuePercent}</span>
    </div>
  ) : (
    <div
      className={cn('flex items-center gap-1.5 [&>*]:text-red-400', className)}
    >
      <CaretDown size={iconSize} />
      <span style={{ fontSize: textSize }}>{valuePercent}</span>
    </div>
  );
};

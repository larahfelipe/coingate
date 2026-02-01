import { ComponentProps, type FC, forwardRef } from 'react';

import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import { type Column } from '@tanstack/react-table';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { type Children } from '@/types';

type THeadBtnProps = Children & {
  column: Column<any>;
  tooltip?: string;
  className?: ComponentProps<'button'>['className'];
};

export const THeadBtn: FC<THeadBtnProps> = ({
  tooltip,
  column,
  children,
  className,
}) => {
  if (!tooltip?.length)
    return (
      <Btn column={column} className={className}>
        {children}
      </Btn>
    );

  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Btn column={column} className={className}>
          {children}
        </Btn>
      </TooltipTrigger>

      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

const Btn = forwardRef<HTMLButtonElement, Omit<THeadBtnProps, 'tooltip'>>(
  ({ column, children, className, ...rest }, ref) => (
    <Button
      variant="ghost"
      ref={ref}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={className}
      {...rest}
    >
      {column.getCanSort() && (
        <>
          {column.getIsSorted() === 'asc' && <ArrowUp size={18} />}

          {column.getIsSorted() === 'desc' && <ArrowDown size={18} />}
        </>
      )}

      {children}
    </Button>
  ),
);
Btn.displayName = 'Btn';

import { type FC, forwardRef } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
  tooltip?: string;
};

const Btn = forwardRef<HTMLButtonElement, Omit<THeadBtnProps, 'tooltip'>>(
  ({ column, children, ...rest }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      {...rest}
    >
      {children}

      {column.getCanSort() && (
        <>
          {column.getIsSorted() === 'asc' && <ArrowUp size={18} />}

          {column.getIsSorted() === 'desc' && <ArrowDown size={18} />}
        </>
      )}
    </Button>
  ),
);
Btn.displayName = 'Btn';

export const THeadBtn: FC<THeadBtnProps> = ({ tooltip, column, children }) => {
  if (!tooltip?.length) return <Btn column={column}>{children}</Btn>;

  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Btn column={column}>{children}</Btn>
      </TooltipTrigger>

      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

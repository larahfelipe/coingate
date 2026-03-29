import { type ComponentProps } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { type Column } from '@/lib/react-table';
import { type Children } from '@/types';

type THeadBtnProps<T> = ComponentProps<'button'> &
  Children & {
    column: Column<T>;
    tooltip?: string;
  };

export function THeadBtn<T>({
  tooltip,
  column,
  children,
  className,
}: THeadBtnProps<T>) {
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
}

function Btn<T>({
  column,
  children,
  className,
  ...rest
}: Readonly<Omit<THeadBtnProps<T>, 'tooltip'>>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={className}
      {...rest}
    >
      {column.getCanSort() && (
        <>
          {column.getIsSorted() === 'asc' && <ArrowUp className="size-4" />}

          {column.getIsSorted() === 'desc' && <ArrowDown className="size-4" />}
        </>
      )}

      {children}
    </Button>
  );
}

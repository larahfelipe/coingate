import { forwardRef } from 'react';

import { flexRender, type Row } from '@tanstack/react-table';

import { TableCell, TableRow } from '@/components/ui';
import { type Coin } from '@/hooks/use-coingecko';
import { cn } from '@/lib/utils';

export type CoinsTableRowProps = {
  row: Row<Coin>;
  onRowClick: (coinId: string) => void;
  visibleColumnIds: string;
};

export const CoinsTableRow = forwardRef<HTMLTableRowElement, CoinsTableRowProps>(
  ({ row, onRowClick, visibleColumnIds, ...props }, ref) => (
    <TableRow
      ref={ref}
      onClick={() => onRowClick(row.original.id)}
      className="h-15 [&>td]:py-4 [&>td]:px-6"
      {...props}
    >
      {row.getVisibleCells().map((cell) => {
        const size = cell.column.getSize();
        return (
          <TableCell
            key={cell.id}
            style={{ width: size }}
            className={cn(
              (cell.column.columnDef.meta as { className: string })?.className,
              'overflow-hidden text-ellipsis whitespace-nowrap',
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  ),
);

CoinsTableRow.displayName = 'CoinsTableRow';

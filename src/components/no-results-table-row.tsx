'use client';

import { type ComponentProps, type FC } from 'react';

import { List } from '@phosphor-icons/react';

import { TableCell, TableRow } from '@/components/ui';
import { cn } from '@/lib/utils';

type NoResultsTableRowProps = {
  className?: ComponentProps<'tr'>['className'];
  message?: string;
};

export const NoResultsTableRow: FC<NoResultsTableRowProps> = ({
  className,
  message = 'No results found.',
}) => {
  return (
    <TableRow>
      <TableCell colSpan={9} className="py-7 px-5">
        <div
          className={cn('flex items-center justify-center gap-2', className)}
        >
          <List size={18} />

          <span>{message}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

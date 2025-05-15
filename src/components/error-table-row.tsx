'use client';

import { TableCell, TableRow } from '@/components/ui';
import { cn } from '@/lib/utils';
import { X } from '@phosphor-icons/react';
import { ComponentProps, FC } from 'react';

type ErrorTableRowProps = {
  className?: ComponentProps<'tr'>['className'];
  message?: string;
};

export const ErrorTableRow: FC<ErrorTableRowProps> = ({
  className,
  message = 'Oops, something went wrong! Please, try again later.',
}) => {
  return (
    <TableRow>
      <TableCell colSpan={9} className="py-7 px-5">
        <div
          className={cn('flex items-center justify-center gap-2', className)}
        >
          <X size={18} className="text-red-400" />
          <span>{message}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

'use client';

import { type ComponentProps, type FC } from 'react';

import { X } from 'lucide-react';

import { TableCell, TableRow } from '@/components/ui';
import { cn } from '@/lib/utils';

type ErrorTableRowProps = {
  colSpan: number;
  className?: ComponentProps<'tr'>['className'];
  message?: string;
};

export const ErrorTableRow: FC<ErrorTableRowProps> = ({
  colSpan,
  className,
  message = 'Oops, something went wrong! Please, try again later.',
}) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="py-7 px-5">
      <div className={cn('flex items-center justify-center gap-3', className)}>
        <X className="size-4 text-red-400" />

        <span>{message}</span>
      </div>
    </TableCell>
  </TableRow>
);

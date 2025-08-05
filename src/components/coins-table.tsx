'use client';

import { type FC } from 'react';

import { flexRender } from '@tanstack/react-table';

import { ErrorTableRow } from '@/components/error-table-row';
import { NoResultsTableRow } from '@/components/no-results-table-row';
import { SearchInput } from '@/components/search-input';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { useCoinsTable } from '@/hooks/use-coins-table';

type CoinsTableProps = {
  onRowClick: (coinId: string) => void;
};

export const CoinsTable: FC<CoinsTableProps> = ({ onRowClick }) => {
  const { isLoading, isError, isSuccess, table, searchCoin } = useCoinsTable();

  return (
    <div className="w-full lg:max-w-[85%] flex flex-col gap-6 sm:gap-3 mx-auto">
      <SearchInput
        containerClassName="md:self-end max-lg:mx-2"
        inputClassName="md:w-[300px]"
        placeholder="search coin by name..."
        disabled={isLoading}
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(e) => searchCoin(e.target.value)}
      />

      <Table className="bg-white/5 backdrop-blur-md">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="[&>th]:font-semibold [&>th]:py-1"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <div
                    className={
                      header.column.getCanSort() ? 'flex items-center' : ''
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isError && <ErrorTableRow />}

          {isLoading && <CoinsTableSkeletonLoadingRow />}

          {isSuccess && !table.getRowModel().rows?.length && (
            <NoResultsTableRow
              message={
                table.getColumn('name')?.getFilterValue()
                  ? `No results found for "${table.getColumn('name')?.getFilterValue()}".`
                  : undefined
              }
            />
          )}

          {isSuccess &&
            !!table.getRowModel().rows?.length &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick(row.original.id)}
                className="h-15 [&>td]:py-4 [&>td]:px-6"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

const CoinsTableSkeletonLoadingRow: FC = () =>
  Array.from({ length: 20 }).map((_, i) => (
    <TableRow key={String(i)} className="[&>td]:py-4 [&>td]:px-6">
      <TableCell>
        <Skeleton className="size-6" />
      </TableCell>

      <TableCell>
        <Skeleton className="size-6" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-96" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-24" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-20" />
      </TableCell>
    </TableRow>
  ));

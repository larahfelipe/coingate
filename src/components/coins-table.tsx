'use client';

import { ChangeEvent, type FC } from 'react';

import { flexRender } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import { ErrorTableRow } from '@/components/shared/error-table-row';
import { NoResultsTableRow } from '@/components/shared/no-results-table-row';
import { SearchInput } from '@/components/shared/search-input';
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

  const searchedCoinName =
    (table.getColumn('name')?.getFilterValue() as string) ?? '';

  const handleChangeSearchedCoin = (e: ChangeEvent<HTMLInputElement>) => {
    searchCoin(e.target.value);
  };

  return (
    <div className="w-full xl:max-w-[80%] flex flex-col gap-6 sm:gap-3 mx-auto p-4 md:p-6 sm:pt-10 mt-10">
      <SearchInput
        containerClassName="md:self-end max-lg:mx-2"
        inputClassName="md:w-[300px] border-0 border-b border-transparent shadow-none rounded-none transition-colors placeholder:transition-colors focus-visible:ring-0 focus-visible:border-primary focus-visible:placeholder:text-primary"
        placeholder="Search coin by name..."
        disabled={isLoading}
        value={searchedCoinName}
        onChange={handleChangeSearchedCoin}
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="[&>th]:font-semibold [&>th]:py-1"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    (header.column.columnDef.meta as any)?.className,
                  )}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
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
                  <TableCell
                    key={cell.id}
                    className={cn(
                      (
                        cell.column.columnDef.meta as Record<
                          'className',
                          string
                        >
                      )?.className,
                    )}
                  >
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

      <TableCell align="right">
        <Skeleton className="h-7 w-24" />
      </TableCell>

      <TableCell align="right">
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell align="right">
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell align="right">
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell align="right">
        <Skeleton className="h-7 w-20" />
      </TableCell>

      <TableCell align="right">
        <Skeleton className="h-7 w-20" />
      </TableCell>
    </TableRow>
  ));

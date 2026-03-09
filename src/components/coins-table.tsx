'use client';

import { memo, type FC } from 'react';

import { Settings2 } from 'lucide-react';

import { ErrorTableRow } from '@/components/shared/error-table-row';
import { NoResultsTableRow } from '@/components/shared/no-results-table-row';
import { SearchInput } from '@/components/shared/search-input';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Switch } from '@/components/ui/switch';
import { COLUMNS_NAMES, useCoinsTable } from '@/hooks/use-coins-table';
import { flexRender } from '@/lib/react-table';
import { cn } from '@/lib/utils';

type CoinsTableProps = {
  onRowClick: (coinId: string) => void;
};

const CoinsTableComponent: FC<CoinsTableProps> = ({ onRowClick }) => {
  const { table, status, coin, searchCoin } = useCoinsTable();

  return (
    <div className="w-full mt-10 space-y-6 sm:space-y-3 p-4 md:p-6 sm:pt-10">
      <div className="max-w-335 mx-auto flex flex-col gap-4">
        <div className="flex items-center gap-2 2xl:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Customize table columns"
              >
                <Settings2 className="size-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {table.getAllColumns().map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center justify-between gap-6"
                >
                  {COLUMNS_NAMES[column.id as keyof typeof COLUMNS_NAMES]}

                  <Switch
                    disabled={!column.getCanHide()}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      if (column.getCanHide()) column.toggleVisibility(value);
                    }}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <SearchInput
            debounced
            value={coin}
            onChange={searchCoin}
            disabled={status === 'pending'}
            placeholder="Search coin by name..."
            inputClassName="md:w-60 border-0 border-b border-transparent shadow-none rounded-none transition-colors placeholder:transition-colors focus-visible:ring-0 focus-visible:border-primary focus-visible:placeholder:text-primary"
          />
        </div>

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
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            {status === 'error' && <ErrorTableRow />}

            {status === 'pending' && <CoinsTableSkeletonLoadingRow />}

            {status === 'success' && !table.getRowModel().rows?.length && (
              <NoResultsTableRow
                message={
                  table.getColumn('name')?.getFilterValue()
                    ? `No results found for "${table.getColumn('name')?.getFilterValue()}".`
                    : undefined
                }
              />
            )}

            {status === 'success' &&
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const CoinsTable = memo(CoinsTableComponent);
CoinsTable.displayName = 'CoinsTable';

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

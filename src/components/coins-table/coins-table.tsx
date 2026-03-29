'use client';

import { type FC } from 'react';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { RefreshCcw, Settings2 } from 'lucide-react';

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
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { flexRender } from '@/lib/react-table';
import { cn } from '@/lib/utils';

import { CoinsTableRow } from './coins-table-row';

type CoinsTableProps = {
  onRowClick: (coinId: string) => void;
};

export const CoinsTable: FC<CoinsTableProps> = ({ onRowClick }) => {
  const {
    table,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetchNextPageError,
    coin,
    searchCoin,
  } = useCoinsTable();

  const loadMoreRef = useIntersectionObserver<HTMLTableRowElement>({
    enabled: !!hasNextPage && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: fetchNextPage,
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 60,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const paddingTop =
    virtualItems.length > 0 ? (virtualItems[0]?.start ?? 0) : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? rowVirtualizer.getTotalSize() -
        (virtualItems[virtualItems.length - 1]?.end ?? 0)
      : 0;

  const visibleLeafColumns = table.getVisibleLeafColumns();
  const visibleColumnIds = visibleLeafColumns.map((c) => c.id).join(',');
  const visibleColumnsCount = visibleLeafColumns.length;

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
                    style={{ width: header.column.getSize() }}
                    className={cn(
                      (header.column.columnDef.meta as { className: string })
                        ?.className,
                      'overflow-hidden',
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
            {status === 'error' && (
              <ErrorTableRow colSpan={visibleColumnsCount} />
            )}

            {status === 'pending' && <CoinsTableSkeletonLoadingRow />}

            {status === 'success' && !rows.length && (
              <NoResultsTableRow
                message={
                  table.getColumn('name')?.getFilterValue()
                    ? `No results found for "${table.getColumn('name')?.getFilterValue()}".`
                    : undefined
                }
              />
            )}

            {status === 'success' && !!rows.length && (
              <>
                {paddingTop > 0 && (
                  <TableRow>
                    <TableCell
                      style={{ height: `${paddingTop}px` }}
                      colSpan={visibleColumnsCount}
                    />
                  </TableRow>
                )}

                {virtualItems.map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <CoinsTableRow
                      key={row.id}
                      row={row}
                      ref={rowVirtualizer.measureElement}
                      onRowClick={onRowClick}
                      data-index={virtualRow.index}
                      visibleColumnIds={visibleColumnIds}
                    />
                  );
                })}

                {paddingBottom > 0 && (
                  <TableRow>
                    <TableCell
                      style={{ height: `${paddingBottom}px` }}
                      colSpan={visibleColumnsCount}
                    />
                  </TableRow>
                )}

                {isFetchNextPageError && (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumnsCount}
                      className="text-center py-4"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-red-400">
                          Failed to load more coins.
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchNextPage()}
                        >
                          <RefreshCcw className="size-4 mr-2" />
                          Retry
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isFetchNextPageError && hasNextPage && (
                  <TableRow ref={loadMoreRef}>
                    <TableCell
                      colSpan={visibleColumnsCount}
                      className="text-center py-4"
                    >
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const CoinsTableSkeletonLoadingRow: FC = () =>
  Array.from({ length: 20 }).map((_, i) => (
    <TableRow key={i} className="[&>td]:py-4 [&>td]:px-6">
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

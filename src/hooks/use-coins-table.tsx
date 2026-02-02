import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { List, ListStar, Star } from '@phosphor-icons/react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  type Updater,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { PercentChangeIcon } from '@/components/shared/percent-change-icon';
import { THeadBtn } from '@/components/shared/table-header-btn';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { type Coin, useCoinsList } from '@/hooks/use-coingecko';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWatchlist } from '@/hooks/use-watchlist';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/utils/formatters';

import { useUrlParams } from './use-url-params';

type WatchlistTableMeta = Record<'watchlist', ReturnType<typeof useWatchlist>>;

type StarFilterState = 'all' | 'starred';

type CoinColumnVisibilityState = Partial<Record<keyof Coin, boolean>>;

export const useCoinsTable = () => {
  const [starFilter, setStarFilter] = useState<StarFilterState>('all');
  const [columnVisibility, setColumnVisibility] =
    useState<CoinColumnVisibilityState>({
      fullyDilutedValue: false,
      circulatingSupply: false,
      maxSupply: false,
    });

  const { updateUrlParams } = useUrlParams<'sort' | 'order' | 'search'>();

  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const sortOrderParam = searchParams.get('order');
  const searchParam = searchParams.get('search');

  const sorting = useMemo<SortingState>(
    () =>
      sortParam && sortOrderParam
        ? [{ id: sortParam, desc: sortOrderParam === 'desc' }]
        : [],
    [sortParam, sortOrderParam],
  );

  const columnFilters = useMemo<ColumnFiltersState>(
    () => (searchParam ? [{ id: 'name', value: searchParam }] : []),
    [searchParam],
  );

  const isSmallViewport = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setColumnVisibility((prev) => ({
      ...prev,
      star: isSmallViewport,
      rank: isSmallViewport,
    }));
  }, [isSmallViewport]);

  const { coinsQuery } = useCoinsList();
  const watchlist = useWatchlist();

  const coinsData = useMemo(
    () =>
      coinsQuery.data
        ? coinsQuery.data.filter((coin) =>
            starFilter === 'starred' ? watchlist.coins.includes(coin.id) : true,
          )
        : [],
    [coinsQuery.data, starFilter, watchlist.coins],
  );

  const columns = useMemo(
    () => getCoinsTableColumns(setStarFilter, isSmallViewport),
    [setStarFilter, isSmallViewport],
  );

  const handleSortingChange = (updater: Updater<SortingState>) => {
    const nextSorting =
      typeof updater === 'function' ? updater(sorting) : updater;

    if (!nextSorting.length) {
      updateUrlParams({ sort: null, order: null });
      return;
    }

    const { id, desc } = nextSorting[0];
    updateUrlParams({ sort: id, order: desc ? 'desc' : 'asc' });
  };

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const nextFilters =
      typeof updater === 'function' ? updater(columnFilters) : updater;

    const nameFilter = nextFilters.find((filter) => filter.id === 'name');

    updateUrlParams({ search: (nameFilter?.value as string) ?? null });
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data: coinsData,
    meta: { watchlist },
    state: { sorting, columnFilters, columnVisibility },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const searchCoin = useCallback(
    (coinName: string) => {
      updateUrlParams({ search: coinName.length ? coinName : null });
    },
    [updateUrlParams],
  );

  return {
    table,
    searchCoin,
    status: coinsQuery.status,
  };
};

export const getCoinsTableColumns = (
  setStarFilter: (filter: StarFilterState) => void,
  isSmallViewport: boolean,
): ColumnDef<Coin>[] => [
  {
    id: 'star',
    meta: { onSelect: setStarFilter },
    header: ({ column }) => {
      const { onSelect } = column.columnDef.meta as unknown as {
        onSelect: (filter: StarFilterState) => void;
      };
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-1.5">
              <ChevronDown size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white/10 backdrop-blur-md">
            <DropdownMenuItem
              className="focus:bg-white/5"
              onClick={() => onSelect?.('all')}
            >
              <List size={18} className="text-white" />
              All
            </DropdownMenuItem>

            <DropdownMenuItem
              className="focus:bg-white/5"
              onClick={() => onSelect?.('starred')}
            >
              <ListStar size={18} className="text-white" />
              Starred
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row, table }) => {
      const coin = row.original;
      const { coins, addCoin } =
        (table.options.meta as unknown as WatchlistTableMeta)?.watchlist ?? {};
      const isStarred = coins.includes(coin.id);
      return (
        <Star
          weight={isStarred ? 'fill' : 'regular'}
          className={cn(
            'cursor-pointer transition-colors hover:text-yellow-400',
            isStarred ? 'text-yellow-400' : '',
          )}
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            addCoin(coin.id);
          }}
        />
      );
    },
  },
  {
    accessorKey: 'rank',
    enableSorting: true,
    meta: { hideBelow: 768, className: 'w-12 !px-0 text-center' },
    header: ({ column }) => (
      <THeadBtn column={column} className="w-12 px-0 mx-auto">
        #
      </THeadBtn>
    ),
  },
  {
    accessorKey: 'name',
    enableSorting: true,
    header: ({ column }) => <THeadBtn column={column}>Name</THeadBtn>,
    cell: ({ row }) => {
      const coin = row.original;
      return (
        <div
          className={cn(
            'flex items-center gap-4',
            !isSmallViewport && 'w-[200px] truncate',
          )}
        >
          <Image src={coin.icon} alt={coin.name} width={20} height={20} />

          <p className="flex items-center gap-2 overflow-hidden">
            <span className="font-medium text-gray-800 dark:text-primary-foreground truncate">
              {coin.name}
            </span>

            <Badge variant="secondary">{coin.symbol}</Badge>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn column={column}>Price</THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<React.ReactNode>()}</div>
    ),
  },
  {
    accessorKey: 'priceChange1h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Price change over the last hour" column={column}>
          1h
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <PercentChangeIcon className="justify-end" value={getValue<number>()} />
    ),
  },
  {
    accessorKey: 'priceChange24h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Price change over the last 24 hours" column={column}>
          24h
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <PercentChangeIcon className="justify-end" value={getValue<number>()} />
    ),
  },
  {
    accessorKey: 'priceChange7d',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Price change over the last 7 days" column={column}>
          7d
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <PercentChangeIcon className="justify-end" value={getValue<number>()} />
    ),
  },
  {
    accessorKey: 'marketCap',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Market capitalization" column={column}>
          Mkt. cap.
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default text-right">
            {formatNumber(getValue<number>())}
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>
            {getValue<number>().toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'volume24h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn
          tooltip="Volume transacted over the last 24 hours"
          column={column}
        >
          Volume (24h)
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default text-right">
            {formatNumber(getValue<number>())}
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>
            {getValue<number>().toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'fullyDilutedValue',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Fully diluted value" column={column}>
          FDV
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default text-right">
            {formatNumber(getValue<number>())}
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>{getValue<number>().toLocaleString('en-US')}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'circulatingSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Circulating supply" column={column}>
          Circ. supply
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default text-right">
            {formatNumber(getValue<number>())}
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>{getValue<number>().toLocaleString('en-US')}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'maxSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn tooltip="Maximum supply" column={column}>
          Max. supply
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default text-right">
            {formatNumber(getValue<number>())}
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>{getValue<number>().toLocaleString('en-US')}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
];

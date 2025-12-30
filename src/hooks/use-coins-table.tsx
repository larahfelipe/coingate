'use client';

import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { List, ListStar, Star } from '@phosphor-icons/react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
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
} from '@/components/ui';
import { type Coin, useCoingecko } from '@/hooks/use-coingecko';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWatchlist } from '@/hooks/use-watchlist';
import { cn } from '@/lib/utils';

type WatchlistTableMeta = Record<'watchlist', ReturnType<typeof useWatchlist>>;

type StarFilterState = 'all' | 'starred';

type CoinColumnVisibilityState = Partial<Record<keyof Coin, boolean>>;

export const useCoinsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [starFilter, setStarFilter] = useState<StarFilterState>('all');
  const [columnVisibility, setColumnVisibility] =
    useState<CoinColumnVisibilityState>({
      fullyDilutedValue: false,
      circulatingSupply: false,
      maxSupply: false,
    });

  const isSmallViewport = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setColumnVisibility((prev) => ({
      ...prev,
      star: isSmallViewport,
      rank: isSmallViewport,
    }));
  }, [isSmallViewport]);

  const { coinsQuery } = useCoingecko();
  const watchlist = useWatchlist();

  const columns = useMemo(
    () => getCoinsTableColumns(setStarFilter, isSmallViewport),
    [setStarFilter, isSmallViewport],
  );

  const data = useMemo(() => {
    if (!coinsQuery.data) return [];
    return coinsQuery.data.filter((coin) =>
      starFilter === 'starred' ? watchlist.coins.includes(coin.id) : true,
    );
  }, [coinsQuery.data, starFilter, watchlist.coins]);

  const table = useReactTable({
    columns,
    data,
    meta: { watchlist },
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const searchCoin = (name: string) =>
    table.getColumn('name')?.setFilterValue(name.trim());

  return {
    table,
    searchCoin,
    isLoading: coinsQuery.isLoading,
    isError: coinsQuery.isError,
    isSuccess: coinsQuery.isSuccess,
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
    meta: { hideBelow: 768 },
    header: ({ column }) => <THeadBtn column={column}>#</THeadBtn>,
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
      <THeadBtn column={column} className="w-full justify-end">
        Price
      </THeadBtn>
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
      <THeadBtn
        tooltip="Price change over the last hour"
        column={column}
        className="w-full justify-end"
      >
        1h
      </THeadBtn>
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
      <THeadBtn
        tooltip="Price change over the last 24 hours"
        column={column}
        className="w-full justify-end"
      >
        24h
      </THeadBtn>
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
      <THeadBtn
        tooltip="Price change over the last 7 days"
        column={column}
        className="w-full justify-end"
      >
        7d
      </THeadBtn>
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
      <THeadBtn
        tooltip="Market capitalization"
        column={column}
        className="w-full justify-end"
      >
        Mkt. cap.
      </THeadBtn>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<React.ReactNode>()}</div>
    ),
  },
  {
    accessorKey: 'volume24h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn
        tooltip="Volume transacted over the last 24 hours"
        column={column}
        className="w-full justify-end"
      >
        Volume (24h)
      </THeadBtn>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<React.ReactNode>()}</div>
    ),
  },
  {
    accessorKey: 'fullyDilutedValue',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn
        tooltip="Fully diluted value"
        column={column}
        className="w-full justify-end"
      >
        FDV
      </THeadBtn>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<React.ReactNode>()}</div>
    ),
  },
  {
    accessorKey: 'circulatingSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn
        tooltip="Circulating supply"
        column={column}
        className="w-full justify-end"
      >
        Circ. supply
      </THeadBtn>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<React.ReactNode>()}</div>
    ),
  },
  {
    accessorKey: 'maxSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn
        tooltip="Maximum supply"
        column={column}
        className="w-full justify-end"
      >
        Max. supply
      </THeadBtn>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<React.ReactNode>()}</div>
    ),
  },
];

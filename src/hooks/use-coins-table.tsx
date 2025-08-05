'use client';

import { PercentChangeIcon } from '@/components/percent-change-icon';
import { THeadBtn } from '@/components/table-header-btn';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Coin, useCoingecko } from '@/hooks/use-coingecko';
import { useWatchlist } from '@/hooks/use-watchlist';
import { List, ListStar, Star } from '@phosphor-icons/react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

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

  const { coinsQuery } = useCoingecko();
  const watchlist = useWatchlist();

  const columns = useMemo(
    () => getCoinsTableColumns(setStarFilter),
    [setStarFilter],
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

const getCoinsTableColumns = (
  setStarFilter: (filter: StarFilterState) => void,
): ColumnDef<Coin>[] => [
  {
    id: 'star',
    meta: {
      onSelect: setStarFilter,
    },
    header: ({ column }) => {
      const onSelect = (
        column.columnDef.meta as unknown as Record<
          'onSelect',
          (filter: StarFilterState) => void
        >
      )?.onSelect;
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
          className={`cursor-pointer ${isStarred ? 'text-yellow-400' : ''}`}
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
    header: ({ column }) => (
      <THeadBtn tooltip="market capitalization rank" column={column}>
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
        <div className="flex items-center gap-4">
          <Image src={coin.icon} alt={coin.name} width={20} height={20} />
          <p className="space-x-2">
            <span>{coin.name}</span>
            <Badge
              variant="outline"
              className="border-slate-600/30 bg-slate-800/25 text-xs text-gray-400"
            >
              {coin.symbol}
            </Badge>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    enableSorting: true,
    header: ({ column }) => <THeadBtn column={column}>Price</THeadBtn>,
  },
  {
    accessorKey: 'priceChange1h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Price change over the last hour" column={column}>
        1h
      </THeadBtn>
    ),
    cell: ({ getValue }) => <PercentChangeIcon value={getValue<number>()} />,
  },
  {
    accessorKey: 'priceChange24h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Price change over the last 24 hours" column={column}>
        24h
      </THeadBtn>
    ),
    cell: ({ getValue }) => <PercentChangeIcon value={getValue<number>()} />,
  },
  {
    accessorKey: 'priceChange7d',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Price change over the last 7 days" column={column}>
        7d
      </THeadBtn>
    ),
    cell: ({ getValue }) => <PercentChangeIcon value={getValue<number>()} />,
  },
  {
    accessorKey: 'marketCap',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Market capitalization" column={column}>
        Mkt. cap.
      </THeadBtn>
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
      >
        Volume (24h)
      </THeadBtn>
    ),
  },
  {
    accessorKey: 'fullyDilutedValue',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Fully diluted value" column={column}>
        FDV
      </THeadBtn>
    ),
  },
  {
    accessorKey: 'circulatingSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Circulating supply" column={column}>
        Circ. supply
      </THeadBtn>
    ),
  },
  {
    accessorKey: 'maxSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <THeadBtn tooltip="Maximum supply" column={column}>
        Max. supply
      </THeadBtn>
    ),
  },
];

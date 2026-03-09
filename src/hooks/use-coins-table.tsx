import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { EllipsisVertical, Infinity, List, Star } from 'lucide-react';

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
import { useParamsState } from '@/hooks/use-params-state';
import { useWatchlist } from '@/hooks/use-watchlist';
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  type Updater,
  useReactTable,
  type VisibilityState,
} from '@/lib/react-table';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/utils/formatters';

type StarFilterValue = 'all' | 'starred';
type CoinColumns = Exclude<keyof Coin, 'id' | 'icon' | 'symbol'> | 'star';

export const COLUMNS_NAMES = {
  star: 'Starred',
  rank: 'Rank',
  name: 'Name',
  price: 'Price',
  priceChange1h: '1h',
  priceChange24h: '24h',
  priceChange7d: '7d',
  marketCap: 'Mkt. cap.',
  volume24h: 'Volume (24h)',
  fullyDilutedValue: 'FDV',
  circulatingSupply: 'Circ. supply',
  maxSupply: 'Max. supply',
} as const satisfies Record<CoinColumns, string>;

const DEFAULT_VISIBLE_COLUMNS: Record<CoinColumns, boolean> = {
  star: true,
  rank: true,
  name: true,
  price: true,
  priceChange1h: true,
  priceChange24h: true,
  priceChange7d: true,
  marketCap: true,
  volume24h: true,
  fullyDilutedValue: false,
  circulatingSupply: false,
  maxSupply: false,
};

const COLUMN_PARAM_SEP = '&';

export const useCoinsTable = () => {
  const [
    {
      column: columnParam,
      sort: sortParam,
      order: orderParam,
      search: searchParam,
    },
    setParams,
  ] = useParamsState<'column' | 'sort' | 'order' | 'search'>();

  const { coinsQuery } = useCoinsList();
  const watchlist = useWatchlist();
  const isWideViewport = useMediaQuery('(min-width: 768px)');

  const [starFilter, setStarFilter] = useState<StarFilterValue>('all');
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const allFalseColumns = Object.fromEntries(
      Object.keys(DEFAULT_VISIBLE_COLUMNS).map((k) => [k, false]),
    ) as Record<CoinColumns, boolean>;

    return columnParam
      ? columnParam.split(COLUMN_PARAM_SEP).reduce((acc, columnId) => {
          acc[columnId as CoinColumns] = true;
          return acc;
        }, allFalseColumns)
      : DEFAULT_VISIBLE_COLUMNS;
  });

  useEffect(() => {
    if (!columnParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColumnVisibility((prev) =>
        prev.star === isWideViewport && prev.rank === isWideViewport
          ? prev
          : { ...prev, star: isWideViewport, rank: isWideViewport },
      );
    }
  }, [columnParam, isWideViewport]);

  const columns = useMemo(
    () => getCoinsTableColumns(setStarFilter),
    [setStarFilter],
  );

  const coinsData = useMemo(() => {
    if (!coinsQuery.data) return [];
    if (starFilter === 'all') return coinsQuery.data;
    return coinsQuery.data.filter((coin) => watchlist.coins.includes(coin.id));
  }, [coinsQuery.data, watchlist.coins, starFilter]);

  const sorting = useMemo<SortingState>(
    () =>
      sortParam && orderParam
        ? [{ id: sortParam, desc: orderParam === 'desc' }]
        : [],
    [sortParam, orderParam],
  );

  const columnFilters = useMemo<ColumnFiltersState>(
    () => (searchParam ? [{ id: 'name', value: searchParam }] : []),
    [searchParam],
  );

  const handleSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      const nextSorting =
        typeof updater === 'function' ? updater(sorting) : updater;

      if (!nextSorting.length) {
        setParams({ sort: null, order: null });
        return;
      }

      const { id, desc } = nextSorting[0];
      setParams({ sort: id, order: desc ? 'desc' : 'asc' });
    },
    [sorting, setParams],
  );

  const handleColumnVisibilityChange = useCallback(
    (updater: Updater<VisibilityState>) => {
      const nextVisibility =
        typeof updater === 'function' ? updater(columnVisibility) : updater;

      const updatedColumns = { ...DEFAULT_VISIBLE_COLUMNS };
      let activeColumns = '';

      for (const key in nextVisibility) {
        updatedColumns[key as CoinColumns] = nextVisibility[key as CoinColumns];
        if (nextVisibility[key as CoinColumns]) {
          activeColumns = activeColumns
            ? `${activeColumns}${COLUMN_PARAM_SEP}${key}`
            : key;
        }
      }

      setParams({ column: activeColumns });
      setColumnVisibility(updatedColumns);
    },
    [columnVisibility, setParams],
  );

  const handleSearchCoin = useCallback(
    (coin: string) => setParams({ search: coin }),
    [setParams],
  );

  const table = useReactTable({
    columns,
    data: coinsData,
    meta: { watchlist, isWideViewport },
    state: { sorting, columnFilters, columnVisibility },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: handleSortingChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
  });

  return {
    table,
    status: coinsQuery.status,
    coin: searchParam,
    searchCoin: handleSearchCoin,
  };
};

export const getCoinsTableColumns = (
  setStarFilter: (filter: StarFilterValue) => void,
): ColumnDef<Coin>[] => [
  {
    id: 'star',
    meta: { onSelect: setStarFilter },
    header: ({ column }) => {
      const { onSelect } = column.columnDef.meta as {
        onSelect: (value: StarFilterValue) => VoidFunction;
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="Filter options"
              className="ml-1.5"
            >
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onSelect?.('all')}>
              <List className="size-4" /> All
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onSelect?.('starred')}>
              <Star className="size-4" /> Starred
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row, table }) => {
      const coin = row.original;
      const { coins, addCoin } =
        (
          table.options.meta as unknown as {
            watchlist: ReturnType<typeof useWatchlist>;
          }
        )?.watchlist ?? {};
      const isStarred = coins.includes(coin.id);
      return (
        <Star
          className={cn(
            'size-5 cursor-pointer transition-colors hover:text-yellow-400',
            isStarred && 'text-yellow-400',
          )}
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
    meta: { className: 'w-12 !px-0 text-center' },
    header: ({ column }) => (
      <THeadBtn
        column={column}
        aria-label="Coin rank"
        className="w-12 px-0 mx-auto"
      >
        #
      </THeadBtn>
    ),
  },
  {
    accessorKey: 'name',
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => (
      <THeadBtn column={column} aria-label="Coin name">
        {COLUMNS_NAMES[column.id as keyof typeof COLUMNS_NAMES]}
      </THeadBtn>
    ),
    cell: ({ row, table }) => {
      const coin = row.original;
      const { isWideViewport } = table.options.meta! as Record<
        'isWideViewport',
        boolean
      >;
      return (
        <div
          className={cn(
            'flex items-center gap-4',
            !isWideViewport && 'w-[200px] truncate',
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
        <THeadBtn column={column} aria-label="Current price">
          {COLUMNS_NAMES[column.id as keyof typeof COLUMNS_NAMES]}
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: 'priceChange1h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn
          column={column}
          tooltip="Price change over the last hour"
          aria-label="Price change over the last hour"
        >
          {COLUMNS_NAMES.priceChange1h}
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
        <THeadBtn
          column={column}
          tooltip="Price change over the last 24 hours"
          aria-label="Price change over the last 24 hours"
        >
          {COLUMNS_NAMES.priceChange24h}
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
        <THeadBtn
          column={column}
          tooltip="Price change over the last 7 days"
          aria-label="Price change over the last 7 days"
        >
          {COLUMNS_NAMES.priceChange7d}
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
        <THeadBtn
          column={column}
          tooltip="Market capitalization"
          aria-label="Coin market capitalization"
        >
          {COLUMNS_NAMES.marketCap}
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default text-right">
              {formatNumber(value)}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>
              {value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'volume24h',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn
          column={column}
          tooltip="Volume transacted over the last 24 hours"
          aria-label="Volume transacted over the last 24 hours"
        >
          {COLUMNS_NAMES.volume24h}
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default text-right">
              {formatNumber(value)}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>
              {value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'fullyDilutedValue',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn
          column={column}
          tooltip="Fully diluted value"
          aria-label="Coin fully-diluted value"
        >
          {COLUMNS_NAMES.fullyDilutedValue}
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default text-right">
              {formatNumber(value)}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>{value.toLocaleString('en-US')}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'circulatingSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn
          column={column}
          tooltip="Circulating supply"
          aria-label="Coin circulating supply"
        >
          {COLUMNS_NAMES.circulatingSupply}
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default text-right">
              {formatNumber(value)}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>{value.toLocaleString('en-US')}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'maxSupply',
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <div className="flex justify-end">
        <THeadBtn
          column={column}
          tooltip="Maximum supply"
          aria-label="Coin maximum supply"
        >
          {COLUMNS_NAMES.maxSupply}
        </THeadBtn>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default text-right">
              {value > 0 ? (
                formatNumber(value)
              ) : (
                <Infinity className="size-4 ml-auto" />
              )}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>{value > 0 ? value.toLocaleString('en-US') : 'Unlimited'}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];

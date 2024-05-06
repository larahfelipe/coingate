import type { ReactNode } from 'react';

export type WatchlistContextProps = {
  coinsWatchlist: Array<string>;
  exchangesWatchlist: Array<string>;
  coinsWatchlistInclude: (coinId: string) => void;
  exchangesWatchlistInclude: (exchangeId: string) => void;
};

export type WatchlistProviderProps = {
  children: ReactNode;
};

export type Watchlist = {
  coins: Array<string>;
  exchanges: Array<string>;
};

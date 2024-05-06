import { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { envs } from '@/common';

import type {
  Watchlist,
  WatchlistContextProps,
  WatchlistProviderProps
} from './types';

const WatchlistContext = createContext({} as WatchlistContextProps);

const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const [coinsWatchlist, setCoinsWatchlist] = useState<Array<string>>([]);
  const [exchangesWatchlist, setExchangesWatchlist] = useState<Array<string>>(
    []
  );

  const coinsWatchlistInclude = useCallback(
    (coinId: string) => {
      let stringifiedWatchlist = '';

      if (coinsWatchlist.includes(coinId)) {
        const filteredWatchList = coinsWatchlist.filter((id) => id !== coinId);

        stringifiedWatchlist = JSON.stringify({
          coins: filteredWatchList
        } as Watchlist);

        setCoinsWatchlist(filteredWatchList);
        localStorage.setItem(envs.watchlistStorageKey, stringifiedWatchlist);
        toast.success('Coin removed from watch list');
        return;
      }

      stringifiedWatchlist = JSON.stringify({
        coins: [...coinsWatchlist, coinId]
      } as Watchlist);

      setCoinsWatchlist((state) => [...state, coinId]);
      localStorage.setItem(envs.watchlistStorageKey, stringifiedWatchlist);
      toast.success('Coin added to watch list');
    },
    [coinsWatchlist]
  );

  const exchangesWatchlistInclude = useCallback(
    (exchangeId: string) => {
      let stringifiedWatchlist = '';

      if (exchangesWatchlist.includes(exchangeId)) {
        const filteredWatchList = exchangesWatchlist.filter(
          (id) => id !== exchangeId
        );

        stringifiedWatchlist = JSON.stringify({
          exchanges: filteredWatchList
        } as Watchlist);

        setExchangesWatchlist(filteredWatchList);
        localStorage.setItem(envs.watchlistStorageKey, stringifiedWatchlist);
        toast.success('Exchange removed from watch list');
        return;
      }

      stringifiedWatchlist = JSON.stringify({
        exchanges: [...exchangesWatchlist, exchangeId]
      } as Watchlist);

      setExchangesWatchlist((state) => [...state, exchangeId]);
      localStorage.setItem(envs.watchlistStorageKey, stringifiedWatchlist);
      toast.success('Exchange added to watch list');
    },
    [exchangesWatchlist]
  );

  const loadWatchlist = useCallback(() => {
    const stringifiedWatchlist = localStorage.getItem(envs.watchlistStorageKey);
    if (!stringifiedWatchlist) return;

    const watchlist: Watchlist = JSON.parse(stringifiedWatchlist);
    const { coins, exchanges } = watchlist;
    if (coins) setCoinsWatchlist(coins);
    if (exchanges) setExchangesWatchlist(exchanges);
  }, []);

  useEffect(loadWatchlist, [loadWatchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        coinsWatchlist,
        exchangesWatchlist,
        coinsWatchlistInclude,
        exchangesWatchlistInclude
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export { WatchlistContext, WatchlistProvider };

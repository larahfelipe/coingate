import { useCallback, useMemo, useState } from 'react';

const COINS_WATCHLIST_STORAGE_KEY = 'cryptogate:watchlist:coins';

/**
 *
 * @returns
 *
 * @example
 * const { coins, addCoin } = useWatchlist();
 */
export const useWatchlist = () => {
  const [coins, setCoins] = useState<string[]>(() => {
    const coinsWatchlistStr = localStorage.getItem(COINS_WATCHLIST_STORAGE_KEY);
    return coinsWatchlistStr ? JSON.parse(coinsWatchlistStr) : [];
  });

  const addCoin = useCallback((coinId: string) => {
    setCoins((state) => {
      const coins = state.includes(coinId)
        ? state.filter((c) => c !== coinId)
        : [...state, coinId];
      localStorage.setItem(COINS_WATCHLIST_STORAGE_KEY, JSON.stringify(coins));
      return coins;
    });
  }, []);

  return useMemo(() => ({ coins, addCoin }), [coins, addCoin]);
};

import { useCallback, useEffect, useMemo, useState } from 'react';

const COINS_WATCHLIST_STORAGE_KEY = 'cryptogate:watchlist:coins';

/**
 *
 * @returns
 *
 * @example
 * const { coins, addCoin } = useWatchlist();
 */
export const useWatchlist = () => {
  const [coins, setCoins] = useState<string[]>([]);

  const addCoin = useCallback((coinId: string) => {
    setCoins((state) => {
      const coins = state.includes(coinId)
        ? state.filter((c) => c !== coinId)
        : [...state, coinId];
      localStorage.setItem(COINS_WATCHLIST_STORAGE_KEY, JSON.stringify(coins));
      return coins;
    });
  }, []);

  useEffect(() => {
    const coinsWatchlistStr = localStorage.getItem(COINS_WATCHLIST_STORAGE_KEY);
    if (coinsWatchlistStr) setCoins(JSON.parse(coinsWatchlistStr));
  }, []);

  return useMemo(() => ({ coins, addCoin }), [coins, addCoin]);
};

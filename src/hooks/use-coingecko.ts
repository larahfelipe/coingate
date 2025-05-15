import {
  CoingeckoV3CoinResponseData,
  CoingeckoV3CoinsListResponseData,
} from '@/types';
import { useQuery } from '@tanstack/react-query';

export type Coin = {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  icon: string;
  price: string;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: string;
  volume24h: string;
  fullyDilutedValue: string;
  circulatingSupply: string;
  maxSupply: string;
};

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

const formatNumber = (num: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
    ...options,
  }).format(num);
};

export const useCoingecko = () => {
  const coinsQuery = useQuery({
    queryKey: ['coingecko/coins/markets'],
    queryFn: async () => {
      const params = new URLSearchParams({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '50',
        page: '1',
        price_change_percentage: '1h,24h,7d',
        // sparkline: 'true',
      });

      const res = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?${params.toString()}`,
      );
      if (!res.ok) throw new Error('Failed to fetch market data');

      const data: CoingeckoV3CoinsListResponseData[] = await res.json();

      return data.map<Coin>((coin) => ({
        id: coin.id,
        rank: coin.market_cap_rank,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        icon: coin.image,
        price: coin.current_price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
        priceChange1h: coin.price_change_percentage_1h_in_currency,
        priceChange24h: coin.price_change_percentage_24h_in_currency,
        priceChange7d: coin.price_change_percentage_7d_in_currency,
        marketCap: formatNumber(coin.market_cap),
        volume24h: formatNumber(coin.total_volume),
        fullyDilutedValue: formatNumber(coin.fully_diluted_valuation),
        circulatingSupply: formatNumber(coin.circulating_supply),
        maxSupply: formatNumber(coin.max_supply),
      }));
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
  });

  const useQueryCoinById = (coinId: string | undefined) =>
    useQuery({
      queryKey: ['coingecko/coin', coinId],
      queryFn: async () => {
        if (!coinId) throw new Error('Missing required param: coinId');

        const res = await fetch(`${COINGECKO_BASE_URL}/coins/${coinId}`);
        if (!res.ok) throw new Error('Failed to fetch coin');

        const data: CoingeckoV3CoinResponseData = await res.json();

        return data;
      },
      staleTime: Infinity,
      enabled: !!coinId,
    });

  return { coinsQuery, useQueryCoinById };
};

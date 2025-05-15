import { useQuery } from '@tanstack/react-query';

export type CoingeckoCoinsListResponseData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: string | number;
  last_updated: string;
  sparkline_in_7d: Record<'price', number[]>;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

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
  totalSupply: string;
};

const BASE_URL = 'https://api.coingecko.com/api/v3';

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

      const res = await fetch(`${BASE_URL}/coins/markets?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch market data');

      const data: CoingeckoCoinsListResponseData[] = await res.json();

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
        totalSupply: formatNumber(coin.total_supply),
      }));
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
  });

  return { coinsQuery };
};

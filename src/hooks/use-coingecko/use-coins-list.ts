import { useQuery } from '@tanstack/react-query';

import { COINGECKO_BASE_URL } from './constants';
import {
  type Coin,
  type CoingeckoV3CoinsListResponseData,
} from './use-coingecko.types';

export const useCoinsList = () => {
  const coinsQuery = useQuery({
    staleTime: 60 * 1_000,
    refetchInterval: 60 * 1_000,
    queryKey: ['coingecko:coins/markets'],
    queryFn: async () => {
      const requestParams = new URLSearchParams({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '50',
        page: '1',
        price_change_percentage: '1h,24h,7d',
      });

      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?${requestParams.toString()}`,
      );
      if (!response.ok) throw new Error('Failed to fetch market data');

      const responseData: CoingeckoV3CoinsListResponseData[] =
        await response.json();

      return responseData.map<Coin>((coin) => ({
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
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        fullyDilutedValue: coin.fully_diluted_valuation,
        circulatingSupply: coin.circulating_supply,
        maxSupply: coin.max_supply,
      }));
    },
  });

  return { coinsQuery };
};

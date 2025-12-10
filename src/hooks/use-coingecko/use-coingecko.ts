import { useQuery } from '@tanstack/react-query';

import { formatNumber } from '@/utils/formatters';
import {
  Coin,
  type CoingeckoV3CoinResponseData,
  type CoingeckoV3CoinsListResponseData,
} from './use-coingecko.types';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const useCoingecko = () => {
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
        marketCap: formatNumber(coin.market_cap),
        volume24h: formatNumber(coin.total_volume),
        fullyDilutedValue: formatNumber(coin.fully_diluted_valuation),
        circulatingSupply: formatNumber(coin.circulating_supply),
        maxSupply: formatNumber(coin.max_supply),
      }));
    },
  });

  const coinByIdQuery = (coinId: string) =>
    useQuery({
      enabled: !!coinId.length,
      staleTime: Infinity,
      queryKey: [`coingecko:coins/${coinId}`],
      queryFn: async () => {
        const requestParams = new URLSearchParams({
          sparkline: 'true',
        });

        const response = await fetch(
          `${COINGECKO_BASE_URL}/coins/${coinId}?${requestParams.toString()}`,
        );
        if (!response.ok) throw new Error('Failed to fetch coin');

        const responseData: CoingeckoV3CoinResponseData = await response.json();

        return responseData;
      },
    });

  return { coinsQuery, coinByIdQuery };
};

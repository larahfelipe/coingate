import { useQuery } from '@tanstack/react-query';

import { COINGECKO_BASE_URL } from './constants';
import { type CoingeckoV3CoinResponseData } from './use-coingecko.types';

export const useCoinDetails = () => {
  const coinByIdQuery = (coinId?: string) =>
    useQuery({
      enabled: !!coinId?.length,
      staleTime: Infinity,
      queryKey: [`coingecko:coins/${coinId}`],
      queryFn: async () => {
        if (!coinId?.length) return null;

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

  return { coinByIdQuery };
};

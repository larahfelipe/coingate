import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { getCoins, type Coin } from '../../api/coingecko';
import type { UseCoinsProps } from './types';

const useCoins = ({ desiredPage, coinId }: UseCoinsProps) => {
  const { data: coinsData, ...coinsState } = useQuery({
    queryKey: ['coins', desiredPage],
    queryFn: () => getCoins({ page: desiredPage, includeTimeSeries: true }),
    onError: () =>
      toast.error('Could not get the coins data. Please try again later'),
    keepPreviousData: true
  });

  const { data: coinData, ...coinState } = useQuery({
    queryKey: ['coin', coinId],
    queryFn: () => getCoins({ coinId }),
    onError: () =>
      toast.error(
        'Could not get the desired coin data. Please try again later'
      ),
    enabled: !!coinId
  });

  return {
    coinsState: coinId ? coinState : coinsState,
    coins: (coinId ? [coinData] : coinsData) as Coin[]
  };
};

export default useCoins;

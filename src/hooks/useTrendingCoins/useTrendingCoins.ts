import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL_MS } from '@/constants';

import { getTrendingCoinsInLast24h } from '../../api/coingecko';

const useTrendingCoins = () => {
  const { data: trendingCoins, ...trendingCoinsState } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingCoinsInLast24h,
    onError: () =>
      toast.error(
        'Could not get the trending coins data. Please try again later'
      ),
    refetchOnWindowFocus: false,
    refetchInterval: REFETCH_INTERVAL_MS
  });

  return {
    trendingCoinsState,
    trendingCoins
  };
};

export default useTrendingCoins;

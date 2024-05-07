import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { getTrendingCoinsInLast24h } from '../../api/coingecko';

const useTrendingCoins = () => {
  const { data: trendingCoins, ...trendingCoinsState } = useQuery({
    queryKey: ['trend'],
    queryFn: getTrendingCoinsInLast24h,
    onError: () =>
      toast.error(
        'Could not get the trending coins data. Please try again later'
      ),
    keepPreviousData: true
  });

  return {
    trendingCoinsState,
    trendingCoins
  };
};

export default useTrendingCoins;

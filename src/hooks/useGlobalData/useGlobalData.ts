import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL_MS } from '@/constants';

import { getCoins, getGlobalData } from '../../api/coingecko';

const useGlobalData = () => {
  const { data: globalData, isLoading: isGlobalDataLoading } = useQuery({
    queryKey: ['globalData'],
    queryFn: getGlobalData,
    onError: () =>
      toast.error(
        'Could not get the global market data. Please try again later'
      ),
    refetchOnWindowFocus: false,
    refetchInterval: REFETCH_INTERVAL_MS
  });

  const { data: coinsData, isLoading: isCoinsLoading } = useQuery({
    queryKey: ['coins'],
    queryFn: () => getCoins({ perPage: 100 }),
    onError: () =>
      toast.error('Could not get the coins data. Please try again later'),
    refetchOnWindowFocus: false
  });

  const getTotalMarketCap = () => {
    if (!coinsData) return 0;

    const totalMarketCap = Object.values(coinsData).reduce((acc, curr) => {
      if (!curr.current_price || !curr.circulating_supply) return acc;

      return acc + curr.current_price * curr.circulating_supply;
    }, 0);

    return totalMarketCap;
  };

  const getTotalMarketCapChangePercentage = () =>
    globalData?.market_cap_change_percentage_24h_usd ?? 0;

  const getTotalMarketVolume = () => {
    if (!coinsData) return 0;

    const totalMarketVolume = Object.values(coinsData).reduce(
      (acc, curr) => acc + curr.total_volume,
      0
    );

    return totalMarketVolume;
  };

  const getBTCMarketCapPercentage = () =>
    globalData?.market_cap_percentage.btc ?? 0;

  const getTotalActiveCryptocurrencies = () =>
    globalData?.active_cryptocurrencies ?? 0;

  return {
    isLoading: isGlobalDataLoading || isCoinsLoading,
    getTotalMarketCap,
    getTotalMarketCapChangePercentage,
    getTotalMarketVolume,
    getBTCMarketCapPercentage,
    getTotalActiveCryptocurrencies
  };
};

export default useGlobalData;

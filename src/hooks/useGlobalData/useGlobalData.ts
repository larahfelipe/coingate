import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL_MS } from '@/constants';

import { useCoinGeckoApi } from '../';

const useGlobalData = () => {
  const { getGlobalData, getCoins } = useCoinGeckoApi();

  const { data: globalData, isLoading: isGlobalDataLoading } = useQuery({
    queryKey: ['globalData'],
    queryFn: getGlobalData,
    refetchOnWindowFocus: false,
    refetchInterval: REFETCH_INTERVAL_MS
  });

  const { data: coinsData, isLoading: isCoinsLoading } = useQuery({
    queryKey: ['coins'],
    queryFn: () => getCoins({ total: 100 }),
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

  const getTotalMarketCapChangePercentage = () => {
    if (!globalData) return 0;

    return globalData.market_cap_change_percentage_24h_usd;
  };

  const getTotalMarketVolume = () => {
    if (!coinsData) return 0;

    const totalMarketVolume = Object.values(coinsData).reduce(
      (acc, curr) => acc + curr.total_volume,
      0
    );

    return totalMarketVolume;
  };

  const getBTCMarketCapPercentage = () => {
    if (!globalData) return 0;

    return globalData.market_cap_percentage.btc;
  };

  const getTotalActiveCryptocurrencies = () => {
    if (!globalData) return 0;

    return globalData.active_cryptocurrencies;
  };

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

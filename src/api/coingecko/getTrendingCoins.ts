import { api } from '@/lib';

export type TrendingCoin = {
  item: {
    id: string;
    coin_id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    score: number;
    thumb: string;
    price_btc: number;
  };
};

type TrendingData = {
  coins: Array<TrendingCoin>;
};

export const getTrendingCoinsInLast24h = async () => {
  const { data } = await api.get<TrendingData>('/search/trending');

  return data?.coins;
};

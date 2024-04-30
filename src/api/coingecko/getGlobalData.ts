import { api } from '@/lib';

export type GlobalData = {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: {
      btc: number;
    };
  };
};

export const getGlobalData = async () => {
  const { data } = await api.get<GlobalData>('/global');

  return data?.data;
};

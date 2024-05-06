import { TOTAL_ITEMS_PER_PAGE } from '@/common';
import { api } from '@/lib';

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number;
  circulating_supply: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  sparkline_in_7d: {
    price: Array<number>;
  };
};

export type GetCoinsParams = Partial<{
  coinId?: string;
  page: number;
  perPage: number;
  includeTimeSeries: boolean;
}>;

type GetCoinsResponse = Coin[] | Coin;

export const getCoins = async ({
  coinId,
  page = 1,
  perPage = TOTAL_ITEMS_PER_PAGE,
  includeTimeSeries = false
}: GetCoinsParams): Promise<GetCoinsResponse> => {
  let url = `/coins/markets?vs_currency=usd&page=${page}
    &per_page=${perPage}`;

  if (coinId) url = `/coins/${coinId}`;

  if (includeTimeSeries)
    url += '&price_change_percentage=24h,7d,30d&sparkline=true';

  const { data } = await api.get<GetCoinsResponse>(url);

  return data;
};

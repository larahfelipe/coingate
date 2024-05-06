import { TOTAL_ITEMS_PER_PAGE } from '@/common';
import { api } from '@/lib';

import type { GetCoinsParams } from './getCoins';

export type Exchange = {
  id: string;
  name: string;
  year_established: number;
  url: string;
  image: string;
  country: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
};

type GetExchangesParams = Omit<
  GetCoinsParams,
  'coinId' | 'includeTimeSeries'
> & {
  exchangeId?: string;
};

type GetExchangesResponse = Exchange[] | Exchange;

export const getExchanges = async ({
  exchangeId,
  page = 1,
  perPage = TOTAL_ITEMS_PER_PAGE
}: GetExchangesParams): Promise<GetExchangesResponse> => {
  let url = `/exchanges?page=${page}&per_page=${perPage}`;

  if (exchangeId) url = `/exchanges/${exchangeId}`;

  const { data } = await api.get<GetExchangesResponse>(url);

  return data;
};

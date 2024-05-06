import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { getExchanges, type Exchange } from '../../api/coingecko';
import type { UseExchangesProps } from './types';

const useExchanges = ({ desiredPage, exchangeId }: UseExchangesProps) => {
  const { data: exchangesData, ...exchangesState } = useQuery({
    queryKey: ['exchanges', desiredPage],
    queryFn: () => getExchanges({ page: desiredPage }),
    onError: () =>
      toast.error('Could not get exchanges data. Please try again later'),
    keepPreviousData: true
  });

  const { data: exchangeData, ...exchangeState } = useQuery({
    queryKey: ['exchange', exchangeId],
    queryFn: () => getExchanges({ exchangeId }),
    onError: () =>
      toast.error(
        'Could not get the desired exchange data. Please try again later'
      ),
    enabled: !!exchangeId
  });

  return {
    exchangesState: exchangeId ? exchangeState : exchangesState,
    exchanges: (exchangeId ? [exchangeData] : exchangesData) as Exchange[]
  };
};

export default useExchanges;

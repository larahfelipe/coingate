import { QueryClient } from '@tanstack/react-query';

import { REFETCH_INTERVAL_MS, RETRY_ATTEMPTS_TIMEOUT_MS } from '@/common';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: REFETCH_INTERVAL_MS,
      cacheTime: REFETCH_INTERVAL_MS,
      retryDelay: (attemptIdx) =>
        Math.min(1_000 * 10 ** attemptIdx, RETRY_ATTEMPTS_TIMEOUT_MS)
    }
  }
});

export default queryClient;

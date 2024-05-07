import { useContext } from 'react';

import { WatchlistContext } from '@/providers/WatchlistProvider';

const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  return context;
};

export default useWatchlist;

import type { HTMLMotionProps } from 'framer-motion';

export const TABS = {
  Coins: 'coins',
  Exchanges: 'exchanges'
};

export const M_PROPS: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export const COINS_TABLE_HEADERS = [
  '',
  '#',
  'Coin',
  'Price',
  '24h',
  '30d',
  'Market Capitalization',
  'Volume (24h)',
  'Circulating Supply',
  'Last 7 Days'
];

export const EXCHANGES_TABLE_HEADERS = [
  '',
  '#',
  'Exchange',
  'Country Est.',
  'Year Est.',
  'Trust Score',
  'Volume (24h)',
  'Website'
];

export const MOBILE_VW = 768;

export const TOTAL_ITEMS_PER_PAGE = 20;

export const RETRY_ATTEMPTS_TIMEOUT_MS = 1_000 * 60; // 1min

export const REFETCH_INTERVAL_MS = 1_000 * 60 * 5; // 5min

export const DEBOUNCE_INTERVAL_MS = 1_000; // 1s

export const UNKNOWN_VALUE_CHAR = '-';

export const DEFAULT_SPARKLINE_DATA = [1, 1];

import type { AppTab } from '@/hooks/useTabs/types';

export type HeaderProps = {
  tab: AppTab;
  onChangeTab: (tab: AppTab) => void;
};

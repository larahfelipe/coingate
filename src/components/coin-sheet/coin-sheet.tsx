import { type FC } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useCoinDetails } from '@/hooks/use-coingecko';

import { CoinSheetAboutTab } from './coin-sheet-about-tab';
import { CoinSheetHeader } from './coin-sheet-header';
import { CoinSheetOverviewTab } from './coin-sheet-overview-tab';
import { CoinSheetPriceChart } from './coin-sheet-price-chart';
import { CoinSheetSentimentCard } from './coin-sheet-sentiment-card';
import { CoinSheetStatsTab } from './coin-sheet-stats-tab';

type CoinSheetProps = {
  opened: boolean;
  coinId: string | undefined;
  onClose: VoidFunction;
};

const CoinSheetTabs = {
  Overview: { value: 'overview', label: 'Overview' },
  Stats: { value: 'stats', label: 'Statistics' },
  About: { value: 'about', label: 'About' },
} as const;

export const CoinSheet: FC<CoinSheetProps> = ({ opened, coinId, onClose }) => {
  const coinDetailsQuery = useCoinDetails(coinId);

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetDescription className="sr-only">
        {coinDetailsQuery.data?.name ?? 'Loading'} coin sheet
      </SheetDescription>

      <SheetContent className="w-full sm:w-[500px] overflow-y-auto p-0 sm:max-w-[500px]">
        {coinDetailsQuery.isLoading || !coinDetailsQuery.data ? (
          <CoinSheetSkeleton />
        ) : (
          <>
            <CoinSheetHeader coinData={coinDetailsQuery.data} />

            <div className="p-4 space-y-4">
              <CoinSheetPriceChart
                priceData={coinDetailsQuery.data.market_data.sparkline_7d.price}
              />

              <Tabs defaultValue={CoinSheetTabs.Overview.value}>
                <TabsList className="w-full">
                  {Object.values(CoinSheetTabs).map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="text-xs"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="space-y-4 mt-4">
                  <TabsContent
                    value={CoinSheetTabs.Overview.value}
                    className="space-y-4"
                  >
                    <CoinSheetOverviewTab coinData={coinDetailsQuery.data} />
                  </TabsContent>

                  <TabsContent
                    value={CoinSheetTabs.Stats.value}
                    className="space-y-4"
                  >
                    <CoinSheetStatsTab coinData={coinDetailsQuery.data} />
                  </TabsContent>

                  <TabsContent value={CoinSheetTabs.About.value}>
                    <CoinSheetAboutTab coinData={coinDetailsQuery.data} />
                  </TabsContent>
                </div>
              </Tabs>

              <CoinSheetSentimentCard coinData={coinDetailsQuery.data} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

const CoinSheetSkeleton: FC = () => (
  <>
    <div className="p-4 space-y-5 border-b">
      <div className="flex items-center gap-5 mt-1">
        <Skeleton className="size-14 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />

          <Skeleton className="h-3 w-22" />
        </div>
      </div>

      <Skeleton className="h-16 rounded-xl" />
    </div>

    <div className="p-4 space-y-5">
      <Skeleton className="h-50 w-full rounded-xl" />

      <Skeleton className="h-9 w-full rounded-xl" />

      <div className="space-y-3 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between gap-3">
            <Skeleton className="h-19.5 w-1/2" />

            <Skeleton className="h-19.5 w-1/2" />
          </div>
        ))}
      </div>

      <Skeleton className="h-4 w-1/3" />

      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex justify-between gap-3">
            <Skeleton className="h-16 w-1/3" />

            <Skeleton className="h-16 w-1/3" />

            <Skeleton className="h-16 w-1/3" />
          </div>
        ))}
      </div>

      <Skeleton className="h-4 w-1/3" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-3 w-full" />

            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>

      <Skeleton className="h-28 w-full" />
    </div>
  </>
);

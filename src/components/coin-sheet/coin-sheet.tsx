import { type FC } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
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

  if (coinDetailsQuery.isLoading || !coinDetailsQuery.data) return null;

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetDescription className="sr-only">
        {coinDetailsQuery.data.name} coin sheet
      </SheetDescription>

      <SheetContent className="w-full sm:w-[500px] overflow-y-auto p-0 sm:max-w-[500px]">
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
      </SheetContent>
    </Sheet>
  );
};

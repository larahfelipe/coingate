import { type FC } from 'react';

import { CoinSheetAboutTab } from '@/components/coin-sheet/coin-sheet-about-tab';
import { CoinSheetHeader } from '@/components/coin-sheet/coin-sheet-header';
import { CoinSheetOverviewTab } from '@/components/coin-sheet/coin-sheet-overview-tab';
import { CoinSheetPriceChart } from '@/components/coin-sheet/coin-sheet-price-chart';
import { CoinSheetSentimentCard } from '@/components/coin-sheet/coin-sheet-sentiment-card';
import { CoinSheetStatsTab } from '@/components/coin-sheet/coin-sheet-stats-tab';
import {
  Sheet,
  SheetContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useCoingecko } from '@/hooks/use-coingecko';

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
  const { useQueryCoinById } = useCoingecko();
  const { isLoading, data: coinData } = useQueryCoinById(coinId);

  if (isLoading || !coinId || !coinData) return null;

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[600px] overflow-y-auto border-l border-slate-700/40 bg-slate-950 p-0">
        <CoinSheetHeader coinData={coinData} />

        <div className="p-4 space-y-4">
          <CoinSheetPriceChart
            priceData={coinData.market_data.sparkline_7d.price}
          />

          <Tabs defaultValue={CoinSheetTabs.Overview.value}>
            <TabsList className="w-full p-1 bg-slate-800/20">
              {Object.values(CoinSheetTabs).map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
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
                <CoinSheetOverviewTab coinData={coinData} />
              </TabsContent>

              <TabsContent
                value={CoinSheetTabs.Stats.value}
                className="space-y-4"
              >
                <CoinSheetStatsTab coinData={coinData} />
              </TabsContent>

              <TabsContent value={CoinSheetTabs.About.value}>
                <CoinSheetAboutTab coinData={coinData} />
              </TabsContent>
            </div>
          </Tabs>

          <CoinSheetSentimentCard coinData={coinData} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

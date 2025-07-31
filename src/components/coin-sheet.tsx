import {
  Badge,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useCoingecko } from '@/hooks/use-coingecko';
import { cn } from '@/lib/utils';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Info,
  Layers,
  LineChart,
  Star,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

type CoinSheetProps = {
  opened: boolean;
  coinId: string | undefined;
  onClose: VoidFunction;
};

export const CoinSheet: FC<CoinSheetProps> = ({ opened, coinId, onClose }) => {
  const { useQueryCoinById } = useCoingecko();
  const { isLoading, data: coinData } = useQueryCoinById(coinId);

  if (isLoading || !coinId || !coinData) return null;

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[520px] overflow-y-auto border-l border-slate-700/30 bg-slate-950 p-0">
        <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-700/20 p-6 pb-4">
          <SheetHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-sm"></div>
                  <Image
                    src={coinData.image.large}
                    alt={coinData.name}
                    width={48}
                    height={48}
                    className="rounded-full relative z-10 ring-2 ring-indigo-400/30"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-white">
                      {coinData.name}
                    </h2>
                    <Badge
                      variant="outline"
                      className="uppercase text-xs font-medium py-0 h-5 border-slate-600/30 bg-slate-800/20 text-slate-200"
                    >
                      {coinData.symbol}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Rank #{coinData.market_cap_rank}
                  </p>
                </div>
              </SheetTitle>
              <a
                href={coinData.links?.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 transition-colors p-2 rounded-lg hover:bg-slate-800/20"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </SheetHeader>
          <div className="mt-4 mb-2 p-4 rounded-xl bg-gradient-to-r from-slate-800/20 to-slate-700/20 border border-slate-600/20">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-white">
                ${coinData.market_data.current_price.usd.toLocaleString()}
              </h2>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md bg-black/20 ${getPriceChangeColor(coinData.market_data.price_change_percentage_24h)}`}
              >
                <PriceChangeIcon
                  value={coinData.market_data.price_change_percentage_24h}
                />
                <span className="font-medium">
                  {Math.abs(
                    coinData.market_data.price_change_percentage_24h,
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-2">
          <section className="bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-xl p-5 mb-6 shadow-lg border border-slate-600/30 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <h3 className="text-sm font-medium text-slate-200 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                Price Chart
              </h3>
            </div>

            <div className="h-32 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded-lg border border-blue-600/20 flex items-center justify-center">
              <span className="text-slate-400 text-sm">
                Chart visualization area
              </span>
            </div>
          </section>
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="w-full bg-gradient-to-r from-slate-800/30 to-slate-700/30 p-1 border border-slate-600/20">
              <TabsTrigger
                value="overview"
                className="text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Stats
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <InfoCard
                  title="Market Cap"
                  value={`$${(coinData.market_data.market_cap.usd / 1e9).toFixed(2)}B`}
                  icon={<Layers className="h-4 w-4 text-cyan-400" />}
                />
                <InfoCard
                  title="Volume (24h)"
                  value={`$${(coinData.market_data.total_volume.usd / 1e9).toFixed(2)}B`}
                  icon={<Activity className="h-4 w-4 text-purple-400" />}
                />
                <InfoCard
                  title="Circulating Supply"
                  value={`${(coinData.market_data.circulating_supply / 1e6).toFixed(2)}M`}
                  icon={<LineChart className="h-4 w-4 text-emerald-400" />}
                />
                <InfoCard
                  title="Max Supply"
                  value={
                    coinData.market_data.max_supply
                      ? `${(coinData.market_data.max_supply / 1e6).toFixed(2)}M`
                      : 'Unlimited'
                  }
                  icon={<TrendingUp className="h-4 w-4 text-amber-400" />}
                />
              </div>
              <div className="bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-xl p-5 border border-slate-600/30 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-slate-200 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  Price Change
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <PriceChangeCard
                    title="24h"
                    value={coinData.market_data.price_change_percentage_24h}
                  />
                  <PriceChangeCard
                    title="7d"
                    value={coinData.market_data.price_change_percentage_7d}
                  />
                  <PriceChangeCard
                    title="30d"
                    value={coinData.market_data.price_change_percentage_30d}
                  />
                  <PriceChangeCard
                    title="1y"
                    value={coinData.market_data.price_change_percentage_1y}
                  />
                  <PriceChangeCard
                    title="ATH"
                    value={
                      (coinData.market_data.current_price.usd /
                        coinData.market_data.ath.usd -
                        1) *
                      100
                    }
                  />
                  <PriceChangeCard
                    title="ATL"
                    value={
                      (coinData.market_data.current_price.usd /
                        coinData.market_data.atl.usd -
                        1) *
                      100
                    }
                  />
                </div>
              </div>
              {coinData.categories?.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-slate-200 mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {coinData.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 text-slate-200 border-slate-600/30 hover:border-slate-400/50 transition-colors"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="stats" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-xl p-5 border border-slate-600/30 backdrop-blur-sm">
                  <h3 className="text-sm font-medium text-slate-200 mb-4 flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-blue-400" />
                    Price Statistics
                  </h3>
                  <StatItem
                    title="All Time High"
                    value={`$${coinData.market_data.ath.usd.toLocaleString()}`}
                  />
                  <StatItem
                    title="All Time Low"
                    value={`$${coinData.market_data.atl.usd.toLocaleString()}`}
                  />
                  <StatItem
                    title="24h High"
                    value={`$${coinData.market_data.high_24h.usd.toLocaleString()}`}
                  />
                  <StatItem
                    title="24h Low"
                    value={`$${coinData.market_data.low_24h.usd.toLocaleString()}`}
                  />
                </div>
                <div className="bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-xl p-5 border border-slate-600/30 backdrop-blur-sm">
                  <h3 className="text-sm font-medium text-slate-200 mb-4 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-400" />
                    Community & Development
                  </h3>
                  <StatItem
                    title="Twitter Followers"
                    value={coinData.community_data.twitter_followers?.toLocaleString()}
                  />
                  <StatItem
                    title="Reddit Subscribers"
                    value={coinData.community_data.reddit_subscribers?.toLocaleString()}
                  />
                  <StatItem
                    title="GitHub Stars"
                    value={coinData.developer_data.stars?.toLocaleString()}
                  />
                  <StatItem
                    title="Commit Count (4w)"
                    value={coinData.developer_data.commit_count_4_weeks?.toLocaleString()}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <div className="bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20 rounded-xl p-5 border border-indigo-700/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-medium text-slate-200">
                    About {coinData.name}
                  </h3>
                </div>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {coinData.description.en || 'No description available.'}
                </div>
                {coinData.links && (
                  <div className="mt-5 pt-4 border-t border-indigo-700/20">
                    <h4 className="text-sm font-medium text-slate-200 mb-3">
                      Links
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {coinData.links.homepage[0] && (
                        <a
                          href={coinData.links.homepage[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-900/20 px-3 py-2 rounded-md border border-cyan-700/30 hover:border-cyan-500/50 transition-all"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Website
                        </a>
                      )}
                      {coinData.links.blockchain_site?.[0] && (
                        <a
                          href={coinData.links.blockchain_site[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 bg-purple-900/20 px-3 py-2 rounded-md border border-purple-700/30 hover:border-purple-500/50 transition-all"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Explorer
                        </a>
                      )}
                      {coinData.links.repos_url?.github?.[0] && (
                        <a
                          href={coinData.links.repos_url.github[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-900/20 px-3 py-2 rounded-md border border-indigo-700/30 hover:border-indigo-500/50 transition-all"
                        >
                          <ExternalLink className="h-3 w-3" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <section className="bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-xl p-5 border border-slate-600/30 backdrop-blur-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-medium text-slate-200">
                Community Sentiment
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gradient-to-r from-rose-900/40 to-emerald-900/40 rounded-full h-3 overflow-hidden border border-slate-600/20">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full shadow-lg"
                  style={{ width: `${75}%` }}
                />
              </div>
              <span className="text-emerald-400 text-sm font-medium bg-emerald-900/20 px-2 py-1 rounded-md">
                75%
              </span>
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-400">
              <span>Bearish</span>
              <span>Bullish</span>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const StatItem: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-600/20 last:border-0 hover:bg-slate-800/10 px-2 rounded transition-colors">
    <span className="text-slate-300 text-sm">{title}</span>
    <span className="text-sm font-medium text-white">{value}</span>
  </div>
);

const InfoCard: FC<{
  title: string;
  value: string;
  icon: ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm flex flex-col gap-2 hover:border-slate-500/40 transition-all">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-slate-300 text-xs">{title}</span>
    </div>
    <span className="font-semibold text-white text-lg">{value}</span>
  </div>
);

const getPriceChangeColor = (value: number) => {
  if (value > 0) return 'text-emerald-400';
  if (value < 0) return 'text-rose-400';
  return 'text-slate-400';
};

const PriceChangeIcon: FC<Record<'value', number>> = ({ value }) => {
  if (value > 0)
    return (
      <ArrowUpRight className={cn('size-4', getPriceChangeColor(value))} />
    );

  if (value < 0)
    return (
      <ArrowDownRight className={cn('size-4', getPriceChangeColor(value))} />
    );

  return null;
};

const PriceChangeCard: FC<{ title: string; value: number }> = ({
  title,
  value,
}) => {
  const colorClass =
    value > 0
      ? 'text-emerald-400 border-emerald-700/30 bg-emerald-900/20'
      : 'text-rose-400 border-rose-700/30 bg-rose-900/20';

  return (
    <div
      className={cn(
        'rounded-lg p-3 border backdrop-blur-sm flex flex-col hover:border-opacity-60 transition-all',
        colorClass,
      )}
    >
      <div className="flex justify-between items-center text-slate-300 text-xs mb-2">
        {title}
        <PriceChangeIcon value={value} />
      </div>
      <span className="font-medium text-sm">
        {value.toLocaleString('en-US', {
          maximumSignificantDigits: 2,
          maximumFractionDigits: 2,
        })}
        %
      </span>
    </div>
  );
};

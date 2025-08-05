import { type FC } from 'react';

import { Activity, LineChart } from 'lucide-react';

import { type CoingeckoV3CoinResponseData } from '@/types';
import { formatNumber } from '@/utils/formatters';

type CoinSheetStatsTabProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetStatsTab: FC<CoinSheetStatsTabProps> = ({ coinData }) => (
  <>
    <PriceStatsSection marketData={coinData.market_data} />

    <CommunityStatsSection
      communityData={coinData.community_data}
      developerData={coinData.developer_data}
    />
  </>
);

const PriceStatsSection: FC<
  Record<'marketData', CoinSheetStatsTabProps['coinData']['market_data']>
> = ({ marketData }) => (
  <section className="bg-slate-800/20 rounded-xl p-5 border backdrop-blur-sm mb-4">
    <h3 className="text-sm text-slate-200 flex items-center gap-2 mb-4">
      <LineChart className="size-4 text-blue-400" />
      Price Statistics
    </h3>

    <StatItem
      title="All Time High"
      value={`$${formatNumber(marketData.ath.usd)}`}
    />

    <StatItem
      title="All Time Low"
      value={`$${formatNumber(marketData.atl.usd)}`}
    />

    <StatItem
      title="24h High"
      value={`$${formatNumber(marketData.high_24h.usd)}`}
    />

    <StatItem
      title="24h Low"
      value={`$${formatNumber(marketData.low_24h.usd)}`}
    />
  </section>
);

const CommunityStatsSection: FC<{
  communityData: CoinSheetStatsTabProps['coinData']['community_data'];
  developerData: CoinSheetStatsTabProps['coinData']['developer_data'];
}> = ({ communityData, developerData }) => (
  <section className="bg-slate-800/20 rounded-xl p-5 border backdrop-blur-sm">
    <h3 className="text-sm text-slate-200 flex items-center gap-2 mb-4">
      <Activity className="size-4 text-purple-400" />
      Community & Development
    </h3>

    <StatItem
      title="Twitter Followers"
      value={communityData.twitter_followers?.toLocaleString() || 'N/A'}
    />

    <StatItem
      title="Reddit Subscribers"
      value={communityData.reddit_subscribers?.toLocaleString() || 'N/A'}
    />

    <StatItem
      title="GitHub Stars"
      value={developerData.stars?.toLocaleString() || 'N/A'}
    />

    <StatItem
      title="Commit Count (4w)"
      value={developerData.commit_count_4_weeks?.toLocaleString() || 'N/A'}
    />
  </section>
);

const StatItem: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-600/20 last:border-0 hover:bg-slate-800/10 px-2 rounded transition-colors">
    <span className="text-slate-300 text-sm">{title}</span>

    <span className="text-sm font-medium text-white">{value}</span>
  </div>
);

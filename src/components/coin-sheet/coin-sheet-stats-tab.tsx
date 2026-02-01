import { type FC } from 'react';

import { Activity, LineChart } from 'lucide-react';

import { type CoingeckoV3CoinResponseData } from '@/types';

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
  <section className="bg-card rounded-xl p-5 border mb-4 text-card-foreground">
    <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
      <LineChart className="size-4 text-primary" />
      Price Statistics
    </h3>

    <StatItem title="All Time High" value={marketData.ath.usd} />

    <StatItem title="All Time Low" value={marketData.atl.usd} />

    <StatItem title="24h High" value={marketData.high_24h.usd} />

    <StatItem title="24h Low" value={marketData.low_24h.usd} />
  </section>
);

const CommunityStatsSection: FC<{
  communityData: CoinSheetStatsTabProps['coinData']['community_data'];
  developerData: CoinSheetStatsTabProps['coinData']['developer_data'];
}> = ({ communityData, developerData }) => (
  <section className="bg-card rounded-xl p-5 border text-card-foreground">
    <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
      <Activity className="size-4 text-primary" />
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

const StatItem: FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-accent/50 px-2 rounded transition-colors">
    <span className="text-muted-foreground text-sm">{title}</span>

    <span className="text-sm font-medium">
      {typeof value === 'number'
        ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : value}
    </span>
  </div>
);

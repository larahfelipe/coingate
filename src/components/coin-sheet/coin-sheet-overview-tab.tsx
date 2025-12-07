import { type FC, type ReactNode } from 'react';

import { ActivityIcon, MoneyWavy } from '@phosphor-icons/react';
import { Layers, Percent, PieChart } from 'lucide-react';

import { PriceChangeIcon } from '@/components/price-change-icon';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { type CoingeckoV3CoinResponseData } from '@/types';
import { formatNumber } from '@/utils/formatters';

type CoinSheetOverviewTabProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetOverviewTab: FC<CoinSheetOverviewTabProps> = ({
  coinData,
}) => (
  <>
    <MarketInfoGridCard marketData={coinData.market_data} />

    <PriceChangeGridCard marketData={coinData.market_data} />

    <CategoriesSection categories={coinData.categories} />
  </>
);

const MarketInfoGridCard: FC<
  Record<'marketData', CoinSheetOverviewTabProps['coinData']['market_data']>
> = ({ marketData }) => (
  <div className="grid grid-cols-2 gap-3">
    <MarketInfoCard
      title="Market cap."
      value={`$${formatNumber(marketData.market_cap.usd)}`}
      icon={<MoneyWavy className="size-4 text-cyan-400" />}
    />

    <MarketInfoCard
      title="Volume (24h)"
      value={`$${formatNumber(marketData.total_volume.usd)}`}
      icon={<ActivityIcon className="size-4 text-purple-400" />}
    />

    <MarketInfoCard
      title="Circ. supply"
      value={formatNumber(marketData.circulating_supply)}
      icon={<PieChart className="size-4 text-emerald-400" />}
    />

    <MarketInfoCard
      title="Max. supply"
      value={
        marketData.max_supply
          ? formatNumber(marketData.max_supply)
          : 'Unlimited'
      }
      icon={<Layers className="size-4 text-amber-400" />}
    />
  </div>
);

const PriceChangeGridCard: FC<
  Record<'marketData', CoinSheetOverviewTabProps['coinData']['market_data']>
> = ({ marketData }) => (
  <section>
    <h3 className="text-sm text-slate-200 flex items-center gap-2 mb-3">
      <Percent className="size-4 text-blue-400" />
      Price Change
    </h3>

    <div className="grid grid-cols-3 gap-3">
      <PriceChangeCard
        title="24h"
        value={marketData.price_change_percentage_24h}
      />

      <PriceChangeCard
        title="7d"
        value={marketData.price_change_percentage_7d}
      />

      <PriceChangeCard
        title="30d"
        value={marketData.price_change_percentage_30d}
      />

      <PriceChangeCard
        title="1y"
        value={marketData.price_change_percentage_1y}
      />

      <PriceChangeCard
        title="ATH"
        value={(marketData.current_price.usd / marketData.ath.usd - 1) * 100}
      />

      <PriceChangeCard
        title="ATL"
        value={(marketData.current_price.usd / marketData.atl.usd - 1) * 100}
      />
    </div>
  </section>
);

const CategoriesSection: FC<{ categories?: string[] }> = ({ categories }) => {
  if (!categories?.length) return null;

  return (
    <section>
      <h3 className="text-sm text-slate-200 mb-3">Categories</h3>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="bg-slate-800/20 text-slate-200 hover:border-slate-400/50 transition-colors"
          >
            {category}
          </Badge>
        ))}
      </div>
    </section>
  );
};

const MarketInfoCard: FC<{
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

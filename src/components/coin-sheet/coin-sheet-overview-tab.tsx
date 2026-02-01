import { type FC, type ReactNode } from 'react';

import { ActivityIcon, Bank, MoneyWavy } from '@phosphor-icons/react';
import { Layers, Percent, PieChart } from 'lucide-react';

import {
  getPriceChangeColor,
  PriceChangeIcon,
} from '@/components/shared/price-change-icon';
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
    <MarketInfoGridCard marketData={coinData.market_data} coinData={coinData} />

    <PriceChangeGridCard marketData={coinData.market_data} />

    <CategoriesSection categories={coinData.categories} />
  </>
);

const MarketInfoGridCard: FC<{
  marketData: CoinSheetOverviewTabProps['coinData']['market_data'];
  coinData: CoinSheetOverviewTabProps['coinData'];
}> = ({ marketData, coinData }) => (
  <div className="grid grid-cols-2 gap-3">
    <MarketInfoCard
      icon={<MoneyWavy className="size-4 text-cyan-400" />}
      title="Market cap."
      value={formatNumber(marketData.market_cap.usd)}
    />

    <MarketInfoCard
      icon={<ActivityIcon className="size-4 text-purple-400" />}
      title="Volume (24h)"
      value={formatNumber(marketData.total_volume.usd)}
    />

    <MarketInfoCard
      icon={<Bank className="size-4 text-orange-400" />}
      title="Fully-diluted value"
      value={formatNumber(marketData.current_price.usd * marketData.max_supply)}
    />

    <MarketInfoCard
      icon={<Percent className="size-4 text-red-400" />}
      title="Volume/Market cap."
      value={(
        marketData.total_volume.usd / marketData.market_cap.usd
      ).toLocaleString('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    />

    <MarketInfoCard
      icon={<PieChart className="size-4 text-emerald-400" />}
      title="Circ. supply"
      value={
        formatNumber(marketData.circulating_supply) +
        ' ' +
        coinData.symbol.toUpperCase()
      }
    />

    <MarketInfoCard
      icon={<Layers className="size-4 text-amber-400" />}
      title="Max. supply"
      value={
        marketData.max_supply
          ? formatNumber(marketData.max_supply) +
            ' ' +
            coinData.symbol.toUpperCase()
          : 'Unlimited'
      }
    />
  </div>
);

const PriceChangeGridCard: FC<
  Record<'marketData', CoinSheetOverviewTabProps['coinData']['market_data']>
> = ({ marketData }) => (
  <section>
    <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
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
      <h3 className="text-sm font-medium mb-3">Categories</h3>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="hover:bg-secondary/80 transition-colors font-normal"
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
  value: string | number;
  icon: ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-card rounded-lg p-3 border flex flex-col gap-2 hover:bg-accent/50 transition-colors">
    <div className="flex items-center gap-2">
      {icon}

      <span className="text-xs text-muted-foreground font-medium">{title}</span>
    </div>

    <span className="font-semibold text-lg">{value}</span>
  </div>
);

const PriceChangeCard: FC<{ title: string; value: number }> = ({
  title,
  value,
}) => (
  <div className="rounded-lg p-3 border bg-card flex flex-col hover:bg-accent/50 transition-colors">
    <div className="flex justify-between items-center text-muted-foreground text-xs font-medium mb-2">
      {title}

      <PriceChangeIcon value={value} />
    </div>

    <span className={cn('font-medium text-sm', getPriceChangeColor(value))}>
      {value.toLocaleString('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}
      %
    </span>
  </div>
);

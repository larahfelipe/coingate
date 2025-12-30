import { type FC } from 'react';

import Image from 'next/image';

import { X } from 'lucide-react';

import { ExternalLinkBtn } from '@/components/shared/external-link-btn';
import { PriceChangeIcon } from '@/components/shared/price-change-icon';
import { Badge, SheetClose, SheetHeader, SheetTitle } from '@/components/ui';
import { type CoingeckoV3CoinResponseData } from '@/types';

type CoinSheetHeaderProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetHeader: FC<CoinSheetHeaderProps> = ({ coinData }) => (
  <header className="sticky top-0 z-10 space-y-1 bg-background/95 backdrop-blur-sm border-b p-4">
    <SheetHeader>
      <div className="flex items-center justify-between">
        <SheetTitle className="flex items-center gap-5">
          <CoinImage src={coinData.image.large} alt={coinData.name} />

          <CoinInfo
            name={coinData.name}
            symbol={coinData.symbol}
            rank={coinData.market_cap_rank}
          />
        </SheetTitle>

        <div className="flex items-center gap-5">
          <ExternalLinkBtn href={coinData.links?.homepage[0]} />

          <SheetClose
            className="cursor-pointer transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close coin details"
          >
            <X className="size-5" />
          </SheetClose>
        </div>
      </div>
    </SheetHeader>

    <PriceInfo marketData={coinData.market_data} />
  </header>
);

const CoinImage: FC<Record<'src' | 'alt', string>> = ({ src, alt }) => (
  <div className="relative">
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="rounded-full relative z-10"
    />
  </div>
);

const CoinInfo: FC<{ name: string; symbol: string; rank: number }> = ({
  name,
  symbol,
  rank,
}) => (
  <div>
    <section className="flex items-center gap-2">
      <h2 className="text-2xl font-semibold">{name}</h2>

      <Badge variant="secondary" className="h-5 text-xs">
        {symbol.toUpperCase()}
      </Badge>
    </section>

    <p className="text-muted-foreground text-sm">Rank #{rank}</p>
  </div>
);

const PriceInfo: FC<
  Record<'marketData', CoinSheetHeaderProps['coinData']['market_data']>
> = ({ marketData }) => (
  <section className="flex items-center gap-4 p-4 rounded-xl bg-card border text-card-foreground">
    <h2 className="text-3xl font-semibold">
      {marketData.current_price.usd.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}
    </h2>

    <Badge
      variant={
        marketData.price_change_percentage_24h > 0 ? 'default' : 'destructive'
      }
      className={
        marketData.price_change_percentage_24h > 0
          ? 'bg-green-50 dark:bg-green-900/10 text-green-500 dark:text-green-400 border-green-300 dark:border-green-900'
          : 'bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 border-red-300 dark:border-red-900'
      }
    >
      <PriceChangeIcon value={marketData.price_change_percentage_24h} />

      <span className="ml-1">
        {Math.abs(marketData.price_change_percentage_24h).toFixed(2)}%
      </span>
    </Badge>
  </section>
);

import { ExternalLinkBtn } from '@/components/external-link-btn';
import {
  getPriceChangeColor,
  PriceChangeIcon,
} from '@/components/price-change-icon';
import { Badge, SheetClose, SheetHeader, SheetTitle } from '@/components/ui';
import { CoingeckoV3CoinResponseData } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

type CoinSheetHeaderProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetHeader: FC<CoinSheetHeaderProps> = ({ coinData }) => (
  <header className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-700/40 p-4">
    <SheetHeader className="space-y-3">
      <div className="flex items-center justify-between">
        <SheetTitle className="flex items-center gap-4">
          <CoinImage src={coinData.image.large} alt={coinData.name} />
          <CoinInfo
            name={coinData.name}
            symbol={coinData.symbol}
            rank={coinData.market_cap_rank}
          />
        </SheetTitle>
        <div className="flex items-center gap-2">
          <ExternalLinkBtn href={coinData.links?.homepage[0]} />
          <SheetClose
            className="cursor-pointer transition-colors text-slate-400 hover:text-slate-200"
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

const CoinImage: FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-white/35 rounded-full blur-md" />
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="rounded-full relative z-10 ring-white/20"
    />
  </div>
);

const CoinInfo: FC<{ name: string; symbol: string; rank: number }> = ({
  name,
  symbol,
  rank,
}) => (
  <div>
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-semibold text-white">{name}</h2>
      <Badge
        variant="outline"
        className="h-5 text-xs border-slate-600/30 bg-slate-800/20 text-slate-200"
      >
        {symbol.toUpperCase()}
      </Badge>
    </div>
    <p className="text-slate-300 text-sm">rank #{rank}</p>
  </div>
);

const PriceInfo: FC<
  Record<'marketData', CoinSheetHeaderProps['coinData']['market_data']>
> = ({ marketData }) => (
  <section className="mt-4 mb-2 p-4 rounded-xl bg-slate-800/20 border">
    <div className="flex items-center gap-3">
      <h2 className="text-3xl font-bold text-white">
        {marketData.current_price.usd.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </h2>
      <Badge
        className={
          marketData.price_change_percentage_24h > 0
            ? 'bg-emerald-900/40'
            : 'bg-rose-900/40'
        }
      >
        <PriceChangeIcon value={marketData.price_change_percentage_24h} />
        <span
          className={getPriceChangeColor(
            marketData.price_change_percentage_24h,
          )}
        >
          {Math.abs(marketData.price_change_percentage_24h).toFixed(2)}%
        </span>
      </Badge>
    </div>
  </section>
);

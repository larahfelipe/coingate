import { type FC } from 'react';

import { Star } from 'lucide-react';

import { Badge } from '@/components/ui';
import { type CoingeckoV3CoinResponseData } from '@/types';

type CoinSheetSentimentCardProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetSentimentCard: FC<CoinSheetSentimentCardProps> = ({
  coinData,
}) => (
  <div className="bg-card rounded-xl p-5 border text-card-foreground">
    <section className="flex items-center gap-2 mb-4">
      <Star className="size-4 text-primary" />

      <h3 className="text-sm text-muted-foreground font-medium">
        Community sentiment
      </h3>
    </section>

    <div className="flex items-center gap-4">
      <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
        <div
          role="progressbar"
          className="h-full bg-emerald-500 dark:bg-green-500"
          style={{
            width: `${coinData.sentiment_votes_up_percentage.toFixed(1)}%`,
          }}
        />
      </div>

      <Badge
        variant="secondary"
        className="text-sm text-emerald-500 dark:text-green-400 bg-emerald-50 dark:bg-green-900/20"
      >
        {coinData.sentiment_votes_up_percentage?.toFixed(1) ?? 0}%
      </Badge>
    </div>

    <div className="flex justify-between mt-3 text-xs text-muted-foreground">
      <span>Bearish</span>

      <span>Bullish</span>
    </div>
  </div>
);

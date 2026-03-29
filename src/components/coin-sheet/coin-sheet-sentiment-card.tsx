import { type FC } from 'react';

import { Heart } from 'lucide-react';

import { type CoingeckoV3CoinResponseData } from '@/types';

type CoinSheetSentimentCardProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetSentimentCard: FC<CoinSheetSentimentCardProps> = ({
  coinData,
}) => {
  const sentimentVotesUpPercentage = coinData.sentiment_votes_up_percentage;
  const sentimentVotesDownPercentage = coinData.sentiment_votes_down_percentage;

  if (!sentimentVotesUpPercentage || !sentimentVotesDownPercentage) return null;

  return (
    <div className="bg-card rounded-xl p-5 border text-card-foreground">
      <section className="flex items-center gap-2 mb-4">
        <Heart className="size-4 text-rose-400" />

        <h3 className="text-sm text-muted-foreground font-medium">
          Community sentiment
        </h3>
      </section>

      <div className="h-4 flex-1 relative rounded-full overflow-hidden bg-rose-400">
        <div
          className="h-full flex justify-center items-center absolute bg-emerald-400"
          style={{
            width: `${sentimentVotesUpPercentage.toFixed(1)}%`,
          }}
        />
      </div>

      <div className="flex justify-between items-center gap-2 mt-3">
        <span className="text-xs text-emerald-700 dark:text-emerald-400">
          {sentimentVotesUpPercentage.toFixed(1)}% Bullish
        </span>

        <span className="text-xs text-rose-700 dark:text-red-300">
          {sentimentVotesDownPercentage.toFixed(1)}% Bearish
        </span>
      </div>
    </div>
  );
};

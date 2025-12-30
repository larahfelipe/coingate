import { type FC } from 'react';

import { Star } from 'lucide-react';

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
        <Star className="size-4 text-primary" />

        <h3 className="text-sm text-muted-foreground font-medium">
          Community sentiment
        </h3>
      </section>

      <div className="h-7 flex-1 relative rounded-full overflow-hidden bg-muted">
        <div
          role="progressbar"
          className="h-full flex justify-center items-center absolute bg-emerald-300 dark:bg-emerald-400"
          style={{
            width: `${sentimentVotesUpPercentage.toFixed(1)}%`,
          }}
        >
          <span className="font-medium text-sm text-emerald-700 dark:text-emerald-800">
            {sentimentVotesUpPercentage.toFixed(1)}%
          </span>
        </div>

        <div
          role="progressbar"
          className="h-full flex justify-center items-center absolute right-0 bg-red-200 dark:bg-red-300"
          style={{ width: `${sentimentVotesDownPercentage.toFixed(1)}%` }}
        >
          <span className="font-medium text-sm text-red-700 dark:text-red-800">
            {sentimentVotesDownPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 mt-3">
        <span className="text-xs text-emerald-700 dark:text-emerald-400">
          Bullish
        </span>

        <span className="text-xs text-red-700 dark:text-red-300">Bearish</span>
      </div>
    </div>
  );
};

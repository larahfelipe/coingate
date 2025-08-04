import { Badge } from '@/components/ui';
import { CoingeckoV3CoinResponseData } from '@/types';
import { Star } from 'lucide-react';
import { FC } from 'react';

type CoinSheetSentimentCardProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetSentimentCard: FC<CoinSheetSentimentCardProps> = ({
  coinData,
}) => (
  <div className="bg-slate-800/20 rounded-xl p-5 border backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-4">
      <Star className="size-4 text-amber-400" />
      <h3 className="text-sm font-medium text-slate-200">
        Community sentiment
      </h3>
    </div>
    <div className="flex items-center gap-4 mb-3">
      <div className="flex-1 bg-gradient-to-r from-rose-900/40 to-emerald-900/40 rounded-full h-3 overflow-hidden border border-slate-600/20">
        <div
          className="bg-emerald-500 h-full rounded-full shadow-lg"
          style={{
            width: `${coinData.sentiment_votes_up_percentage.toFixed(1)}%`,
          }}
          role="progressbar"
          aria-valuenow={coinData.sentiment_votes_up_percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <Badge className="text-emerald-400 text-sm font-medium bg-emerald-900/20">
        {coinData.sentiment_votes_up_percentage.toFixed(1)}%
      </Badge>
    </div>
    <div className="flex justify-between text-xs text-slate-400">
      <span>Bearish</span>
      <span>Bullish</span>
    </div>
  </div>
);

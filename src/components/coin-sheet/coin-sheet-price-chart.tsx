import { type FC } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import { LineChart } from 'lucide-react';

type CoinSheetPriceChartProps = {
  priceData: number[];
};

export const CoinSheetPriceChart: FC<CoinSheetPriceChartProps> = ({
  priceData,
}) => {
  return (
    <section className="bg-slate-800/20 rounded-xl p-2 shadow-lg border backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <h3 className="text-sm text-slate-200 flex items-center p-3 gap-2">
          <LineChart className="size-4 text-blue-400" />
          Price chart (7d)
        </h3>
      </div>

      <div className="h-32 rounded-lg flex items-center justify-center">
        <Sparklines data={priceData} height={100}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
    </section>
  );
};

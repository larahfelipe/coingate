import { LineChart } from 'lucide-react';
import { FC } from 'react';

export const CoinSheetPriceChart: FC = () => {
  return (
    <section className="bg-slate-800/20 rounded-xl p-5 shadow-lg border backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <h3 className="text-sm text-slate-200 flex items-center gap-2">
          <LineChart className="size-4 text-blue-400" />
          Price chart
        </h3>
      </div>
      <div className="h-32 rounded-lg flex items-center justify-center">
        <span className="text-slate-400 text-sm">Coming soon</span>
      </div>
    </section>
  );
};

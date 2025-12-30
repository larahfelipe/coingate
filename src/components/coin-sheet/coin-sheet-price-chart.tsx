import { type FC } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import { LineChart } from 'lucide-react';
import { useTheme } from 'next-themes';

type CoinSheetPriceChartProps = {
  priceData: number[];
};

export const CoinSheetPriceChart: FC<CoinSheetPriceChartProps> = ({
  priceData,
}) => {
  const { theme } = useTheme();

  return (
    <div className="p-1 bg-card rounded-xl border text-card-foreground">
      <section className="flex items-center mb-4">
        <h3 className="text-sm text-muted-foreground font-medium flex items-center p-3 gap-2">
          <LineChart className="size-4 text-primary" />
          Price chart (7d)
        </h3>
      </section>

      <div className="h-32 rounded-lg flex items-center justify-center overflow-hidden px-2">
        <Sparklines data={priceData} height={75} width={300}>
          <SparklinesLine
            style={{
              strokeWidth: 1.5,
              stroke: theme === 'light' ? 'blue' : 'deepskyblue',
              fill: 'none',
            }}
          />
        </Sparklines>
      </div>
    </div>
  );
};

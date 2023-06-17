import type { FunctionComponent } from 'react';
import Marquee from 'react-fast-marquee';

import { Skeleton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { SMALL_VW, TABS } from '@/constants';
import { useGlobalData, useTrendingCoins } from '@/hooks';
import { formatNumber } from '@/utils';

import { CoinsTab, ExchangesTab } from '../';
import { Badge, InfoItem, MarqueeItem, PercentageText } from '../../elements';
import { useStyles } from './styles';
import type { BodyProps } from './types';

const Body: FunctionComponent<BodyProps> = ({ activeTab }) => {
  const { classes, theme } = useStyles();
  const {
    Wrapper,
    MarketInfoWrapper,
    SkeletonsWrapper,
    BadgeWrapper,
    TrendingCoinsMarqueeWrapper
  } = classes;

  const { trendingCoins } = useTrendingCoins();

  const {
    getTotalMarketCap,
    getTotalMarketCapChangePercentage,
    getTotalMarketVolume,
    getBTCMarketCapPercentage,
    getTotalActiveCryptocurrencies,
    isLoading
  } = useGlobalData();

  const totalMarketCapChangePercentage = +getTotalMarketCapChangePercentage();

  const matchSmallVW = useMediaQuery(`(max-width: ${SMALL_VW}px)`);

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className={SkeletonsWrapper}>
        <Skeleton width="250px" height="20px" />

        <Skeleton width="250px" height="45px" />

        {i === 0 && <Skeleton width="100px" height="20px" />}
      </div>
    ));

  const renderActiveTab = () => {
    switch (activeTab) {
      case TABS.Coins:
        return <CoinsTab />;
      case TABS.Exchanges:
        return <ExchangesTab />;
      default:
        return <CoinsTab />;
    }
  };

  return (
    <div className={Wrapper}>
      <div className={TrendingCoinsMarqueeWrapper}>
        {isLoading && <Skeleton width="100%" height="20px" />}

        {!isLoading && (
          <Marquee pauseOnHover gradient={!matchSmallVW}>
            {trendingCoins.map(({ item }) => (
              <MarqueeItem
                key={item.id}
                iconUrl={item.thumb}
                title={item.name}
                subtitle={`(${item.symbol} #${
                  item.market_cap_rank
                }) at ${item.score++}º place in 24h trend, ${formatNumber(
                  item.price_btc,
                  { maximumFractionDigits: 8 }
                )} BTC`}
              />
            ))}
          </Marquee>
        )}
      </div>

      <div className={MarketInfoWrapper}>
        {isLoading && renderSkeletons()}

        {!isLoading && (
          <>
            <div>
              <InfoItem
                title="MARKET CAPITALIZATION"
                subtitle="USD"
                value={getTotalMarketCap()}
              />

              <div className={BadgeWrapper}>
                <Badge
                  color={
                    totalMarketCapChangePercentage > 0
                      ? theme.colors.successLight
                      : theme.colors.dangerLight
                  }
                >
                  <PercentageText
                    prefersIndicatorIcon
                    dynamicColorBasedOnValue
                    value={totalMarketCapChangePercentage}
                    weight="bold"
                  />
                </Badge>
              </div>
            </div>

            <InfoItem
              title="24H VOLUME"
              subtitle="USD"
              value={getTotalMarketVolume()}
            />

            <InfoItem
              title="BTC DOMINANCE"
              subtitle="%"
              value={getBTCMarketCapPercentage()}
            />

            <InfoItem
              title="ACTIVE COINS"
              value={getTotalActiveCryptocurrencies()}
            />
          </>
        )}
      </div>

      {renderActiveTab()}
    </div>
  );
};

export default Body;

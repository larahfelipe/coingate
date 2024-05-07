import type { FunctionComponent } from 'react';
import Marquee from 'react-fast-marquee';

import { Box, Flex, Skeleton } from '@mantine/core';

import { TABS } from '@/common';
import { useGlobalData, useTrendingCoins } from '@/hooks';
import { formatNumber } from '@/utils';

import { CoinsTab, ExchangesTab } from '../';
import {
  Badge,
  MarqueeItem,
  PercentageText,
  ScrollBtn,
  StatisticsItem
} from '../../elements';
import { useStyles } from './styles';
import type { BodyProps } from './types';

const Body: FunctionComponent<BodyProps> = ({ tab }) => {
  const { classes, theme } = useStyles();
  const { Wrapper, Content, MarketStatistics, MarqueeWrapper, BadgeWrapper } =
    classes;

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

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <Flex direction="column" gap="0.5rem" key={i}>
        <Skeleton width="250px" height="20px" />

        <Skeleton width="250px" height="45px" />

        {i === 0 && <Skeleton width="100px" height="20px" />}
      </Flex>
    ));

  const renderActiveTab = () => {
    switch (tab) {
      case TABS.Coins:
        return <CoinsTab />;
      case TABS.Exchanges:
        return <ExchangesTab />;
      default:
        return <CoinsTab />;
    }
  };

  return (
    <Flex direction="column" className={Wrapper}>
      <section className={MarqueeWrapper}>
        {isLoading && <Skeleton width="100%" height="20px" />}

        {!isLoading && (
          <Marquee pauseOnHover gradient={false}>
            {trendingCoins?.map(({ item }) => (
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
      </section>

      <section className={Content}>
        <Flex justify="space-between" className={MarketStatistics}>
          {isLoading && renderSkeletons()}

          {!isLoading && (
            <>
              <Box>
                <StatisticsItem
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
              </Box>

              <StatisticsItem
                title="24H VOLUME"
                subtitle="USD"
                value={getTotalMarketVolume()}
              />

              <StatisticsItem
                title="BTC DOMINANCE"
                subtitle="%"
                value={getBTCMarketCapPercentage()}
              />

              <StatisticsItem
                title="ACTIVE COINS"
                value={getTotalActiveCryptocurrencies()}
              />
            </>
          )}
        </Flex>

        {renderActiveTab()}

        <ScrollBtn />
      </section>
    </Flex>
  );
};

export default Body;

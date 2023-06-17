/* eslint-disable react/jsx-newline */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent
} from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Image from 'next/image';

import { Skeleton, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import {
  COINS_TABLE_HEADERS,
  DEBOUNCE_INTERVAL_MS,
  TOTAL_ITEMS_PER_PAGE
} from '@/constants';
import { useCoins, useGlobalData, useWatchlist } from '@/hooks';
import { formatCurrency, formatNumber, isValidURL } from '@/utils';

import {
  PercentageText,
  ScrollBtn,
  Sparklines,
  Table
} from '../../../elements';
import { useStyles } from './styles';

const Coins: FunctionComponent = () => {
  const [isMounting, setIsMounting] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedCoin, setSearchedCoin] = useState('');

  const [debouncedSearch] = useDebouncedValue(
    searchedCoin,
    DEBOUNCE_INTERVAL_MS
  );

  const { classes } = useStyles();
  const {
    Wrapper,
    Content,
    TableData,
    SparklinesWrapper,
    StarIconFilled,
    StarIcon
  } = classes;

  const { coins, coinsState, coinState } = useCoins({
    desiredPage: currentPage,
    coinId: debouncedSearch
  });

  const { getTotalActiveCryptocurrencies } = useGlobalData();

  const { watchlistCoin, coinsWatchlist } = useWatchlist();

  const isLoading =
    coinsState.isLoading || coinsState.isFetching || coinState.isFetching;

  const totalCoinsPerPage =
    getTotalActiveCryptocurrencies() / TOTAL_ITEMS_PER_PAGE;

  const handleWatchListCoin = useCallback(
    (coinId: string) => watchlistCoin(coinId),
    [watchlistCoin]
  );

  const handleChangePage = (desiredPage: number) => setCurrentPage(desiredPage);

  const handleSearchCoin = (desiredCoin: string) =>
    setSearchedCoin(desiredCoin.toLowerCase());

  const memoizedCoinsList = useMemo(
    () =>
      coins?.map((coin) => (
        <tr key={coin.id}>
          <td>
            {coinsWatchlist.includes(coin.id) ? (
              <AiFillStar
                className={StarIconFilled}
                onClick={() => handleWatchListCoin(coin.id)}
              />
            ) : (
              <AiOutlineStar
                className={StarIcon}
                onClick={() => handleWatchListCoin(coin.id)}
              />
            )}
          </td>

          <td>
            <Text color="gray">{formatNumber(coin.market_cap_rank)}</Text>
          </td>

          <td>
            <div className={TableData}>
              {isValidURL(coin.image) && (
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={24}
                  height={24}
                />
              )}

              <div className={TableData}>
                <Text weight={600}>{coin.name}</Text>

                <Text color="gray">{coin.symbol.toUpperCase()}</Text>
              </div>
            </div>
          </td>

          <td>
            <Text>
              {formatCurrency(coin.current_price, { maximumFractionDigits: 3 })}
            </Text>
          </td>

          <td>
            <PercentageText
              prefersIndicatorIcon
              dynamicColorBasedOnValue
              value={coin.price_change_percentage_24h}
              weight="bold"
            />
          </td>

          <td>
            <PercentageText
              prefersIndicatorIcon
              dynamicColorBasedOnValue
              value={coin.price_change_percentage_30d_in_currency}
              weight="bold"
            />
          </td>

          <td>
            <div className={TableData}>
              <Text>
                {formatCurrency(coin.current_price * coin.circulating_supply, {
                  maximumFractionDigits: 0
                })}
              </Text>
            </div>
          </td>

          <td>
            <div>
              <Text>
                {formatNumber(coin.total_volume, {
                  maximumFractionDigits: 0
                })}
              </Text>

              {!!coin.total_volume && (
                <Text size="xs" color="gray">
                  {formatNumber(coin.total_volume / coin.current_price)}{' '}
                  {coin.symbol.toUpperCase()}
                </Text>
              )}
            </div>
          </td>

          <td>
            {formatNumber(coin.circulating_supply, {
              maximumFractionDigits: 0
            })}
          </td>

          <td>
            <div className={SparklinesWrapper}>
              <Sparklines
                strokeWidth="3"
                data={coin.sparkline_in_7d.price}
                dynamicColorBasedOnValue={
                  coin.price_change_percentage_7d_in_currency
                }
              />
            </div>
          </td>
        </tr>
      )),
    [
      SparklinesWrapper,
      TableData,
      coins,
      StarIcon,
      StarIconFilled,
      coinsWatchlist,
      handleWatchListCoin
    ]
  );

  useEffect(() => void setIsMounting(false), []);

  return (
    <div className={Wrapper}>
      <div className={Content}>
        {isMounting && <Skeleton height={1200} />}

        {!isMounting && (
          <Table
            withBorder
            searchable
            highlightOnHover
            loading={isLoading}
            searchPlaceholder="Search a coin by name"
            totalItems={totalCoinsPerPage}
            onChangePage={handleChangePage}
            onSearch={handleSearchCoin}
            headers={COINS_TABLE_HEADERS}
            data={memoizedCoinsList}
          />
        )}
      </div>

      <ScrollBtn />
    </div>
  );
};

export default Coins;

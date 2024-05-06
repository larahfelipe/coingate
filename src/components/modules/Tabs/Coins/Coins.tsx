/* eslint-disable react/jsx-newline */
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent
} from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Image from 'next/image';

import { Box, Skeleton, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import {
  COINS_TABLE_HEADERS,
  DEBOUNCE_INTERVAL_MS,
  TOTAL_ITEMS_PER_PAGE
} from '@/common';
import { useCoins, useGlobalData, useTheme, useWatchlist } from '@/hooks';
import { formatCurrency, formatNumber, isValidURL } from '@/utils';

import { PercentageText, Sparklines, Table } from '../../../elements';
import { useStyles } from './styles';

const Coins: FunctionComponent = () => {
  const [isMounting, setIsMounting] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedCoin, setSearchedCoin] = useState('');

  const [debouncedSearch] = useDebouncedValue(
    searchedCoin,
    DEBOUNCE_INTERVAL_MS
  );
  const { colorScheme } = useTheme();
  const { classes } = useStyles();
  const {
    Wrapper,
    TableData,
    FixedColumn,
    Column1,
    Column2,
    Column3,
    SparklinesWrapper,
    StarIconFilled,
    StarIcon
  } = classes;

  const { coins, coinsState } = useCoins({
    desiredPage: currentPage,
    coinId: debouncedSearch
  });
  const { getTotalActiveCryptocurrencies } = useGlobalData();
  const { coinsWatchlistInclude, coinsWatchlist } = useWatchlist();

  const isLoading = coinsState.isLoading || coinsState.isFetching;

  const totalCoinsPerPage =
    getTotalActiveCryptocurrencies() / TOTAL_ITEMS_PER_PAGE;

  const handleWatchListCoin = useCallback(
    (coinId: string) => coinsWatchlistInclude(coinId),
    [coinsWatchlistInclude]
  );

  const handleChangePage = (desiredPage: number) => setCurrentPage(desiredPage);

  const handleSearchCoin = (desiredCoin: string) =>
    setSearchedCoin(desiredCoin.toLowerCase());

  const subItemTextColor = useMemo(
    () => (colorScheme === 'light' ? 'gray' : 'gray.6'),
    [colorScheme]
  );

  const coinsTableData = useMemo(
    () =>
      coins?.map((coin) => (
        <Fragment key={coin.id}>
          <td className={`${FixedColumn} ${Column1}`}>
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

          <td className={`${FixedColumn} ${Column2}`}>
            <Text color={subItemTextColor}>
              {formatNumber(coin.market_cap_rank)}
            </Text>
          </td>

          <td className={`${FixedColumn} ${Column3}`}>
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

                <Text color={subItemTextColor}>
                  {coin.symbol.toUpperCase()}
                </Text>
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
                {formatCurrency(coin.total_volume, {
                  maximumFractionDigits: 0
                })}
              </Text>

              {!!coin.total_volume && (
                <Text size="xs" color={subItemTextColor}>
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
                data={coin.sparkline_in_7d.price}
                dynamicColorBasedOnValue={
                  coin.price_change_percentage_7d_in_currency
                }
              />
            </div>
          </td>
        </Fragment>
      )),
    [
      SparklinesWrapper,
      TableData,
      FixedColumn,
      Column1,
      Column2,
      Column3,
      coins,
      StarIcon,
      subItemTextColor,
      StarIconFilled,
      coinsWatchlist,
      handleWatchListCoin
    ]
  );

  useEffect(() => setIsMounting(false), []);

  return (
    <Box className={Wrapper}>
      {isMounting && <Skeleton height={1200} />}

      {!isMounting && (
        <Table
          withBorder
          searchable
          highlightOnHover
          loading={isLoading}
          fixedColsLength={3}
          searchPlaceholder="Search a coin by name"
          totalItems={totalCoinsPerPage}
          onChangePage={handleChangePage}
          onSearch={handleSearchCoin}
          headers={COINS_TABLE_HEADERS}
          data={coinsTableData}
        />
      )}
    </Box>
  );
};

export default Coins;

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent
} from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';

import Image from 'next/image';
import Link from 'next/link';

import { Skeleton, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { ScrollBtn, Table } from '@/components/elements';
import {
  DEBOUNCE_INTERVAL_MS,
  EXCHANGES_TABLE_HEADERS,
  UNKNOWN_VALUE_CHAR
} from '@/constants';
import { useExchanges, useTheme, useWatchlist } from '@/hooks';
import { formatNumber, isValidURL } from '@/utils';

import { useStyles } from './styles';

const Exchanges: FunctionComponent = () => {
  const [isMounting, setIsMounting] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedExchange, setSearchedExchange] = useState('');

  const [debouncedSearch] = useDebouncedValue(
    searchedExchange,
    DEBOUNCE_INTERVAL_MS
  );

  const { colorScheme } = useTheme();

  const { classes } = useStyles();
  const { Wrapper, Content, TableData, StarIconFilled, StarIcon, LinkIcon } =
    classes;

  const { exchanges, exchangesState, exchangeState } = useExchanges({
    desiredPage: currentPage,
    exchangeId: debouncedSearch
  });

  const { watchlistExchange, exchangesWatchlist } = useWatchlist();

  const subItemTextColor = colorScheme === 'light' ? 'gray' : 'gray.6';

  const isLoading =
    exchangesState.isLoading ||
    exchangesState.isFetching ||
    exchangeState.isFetching;

  const handleWatchlistExchange = useCallback(
    (exchangeId: string) => watchlistExchange(exchangeId),
    [watchlistExchange]
  );

  const handleChangePage = (desiredPage: number) => setCurrentPage(desiredPage);

  const handleSearchExchange = (desiredExchange: string) => {
    let formattedExchangeId = desiredExchange.toLowerCase();

    if (desiredExchange.includes(' '))
      formattedExchangeId = desiredExchange.split(' ').join('_');

    setSearchedExchange(formattedExchangeId);
  };

  const memoizedExchanges = useMemo(
    () =>
      exchanges.map((exchange) => (
        <tr key={exchange.id}>
          <td>
            {exchangesWatchlist.includes(exchange.id) ? (
              <AiFillStar
                className={StarIconFilled}
                onClick={() => handleWatchlistExchange(exchange.id)}
              />
            ) : (
              <AiOutlineStar
                className={StarIcon}
                onClick={() => handleWatchlistExchange(exchange.id)}
              />
            )}
          </td>

          <td>
            <Text color={subItemTextColor}>
              {formatNumber(exchange.trust_score_rank)}
            </Text>
          </td>

          <td>
            <div className={TableData}>
              {isValidURL(exchange.image) && (
                <Image
                  src={exchange.image}
                  alt={exchange.name}
                  width={24}
                  height={24}
                />
              )}

              <div className={TableData}>
                <Text weight={600}>{exchange.name}</Text>
              </div>
            </div>
          </td>

          <td>
            <Text>{exchange.country ?? UNKNOWN_VALUE_CHAR}</Text>
          </td>

          <td>
            <Text color={subItemTextColor}>
              {exchange.year_established ?? UNKNOWN_VALUE_CHAR}
            </Text>
          </td>

          <td>
            {exchange.trust_score ? (
              <div className={TableData}>
                <Text>{exchange.trust_score}</Text>

                <Text color={subItemTextColor}>/ 10</Text>
              </div>
            ) : (
              <Text>{UNKNOWN_VALUE_CHAR}</Text>
            )}
          </td>

          <td>
            <div className={TableData}>
              <Text>
                {formatNumber(exchange.trade_volume_24h_btc, {
                  maximumFractionDigits: 6
                })}
              </Text>

              <Text color={subItemTextColor}>BTC</Text>
            </div>
          </td>

          <td>
            <Link href={exchange.url} passHref>
              <HiOutlineExternalLink className={LinkIcon} />
            </Link>
          </td>
        </tr>
      )),
    [
      exchanges,
      exchangesWatchlist,
      handleWatchlistExchange,
      StarIcon,
      StarIconFilled,
      TableData,
      LinkIcon
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
            verticalSpacing="sm"
            loading={isLoading}
            searchPlaceholder="Search an exchange by name"
            totalItems={25}
            onChangePage={handleChangePage}
            onSearch={handleSearchExchange}
            headers={EXCHANGES_TABLE_HEADERS}
            data={memoizedExchanges}
          />
        )}
      </div>

      <ScrollBtn />
    </div>
  );
};

export default Exchanges;

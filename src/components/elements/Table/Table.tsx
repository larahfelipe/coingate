import { useState, type ChangeEvent, type FunctionComponent } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import {
  Box,
  Flex,
  Table as MTable,
  Pagination,
  Skeleton,
  Text
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { MOBILE_VW } from '@/common';

import { useStyles } from './styles';
import type { TableProps } from './types';

const Table: FunctionComponent<TableProps> = ({
  loading,
  searchable,
  searchPlaceholder,
  totalItems,
  fixedColsLength,
  onSearch,
  onChangePage,
  headers,
  data,
  highlightOnHover,
  ...props
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const { classes } = useStyles();
  const {
    CenteredRow,
    NavigationWrapper,
    InputWrapper,
    SearchIcon,
    Input,
    TableWrapper
  } = classes;

  const matchMobileVW = useMediaQuery(`(max-width: ${MOBILE_VW}px)`);

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setIsSearching(value.length > 0);
    if (onSearch) onSearch(value);
  };

  const renderTableHeaders = () => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <th key={i}>
          <Skeleton width="200px" height="30px" />
        </th>
      ));
    }

    return headers.map((header, i) => (
      <th
        key={header}
        className={
          fixedColsLength && fixedColsLength >= i
            ? classes[`Column${++i}` as keyof typeof classes]
            : ''
        }
      >
        <Text size="sm" weight={700}>
          {header}
        </Text>
      </th>
    ));
  };

  const renderTableData = () => {
    if (loading)
      return Array.from({ length: 14 }).map((_, i) => (
        <tr key={i}>
          <td colSpan={headers.length}>
            <Skeleton width="100%" height="45px" />
          </td>
        </tr>
      ));

    if (!data?.length)
      return (
        <tr>
          <td className={CenteredRow} colSpan={headers.length}>
            <Text color="gray.6" weight="bold">
              No data to display
            </Text>
          </td>
        </tr>
      );

    return data.map((row, i) => <tr key={i}>{row}</tr>);
  };

  return (
    <>
      {(searchable || totalItems) && (
        <Flex
          justify="space-between"
          align="center"
          className={NavigationWrapper}
        >
          <Flex align="center" className={InputWrapper}>
            {searchable && (
              <>
                <IoSearchOutline className={SearchIcon} />

                <input
                  type="text"
                  placeholder={searchPlaceholder ?? 'Search...'}
                  className={Input}
                  onChange={handleOnSearch}
                />
              </>
            )}
          </Flex>

          {!!totalItems && !isSearching && (
            <Pagination
              color="gray"
              aria-label="Pagination"
              size={matchMobileVW ? 'sm' : 'md'}
              total={totalItems}
              onChange={onChangePage}
            />
          )}
        </Flex>
      )}

      <Box className={TableWrapper}>
        <MTable
          verticalSpacing="xs"
          horizontalSpacing="xs"
          highlightOnHover={highlightOnHover && !loading}
          {...props}
        >
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>

          <tbody>{renderTableData()}</tbody>
        </MTable>
      </Box>
    </>
  );
};

export default Table;

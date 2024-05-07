/* eslint-disable no-unused-vars */
import type { ReactNode } from 'react';

import type { TableProps as MTableProps } from '@mantine/core';

export type TableProps = MTableProps & {
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  totalItems?: number;
  fixedColsLength?: number;
  onSearch?: (search: string) => void;
  onChangePage?: (page: number) => void;
  headers: string[];
  data?: ReactNode[];
};

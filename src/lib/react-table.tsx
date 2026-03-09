import {
  type TableOptions,
  useReactTable as _useReactTable,
} from '@tanstack/react-table';

export function useReactTable<T>(options: TableOptions<T>) {
  'use no memo';
  return _useReactTable(options);
}

export * from '@tanstack/react-table';

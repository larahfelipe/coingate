import { UNKNOWN_VALUE_CHAR } from '@/common';

type FormatOptions = Partial<{
  maximumFractionDigits: number;
  notation: Intl.NumberFormatOptions['notation'];
  prefersAbsoluteValue: boolean;
}>;

export const formatCurrency = (value: number, options?: FormatOptions) => {
  if (!value || value === 0) return UNKNOWN_VALUE_CHAR;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    notation: options?.notation ?? 'standard'
  }).format(value);
};

export const formatNumber = (value: number, options?: FormatOptions) => {
  if (!value || value === 0) return UNKNOWN_VALUE_CHAR;

  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    notation: options?.notation ?? 'standard'
  }).format(value);

  if (options?.prefersAbsoluteValue) return formattedNumber.replace('-', '');

  return formattedNumber;
};

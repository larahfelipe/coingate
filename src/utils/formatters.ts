export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {},
) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
};

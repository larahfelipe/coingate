import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 *
 * @param initialValue
 * @param delay
 * @returns value, debouncedValue, setValue
 *
 * @example
 * const [value, debouncedValue, setValue] = useDebouncedState('');
 */
export const useDebouncedState = <T>(
  initialValue: T,
  delay: number = 500,
): [T, T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue] as const;
};

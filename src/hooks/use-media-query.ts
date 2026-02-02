import { useEffect, useState } from 'react';

/**
 *
 * @param query
 * @returns value
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQuery = (query: string) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => setValue(event.matches);

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
};

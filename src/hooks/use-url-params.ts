import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useRef } from 'react';

export type UrlParamValue = string | number | boolean | null | undefined;

export const useUrlParams = <T extends string>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const updateUrlParams = useCallback(
    (params: Partial<Record<T, UrlParamValue>>) => {
      const currentParams = new URLSearchParams(
        searchParamsRef.current.toString(),
      );

      const nextParams = new URLSearchParams(currentParams);
      let hasChanges = false;

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          if (currentParams.has(key)) {
            nextParams.delete(key);
            hasChanges = true;
          }
        } else {
          const currentParamValue = currentParams.get(key);
          const newParamValue = String(value);

          if (currentParamValue !== newParamValue) {
            nextParams.set(key, newParamValue);
            hasChanges = true;
          }
        }
      });

      if (!hasChanges) return;

      const queryString = nextParams.toString();
      const currentQueryString = currentParams.toString();
      if (queryString === currentQueryString) return;

      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router],
  );

  return { updateUrlParams };
};

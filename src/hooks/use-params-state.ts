/* eslint-disable react-hooks/refs */
import { useCallback, useMemo, useRef, useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ParamsRecord<T extends string> = Partial<Record<T, string>>;
type ParamValue = string | number | boolean | null | undefined;

export const useParamsState = <T extends string>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const urlParams = useMemo(
    () => Object.fromEntries(searchParams.entries()) as ParamsRecord<T>,
    [searchParams],
  );

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const updateUrlParams = useCallback(
    (params: Partial<Record<T, ParamValue>>) => {
      const nextParams = new URLSearchParams(
        searchParamsRef.current.toString(),
      );
      let hasChanges = false;

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined || value === '') {
          if (nextParams.has(key)) {
            nextParams.delete(key);
            hasChanges = true;
          }
        } else {
          const next = String(value);
          if (nextParams.get(key) !== next) {
            nextParams.set(key, next);
            hasChanges = true;
          }
        }
      }

      if (!hasChanges) return;

      const qs = nextParams.toString();
      const url = qs ? `${pathnameRef.current}?${qs}` : pathnameRef.current;

      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [router],
  );

  return [urlParams, updateUrlParams, isPending] as const;
};

import { useEffect, useRef } from 'react';

type UseIntersectionObserverOptions = {
  enabled?: boolean;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
};

export const useIntersectionObserver = <
  T extends HTMLElement = HTMLDivElement,
>({
  enabled = true,
  rootMargin = '0px',
  threshold = 0.5,
  onIntersect,
}: UseIntersectionObserverOptions) => {
  const targetRef = useRef<T>(null);
  const onIntersectRef = useRef(onIntersect);
  const isRequestInFlight = useRef(false);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isRequestInFlight.current) {
          isRequestInFlight.current = true;
          onIntersectRef.current();

          requestAnimationFrame(() => {
            isRequestInFlight.current = false;
          });
        }
      },
      { rootMargin, threshold },
    );

    const target = targetRef.current;
    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold]);

  return targetRef;
};

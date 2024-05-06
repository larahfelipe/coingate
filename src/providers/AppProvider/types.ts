import type { ReactNode } from 'react';

export type FallbackContentProps = {
  error?: ReactNode;
  resetErrorBoundary?: () => void;
};

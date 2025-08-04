'use client';

import { TooltipProvider } from '@/components/ui';
import { queryClient } from '@/lib/react-query';
import { Children } from '@/types';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC } from 'react';

export const AppProvider: FC<Children> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{children}</TooltipProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

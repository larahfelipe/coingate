'use client';

import { type FC } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TooltipProvider } from '@/components/ui';
import { queryClient } from '@/lib/react-query';
import { type Children } from '@/types';

export const AppProvider: FC<Children> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{children}</TooltipProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

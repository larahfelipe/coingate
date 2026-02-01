'use client';

import { Suspense, type FC } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TooltipProvider } from '@/components/ui';
import { queryClient } from '@/lib/react-query';
import { ThemeProvider } from '@/providers/theme-provider';
import { type Children } from '@/types';

export const AppProvider: FC<Children> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </TooltipProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  </QueryClientProvider>
);

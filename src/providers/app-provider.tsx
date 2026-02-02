'use client';

import { Suspense, type FC } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Loader2 } from 'lucide-react';

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
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </TooltipProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  </QueryClientProvider>
);

const Loading: FC = () => (
  <div className="h-screen flex justify-center items-center">
    <Loader2 className="size-5 animate-spin" />
  </div>
);

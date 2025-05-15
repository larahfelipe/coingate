'use client';

import { TooltipProvider } from '@/components/ui';
import { queryClient } from '@/lib/react-query';
import { Children } from '@/types';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

export const AppProvider: FC<Children> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  );
};

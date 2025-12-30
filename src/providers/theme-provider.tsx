'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ComponentProps, FC } from 'react';

export const ThemeProvider: FC<ComponentProps<typeof NextThemesProvider>> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;

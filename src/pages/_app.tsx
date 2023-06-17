import { Toaster } from 'react-hot-toast';

import type { AppProps } from 'next/app';

import {
  ColorSchemeProvider,
  Global,
  MantineProvider,
  type MantineThemeColorsOverride
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { WatchlistProvider, useTheme } from '@/hooks';
import { theme } from '@/styles';

export default function App({ Component, pageProps }: AppProps) {
  const { colorScheme, toggleColorScheme } = useTheme();

  const queryClient = new QueryClient();

  const customTheme = {
    ...theme,
    colorScheme,
    colors: colorScheme === 'light' ? theme.colors.light : theme.colors.dark
  } as MantineThemeColorsOverride;

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={customTheme}>
        <Global
          styles={(theme) => ({
            '*': {
              WebkitFontSmoothing: 'antialiased',
              WebkitAppearance: 'none',
              margin: 0,
              padding: 0,
              boxSizing: 'border-box'
            },
            'html, body': {
              fontSize: '88.5%',
              fontFamily: theme.fontFamily,
              fontWeight: 500,
              color: theme.colors.text,
              backgroundColor: theme.colors.background
            },
            'body, button, input, textarea': {
              fontFamily: theme.fontFamily,
              border: 'none',
              outline: 'inherit',
              color: theme.colors.text
            },
            'button, a': {
              cursor: 'pointer',
              color: 'inherit',
              textDecoration: 'none'
            }
          })}
        />

        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Toaster position="bottom-right" />

          <WatchlistProvider>
            <Component {...pageProps} />
          </WatchlistProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

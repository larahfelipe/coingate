import { Suspense, type FunctionComponent, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { IoRefresh } from 'react-icons/io5';

import {
  Button,
  Center,
  ColorSchemeProvider,
  Flex,
  Global,
  Loader,
  MantineProvider,
  type MantineThemeColorsOverride
} from '@mantine/core';
import {
  QueryClientProvider,
  QueryErrorResetBoundary
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useTheme } from '@/hooks';
import { queryClient } from '@/lib';
import { theme } from '@/styles';

import { WatchlistProvider } from '../WatchlistProvider';
import type { FallbackContentProps } from './types';

const FallbackContent: FunctionComponent<FallbackContentProps> = ({
  error,
  resetErrorBoundary
}) => {
  if (!error)
    return (
      <Center h="100vh">
        <Loader size={22} color="dark" />
      </Center>
    );

  return (
    <Center h="100vh">
      <Flex direction="column" justify="center" gap="lg">
        <h4>Oops, something went wrong</h4>

        <Button
          variant="light"
          color="dark"
          aria-label="Reset"
          onClick={() => resetErrorBoundary!()}
        >
          <Flex align="center" gap="sm">
            <IoRefresh size={16} />

            <span>Try again</span>
          </Flex>
        </Button>
      </Flex>
    </Center>
  );
};

const AppProvider: FunctionComponent<Record<'children', ReactNode>> = ({
  children
}) => {
  const { colorScheme, toggleColorScheme } = useTheme();
  const customTheme = {
    ...theme,
    colorScheme,
    colors: theme.colors[colorScheme]
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
            'button, input, textarea': {
              outline: 'inherit',
              border: 'none'
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
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  onReset={reset}
                  fallbackRender={(props) => <FallbackContent {...props} />}
                >
                  <Suspense fallback={<FallbackContent />}>{children}</Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </WatchlistProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default AppProvider;

'use client';

import { useCallback } from 'react';

import { CoinSheet } from '@/components/coin-sheet/coin-sheet';
import { CoinsTable } from '@/components/coins-table';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useParamsState } from '@/hooks/use-params-state';

export default function CoinsPage() {
  const [{ id: coinIdParam }, setParams] = useParamsState<'id'>();

  const [isCoinSheetOpened, { open: openCoinSheet, close: closeCoinSheet }] =
    useDisclosure(!!coinIdParam);

  const handleOpenCoinSheet = useCallback(
    (coinId: string) => {
      if (!coinIdParam || coinIdParam !== coinId) setParams({ id: coinId });
      openCoinSheet();
    },
    [coinIdParam, setParams, openCoinSheet],
  );

  const handleCloseCoinSheet = useCallback(() => {
    if (coinIdParam) setParams({ id: null });
    closeCoinSheet();
  }, [coinIdParam, setParams, closeCoinSheet]);

  return (
    <main>
      <CoinSheet
        coinId={coinIdParam}
        opened={isCoinSheetOpened}
        onClose={handleCloseCoinSheet}
      />

      <CoinsTable onRowClick={handleOpenCoinSheet} />
    </main>
  );
}

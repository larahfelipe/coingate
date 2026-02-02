'use client';

import { useCallback, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { CoinSheet } from '@/components/coin-sheet/coin-sheet';
import { CoinsTable } from '@/components/coins-table';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useUrlParams } from '@/hooks/use-url-params';

export default function CoinsPage() {
  const { updateUrlParams } = useUrlParams<'id'>();

  const searchParams = useSearchParams();
  const coinIdParam = searchParams.get('id');

  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    coinIdParam ?? '',
  );
  const [isCoinSheetOpened, { open: openCoinSheet, close: closeCoinSheet }] =
    useDisclosure(!!coinIdParam);

  const handleOpenCoinSheet = useCallback(
    (coinId: string) => {
      if (!coinIdParam) updateUrlParams({ id: coinId });
      setSelectedCoinId(coinId);
      openCoinSheet();
    },
    [coinIdParam, updateUrlParams, openCoinSheet],
  );

  const handleCloseCoinSheet = useCallback(() => {
    if (coinIdParam) updateUrlParams({ id: null });
    closeCoinSheet();
  }, [coinIdParam, updateUrlParams, closeCoinSheet]);

  return (
    <main>
      <CoinSheet
        opened={isCoinSheetOpened}
        coinId={selectedCoinId}
        onClose={handleCloseCoinSheet}
      />

      <CoinsTable onRowClick={handleOpenCoinSheet} />
    </main>
  );
}

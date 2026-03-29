'use client';

import { use } from 'react';

import { parseAsString, useQueryState } from 'nuqs';

import { CoinSheet } from '@/components/coin-sheet/coin-sheet';
import { CoinsTable } from '@/components/coins-table';
import { useDisclosure } from '@/hooks/use-disclosure';

type CoinsPageProps = {
  searchParams: Promise<Record<'id', string>>;
};

export default function CoinsPage({ searchParams }: Readonly<CoinsPageProps>) {
  const { id } = use(searchParams);
  const [coinId, setCoinId] = useQueryState(
    'id',
    parseAsString.withDefault(id),
  );

  const [isCoinSheetOpened, { open: openCoinSheet, close: closeCoinSheet }] =
    useDisclosure(!!coinId);

  const handleOpenCoinSheet = (selectedCoinId: string) => {
    if (selectedCoinId !== coinId) setCoinId(selectedCoinId);
    openCoinSheet();
  };

  const handleCloseCoinSheet = () => {
    if (coinId) setCoinId(null);
    closeCoinSheet();
  };

  return (
    <main>
      <CoinSheet
        coinId={coinId}
        opened={isCoinSheetOpened}
        onClose={handleCloseCoinSheet}
      />

      <CoinsTable onRowClick={handleOpenCoinSheet} />
    </main>
  );
}

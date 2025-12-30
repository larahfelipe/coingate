'use client';

import { useState } from 'react';

import { CoinSheet } from '@/components/coin-sheet/coin-sheet';
import { CoinsTable } from '@/components/shared/coins-table';
import { useDisclosure } from '@/hooks/use-disclosure';

export default function CoinsPage() {
  const [selectedCoinId, setSelectedCoinId] = useState<string>();

  const [isCoinSheetOpened, { toggle: toggleCoinSheet }] = useDisclosure(false);

  const handleToggleCoinSheet = (coinId: string) => {
    setSelectedCoinId(coinId);
    toggleCoinSheet();
  };

  return (
    <main>
      <CoinSheet
        opened={isCoinSheetOpened}
        coinId={selectedCoinId}
        onClose={toggleCoinSheet}
      />

      <CoinsTable onRowClick={handleToggleCoinSheet} />
    </main>
  );
}

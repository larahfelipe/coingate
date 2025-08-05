'use client';

import { useState } from 'react';

import { CoinSheet } from '@/components/coin-sheet/coin-sheet';
import { CoinsTable } from '@/components/coins-table';
import { useDisclosure } from '@/hooks/use-disclosure';

export default function CoinsPage() {
  const [coinId, setCoinId] = useState<string>();

  const [opened, { toggle }] = useDisclosure(false);

  const handleToggleCoinSheet = (cId: string) => {
    setCoinId(cId);
    toggle();
  };

  return (
    <main>
      <CoinSheet opened={opened} coinId={coinId} onClose={toggle} />

      <CoinsTable onRowClick={handleToggleCoinSheet} />
    </main>
  );
}

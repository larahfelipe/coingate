'use client';

import { CoinSheet } from '@/components/coin-sheet/coin-sheet';
import { CoinsTable } from '@/components/coins-table';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useState } from 'react';

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

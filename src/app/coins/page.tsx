"use client";

import { CoinsTable } from "@/components/coins-table";

export default function CoinsPage() {
  const handleClick = (coinId: string) => {
    console.log(coinId)
  }

  return (
    <div>
      <CoinsTable onRowClick={handleClick} />
    </div>
  )
}

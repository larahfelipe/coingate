import type { ReactNode } from 'react';

export type AppSectionProps = {
  title: string;
  active: boolean;
  icon?: ReactNode;
  onClick: () => void;
};

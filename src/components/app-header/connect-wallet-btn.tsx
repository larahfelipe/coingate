import { type ComponentProps, type FC } from 'react';

import { WalletIcon } from 'lucide-react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

type ConnectWalletBtnProps = ComponentProps<'button'>;

export const ConnectWalletBtn: FC<ConnectWalletBtnProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={cn('rounded-xl shadow-none max-sm:hidden', className)}
    >
      <WalletIcon size={18} />
      connect wallet
    </Button>
  );
};

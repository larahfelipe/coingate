import { type ComponentProps, type FC } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { WalletIcon } from 'lucide-react';

type ConnectWalletBtnProps = ComponentProps<'button'>;

export const ConnectWalletBtn: FC<ConnectWalletBtnProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={cn('gap-2 rounded-xl shadow-none', className)}
    >
      <WalletIcon size={18} />

      <span className="max-sm:hidden">connect wallet</span>
    </Button>
  );
};

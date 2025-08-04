import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Wallet } from '@phosphor-icons/react';
import { ComponentProps, FC } from 'react';

type ConnectWalletBtnProps = ComponentProps<'button'> & {
  rootClassname?: ComponentProps<'div'>['className'];
  btnClassname?: ComponentProps<'button'>['className'];
};

export const ConnectWalletBtn: FC<ConnectWalletBtnProps> = ({
  rootClassname,
  btnClassname,
  disabled,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative w-fit rounded-xl p-[1.5px]',
        disabled
          ? 'cursor-not-allowed bg-slate-800'
          : 'group bg-gradient-to-br from-blue-700 to-blue-800',
        rootClassname,
      )}
    >
      <Button
        {...props}
        disabled={disabled}
        className={cn(
          'relative z-10 flex w-full items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-sm transition-all duration-300 bg-slate-900/75 text-slate-50 hover:bg-slate-900/70 group-hover:shadow-[0_0_16px_rgba(37,99,235,0.5)]',
          btnClassname,
        )}
      >
        <Wallet size={18} />
        <span className="max-sm:hidden">connect wallet</span>
      </Button>
    </div>
  );
};

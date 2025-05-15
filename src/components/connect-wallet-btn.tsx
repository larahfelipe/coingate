import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Wallet } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { ComponentProps, FC } from 'react';

type ConnectWalletBtnProps = ComponentProps<'button'> & {
  containerClassName?: ComponentProps<'div'>['className'];
  buttonClassName?: ComponentProps<'button'>['className'];
};

export const ConnectWalletBtn: FC<ConnectWalletBtnProps> = ({
  containerClassName,
  buttonClassName,
  disabled,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative w-fit mr-3 p-[2px] rounded-xl',
        disabled
          ? 'bg-muted/90 cursor-not-allowed'
          : 'group bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-yellow-500 hover:to-green-500 transition-all duration-500',
        containerClassName,
      )}
    >
      {!disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        >
          <div className="w-full h-full rounded-xl border-2 border-transparent bg-[conic-gradient(at_top_left,_#fff0_0%,_#fff4_10%,_#fff0_30%)] blur-sm opacity-30"></div>
        </motion.div>
      )}
      <Button
        {...props}
        disabled={disabled}
        className={cn(
          'relative z-10 rounded-xl group-hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300 bg-black/85 hover:bg-black/85 text-white',
          buttonClassName,
        )}
      >
        <Wallet size={16} className="text-white" />
        <span className="max-sm:hidden">Connect wallet</span>
      </Button>
    </div>
  );
};

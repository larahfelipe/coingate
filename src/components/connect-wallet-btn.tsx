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
        'relative w-fit rounded-lg p-[2px]',
        disabled
          ? 'cursor-not-allowed bg-slate-800'
          : 'group bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400',
        containerClassName,
      )}
    >
      {!disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
        >
          {/* The shimmer is a conic gradient with a thematic cyan color */}
          <div className="h-full w-full rounded-lg bg-[conic-gradient(at_top_left,transparent_30%,#06b6d4_50%,transparent_70%)] opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
        </motion.div>
      )}

      <Button
        {...props}
        disabled={disabled}
        className={cn(
          'relative z-10 flex w-full items-center gap-2 rounded-md px-4 py-2',
          // Applying a modern glassmorphism (frosted glass) effect
          'bg-slate-950/80 text-slate-50 backdrop-blur-sm',
          'transition-all duration-300 hover:bg-slate-950/70',
          // On hover, it reveals a blue glow that matches the site's theme
          'group-hover:shadow-[0_0_16px_rgba(37,99,235,0.5)]',
          buttonClassName,
        )}
      >
        <Wallet weight="bold" size={18} />
        <span className="max-sm:hidden font-semibold">Connect Wallet</span>
      </Button>
    </div>
  );
};

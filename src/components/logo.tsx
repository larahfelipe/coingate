import { cn } from '@/lib/utils';
import { Chakra_Petch } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['600'],
});

type LogoProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <div
        className={cn(
          'group w-fit flex items-center gap-1.5 animate-fade-in-left',
          className,
        )}
      >
        <Image
          priority
          src="/block.svg"
          alt="A white block"
          width={24}
          height={24}
          className="group-hover-logo"
        />
        <h1
          className={cn(
            chakraPetch.className,
            'font-semibold text-white text-xl tracking-wide group-hover-text-glow max-sm:hidden',
          )}
        >
          coingate
        </h1>
      </div>
    </Link>
  );
};

import { type ComponentProps, type FC } from 'react';

import { ExternalLink } from 'lucide-react';

import { cn } from '@/lib/utils';

type ExternalLinkBtnProps = {
  href?: string;
  className?: ComponentProps<'a'>['className'];
};

export const ExternalLinkBtn: FC<ExternalLinkBtnProps> = ({
  href,
  className,
}) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'transition-colors text-slate-400 hover:text-slate-200',
        className,
      )}
    >
      <ExternalLink className="size-5" />
    </a>
  );
};

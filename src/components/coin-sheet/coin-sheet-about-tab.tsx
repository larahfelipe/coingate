import { type ComponentProps, type FC, type ReactNode } from 'react';

import { Books, GithubLogo, Scroll } from '@phosphor-icons/react';
import { ExternalLink as ExternalLinkIcon, Info } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type CoingeckoV3CoinResponseData } from '@/types';

type CoinSheetAboutTabProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetAboutTab: FC<CoinSheetAboutTabProps> = ({ coinData }) => (
  <div className="rounded-xl border bg-card text-card-foreground">
    <AboutSection name={coinData.name} description={coinData.description} />

    <LinksSection links={coinData.links} />
  </div>
);

const AboutSection: FC<
  Pick<CoinSheetAboutTabProps['coinData'], 'name' | 'description'>
> = ({ name, description }) => (
  <section className="mb-6">
    <div className="flex items-center gap-2 mb-4 p-5">
      <Info className="size-4 text-primary" />

      <h3 className="text-sm font-medium">About {name}</h3>
    </div>

    <div className="max-h-100 p-5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line overflow-y-auto">
      {description.en || 'No description available.'}
    </div>
  </section>
);

const LinksSection: FC<Pick<CoinSheetAboutTabProps['coinData'], 'links'>> = ({
  links,
}) => {
  if (!links) return null;

  return (
    <section className="p-5 border-t">
      <h4 className="text-sm font-medium mb-3">Links</h4>

      <div className="flex flex-wrap gap-1">
        <ExternalLink
          href={links.homepage?.[0]}
          icon={<ExternalLinkIcon className="size-3" />}
          label="Website"
        />

        <ExternalLink
          href={links.whitepaper}
          icon={<Scroll className="size-3" />}
          label="Whitepaper"
        />

        <ExternalLink
          href={links.blockchain_site?.[0]}
          icon={<Books className="size-3" />}
          label="Explorer"
        />

        <ExternalLink
          href={links.repos_url?.github?.[0]}
          icon={<GithubLogo className="size-3" />}
          label="GitHub"
        />
      </div>
    </section>
  );
};

const ExternalLink: FC<{
  href?: string;
  label: string;
  icon: ReactNode;
  className?: ComponentProps<'a'>['className'];
}> = ({ href, icon, label, className }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${label}`}
      className={cn(
        'flex items-center gap-2 text-xs px-3 py-2 rounded-md border bg-muted/50 hover:bg-muted transition-colors text-foreground',
        className,
      )}
    >
      {icon}

      {label}
    </a>
  );
};

import { CoingeckoV3CoinResponseData } from '@/types';
import { Books, GithubLogo, Scroll } from '@phosphor-icons/react';
import { ExternalLink, Info } from 'lucide-react';
import { FC, ReactNode } from 'react';

type CoinSheetAboutTabProps = {
  coinData: CoingeckoV3CoinResponseData;
};

export const CoinSheetAboutTab: FC<CoinSheetAboutTabProps> = ({ coinData }) => (
  <div className="bg-slate-800/20 rounded-xl p-5 border backdrop-blur-sm">
    <AboutSection name={coinData.name} description={coinData.description} />
    <LinksSection links={coinData.links} />
  </div>
);

const AboutSection: FC<
  Pick<CoinSheetAboutTabProps['coinData'], 'name' | 'description'>
> = ({ name, description }) => (
  <section className="mb-6">
    <div className="flex items-center gap-2 mb-4">
      <Info className="size-4 text-cyan-400" />
      <h3 className="text-sm text-slate-200">About {name}</h3>
    </div>
    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
      {description.en || 'No description available.'}
    </div>
  </section>
);

const LinksSection: FC<Pick<CoinSheetAboutTabProps['coinData'], 'links'>> = ({
  links,
}) => {
  if (!links) return null;

  return (
    <section className="pt-4 border-t border-indigo-700/20">
      <h4 className="text-sm text-slate-200 mb-3">Links</h4>
      <div className="flex flex-wrap gap-3">
        <LinkButton
          href={links.homepage?.[0]}
          icon={<ExternalLink className="size-3" />}
          label="Website"
          colorClass="text-cyan-400 hover:text-cyan-300 bg-cyan-900/20 border-cyan-700/30 hover:border-cyan-500/50"
        />
        <LinkButton
          href={links.whitepaper}
          icon={<Scroll className="size-3" />}
          label="Whitepaper"
          colorClass="text-yellow-400 hover:text-yellow-300 bg-yellow-900/20 border-yellow-700/30 hover:border-yellow-500/50"
        />
        <LinkButton
          href={links.blockchain_site?.[0]}
          icon={<Books className="size-3" />}
          label="Explorer"
          colorClass="text-purple-400 hover:text-purple-300 bg-purple-900/20 border-purple-700/30 hover:border-purple-500/50"
        />
        <LinkButton
          href={links.repos_url?.github?.[0]}
          icon={<GithubLogo className="size-3" />}
          label="GitHub"
          colorClass="text-indigo-400 hover:text-indigo-300 bg-indigo-900/20 border-indigo-700/30 hover:border-indigo-500/50"
        />
      </div>
    </section>
  );
};

const LinkButton: FC<{
  href?: string;
  label: string;
  icon: ReactNode;
  colorClass: string;
}> = ({ href, icon, label, colorClass }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-md border transition-all ${colorClass}`}
      aria-label={`View ${label}`}
    >
      {icon}
      {label.toLowerCase()}
    </a>
  );
};

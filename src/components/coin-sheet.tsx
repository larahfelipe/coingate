import { PercentChange } from '@/components/percent-change';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui';
import { useCoingecko } from '@/hooks/use-coingecko';
import {
  Binoculars,
  Calendar,
  ChartLine,
  GithubLogo,
  Globe,
  GlobeHemisphereWest,
  Heart,
  Infinity,
  LinkSimple,
  PiggyBank,
  Ranking,
  Scroll,
  Star,
  ThumbsDown,
  ThumbsUp,
  Users,
} from '@phosphor-icons/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';

type CoinSheetProps = {
  opened: boolean;
  coinId: string | undefined;
  onClose: VoidFunction;
};

const formatCurrency = (value?: number) =>
  value?.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) ??
  '-';

export const CoinSheet: FC<CoinSheetProps> = ({ opened, coinId, onClose }) => {
  const { useQueryCoinById } = useCoingecko();
  const { isLoading, data: coin } = useQueryCoinById(coinId);

  if (isLoading || !coinId || !coin) return null;

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md overflow-y-auto p-4">
        <SheetHeader className="space-y-3">
          <SheetTitle className="flex items-center gap-4">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={48}
              height={48}
            />
            <div>
              <h2 className="text-xl font-semibold">{coin.name}</h2>
              <p className="text-sm text-muted-foreground uppercase">
                {coin.symbol}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <section>
          <Accordion type="single" collapsible>
            <AccordionItem value="about">
              <AccordionTrigger tabIndex={-1} className="text-sm cursor-pointer">
                About {coin.name} ({coin.symbol.toUpperCase()})
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                <SheetDescription>
                  {coin.description.en ?? 'No description available.'}
                </SheetDescription>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-3 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Ranking size={14} className="text-muted-foreground" />
              Rank
            </div>
            <div className="text-right font-medium">
              #{coin.market_cap_rank}
            </div>
            <div className="flex items-center gap-1.5">
              <GlobeHemisphereWest
                size={14}
                className="text-muted-foreground"
              />
              Country origin
            </div>
            <div className="text-right">{coin.country_origin || 'N/A'}</div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-muted-foreground" />
              Genesis date
            </div>
            <div className="text-right">
              {dayjs(coin.genesis_date).format('DD/MM/YYYY') || 'N/A'}
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-4">
            <ChartLine size={16} className="text-white" />
            Price & Performance
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>Current price</div>
            <div className="text-right font-medium">
              {formatCurrency(coin.market_data.current_price.usd)}
            </div>
            <div>1h</div>
            <PercentChange
              className="ml-auto"
              value={
                coin.market_data.price_change_percentage_1h_in_currency.usd
              }
            />
            <div>24h</div>
            <PercentChange
              className="ml-auto"
              value={
                coin.market_data.price_change_percentage_24h_in_currency.usd
              }
            />
            <div>7d</div>
            <PercentChange
              className="ml-auto"
              value={
                coin.market_data.price_change_percentage_7d_in_currency.usd
              }
            />
            <div>1M</div>
            <PercentChange
              className="ml-auto"
              value={
                coin.market_data.price_change_percentage_30d_in_currency.usd
              }
            />
            <div>1Y</div>
            <PercentChange
              className="ml-auto"
              value={
                coin.market_data.price_change_percentage_1y_in_currency.usd
              }
            />
            <div>ATH</div>
            <div className="text-right">
              {formatCurrency(coin.market_data.ath.usd)}
            </div>
            <div>ATL</div>
            <div className="text-right">
              {formatCurrency(coin.market_data.atl.usd)}
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-4">
            <PiggyBank size={16} className="text-white" />
            Supply
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>Circulating</div>
            <div className="text-right">
              {coin.market_data.circulating_supply?.toLocaleString()}
            </div>
            <div>Total</div>
            <div className="text-right">
              {coin.market_data.total_supply?.toLocaleString() ?? (
                <Infinity size={14} className="text-muted-foreground ml-auto" />
              )}
            </div>
            <div>Max</div>
            <div className="text-right">
              {coin.market_data.max_supply?.toLocaleString() ?? (
                <Infinity size={14} className="text-muted-foreground ml-auto" />
              )}
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-4">
            <Heart size={16} className="text-white" />
            Sentiment
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>Positive votes</div>
            <div className="flex items-center gap-1.5 ml-auto text-emerald-400">
              <ThumbsUp size={14} className='text-emerald-400' />
              {coin.sentiment_votes_up_percentage?.toFixed(1)}%
            </div>
            <div>Negative votes</div>
            <div className="flex items-center gap-1.5 ml-auto text-red-400">
              <ThumbsDown size={14} className='text-red-400' />
              {coin.sentiment_votes_down_percentage?.toFixed(1)}%
            </div>
            <div>Watchlisted</div>
            <div className="text-right">
              {coin.watchlist_portfolio_users?.toLocaleString()}
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-4">
            <Users size={16} className="text-white" />
            Community & Dev
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>Twitter</div>
            <div className="text-right">
              {coin.community_data.twitter_followers?.toLocaleString()}{' '}
              followers
            </div>
            <div>Reddit</div>
            <div className="text-right">
              {coin.community_data.reddit_subscribers?.toLocaleString()}{' '}
              subscriber(s)
            </div>
            <div>GitHub stars</div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Star size={14} className='text-muted-foreground' />
              {coin.developer_data.stars.toLocaleString()}
            </div>
            <div>Commits (4w)</div>
            <div className="text-right">
              {coin.developer_data.commit_count_4_weeks.toLocaleString()}
            </div>
          </div>
        </section>
        <section className="mt-6 space-y-2">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-4">
            <LinkSimple size={16} className="text-white" />
            Links
          </h3>
          <ul className="text-sm text-blue-400 space-y-3">
            {coin.links.homepage[0] && (
              <li>
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Globe size={14} className="text-blue-400" />
                  Website
                </a>
              </li>
            )}
            {coin.links.whitepaper && (
              <li>
                <a
                  href={coin.links.whitepaper}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Scroll size={14} className="text-blue-400" />
                  Whitepaper
                </a>
              </li>
            )}
            {coin.links.repos_url.github[0] && (
              <li>
                <a
                  href={coin.links.repos_url.github[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <GithubLogo size={14} className="text-blue-400" />
                  GitHub
                </a>
              </li>
            )}
            {coin.links.blockchain_site[0] && (
              <li>
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Binoculars size={14} className="text-blue-400" />
                  Explorer
                </a>
              </li>
            )}
          </ul>
        </section>
      </SheetContent>
    </Sheet>
  );
};

import React from 'react';
import { Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Coin } from '../types';

interface MainCoinBannerProps {
  coin: Coin;
  onSelectCoin: (coin: Coin) => void;
  showToast: (msg: string) => void;
}

export const MainCoinBanner: React.FC<MainCoinBannerProps> = ({
  coin,
  onSelectCoin,
  showToast,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(coin.ca);
    setCopied(true);
    showToast(`Copied $${coin.ticker} CA: ${coin.ca.slice(0, 8)}...`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section aria-label="Main DiumPad coin" className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card/40 px-5 py-5 sm:gap-6 backdrop-blur">
      {/* Coin Avatar */}
      <div className="relative">
        <img
          src={coin.imageUrl}
          alt={coin.name}
          className="h-14 w-14 shrink-0 rounded-full object-cover border-2 border-primary/50 shadow-md shadow-primary/20"
        />
        <div className="absolute -bottom-1 -right-1 bg-primary text-black p-0.5 rounded-full" title="pump.fun Certified">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Coin Title & Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Main DiumPad coin</p>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-highlight/15 text-highlight border border-highlight/30 font-medium">Bonded to Raydium</span>
        </div>
        <h2 className="mt-1 text-xl font-bold text-foreground flex items-center gap-2">
          {coin.name}
          <span className="text-sm font-mono font-normal text-muted-foreground">${coin.ticker}</span>
        </h2>
      </div>

      {/* Live now on pump.fun Button */}
      <a
        href="https://pump.fun"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Live now on pump.fun"
        className="flex h-10 w-full items-center justify-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 sm:w-auto shadow-sm transition-all group"
        title="Live now on pump.fun"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-bold text-emerald-400 tracking-wide font-mono">
          Live now on pump.fun
        </span>
        <span className="text-xs text-emerald-400 group-hover:translate-x-0.5 transition-transform">
          ↗
        </span>
      </a>

      {/* Market Cap & Pair stats */}
      <dl className="flex gap-6 text-xs">
        <div>
          <dt className="text-muted-foreground">Market cap</dt>
          <dd className="mt-1 font-semibold text-foreground font-mono">${coin.mcapUsd.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Pair</dt>
          <dd className="mt-1 font-semibold text-foreground font-mono">{coin.pair}</dd>
        </div>
      </dl>

      {/* View Coin CTA */}
      <button
        onClick={() => onSelectCoin(coin)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all launch-fill text-white hover:opacity-95 h-10 px-5 py-2 shadow-md shadow-primary/20"
      >
        View coin
        <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
};

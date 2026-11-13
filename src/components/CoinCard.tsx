import React, { useState } from 'react';
import { Star, Copy, Check } from 'lucide-react';
import { Coin } from '../types';

interface CoinCardProps {
  coin: Coin;
  isSaved: boolean;
  onToggleSave: (coinId: string) => void;
  onSelectCoin: (coin: Coin) => void;
  showToast: (msg: string) => void;
}

export const CoinCard: React.FC<CoinCardProps> = ({
  coin,
  isSaved,
  onToggleSave,
  onSelectCoin,
  showToast,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coin.ca.startsWith('Live')) {
      window.open('https://pump.fun', '_blank');
      showToast(`Opening $${coin.ticker} on pump.fun`);
      return;
    }
    navigator.clipboard.writeText(coin.ca);
    setCopied(true);
    showToast(`Copied $${coin.ticker} CA`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(coin.id);
    showToast(isSaved ? `Removed $${coin.ticker} from watchlist` : `Added $${coin.ticker} to watchlist`);
  };

  return (
    <article
      onClick={() => onSelectCoin(coin)}
      className="market-card group min-w-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Banner / Avatar Thumbnail */}
        <div className="relative block aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={coin.imageUrl}
            alt={coin.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border ${
              coin.progress >= 100
                ? 'bg-highlight/20 text-highlight border-highlight/40'
                : coin.progress >= 75
                ? 'bg-primary/20 text-primary border-primary/40'
                : 'bg-black/60 text-muted-foreground border-white/10'
            }`}>
              {coin.progress >= 100 ? 'Bonded' : `${coin.progress}% Bonded`}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                {coin.name}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-primary font-mono">
                ${coin.ticker}
                <span className="flex items-center gap-1 rounded-full border border-border px-1.5 py-px text-[10px] text-muted-foreground">
                  {coin.pair}
                </span>
              </p>
            </div>

            {/* Watchlist button */}
            <button
              onClick={handleSave}
              className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-8 w-8 hover:bg-accent ${
                isSaved ? 'text-amber-400' : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Watch coin"
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Copy CA button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 transition-colors"
              title="Copy CA address"
            >
              {copied ? <Check className="w-4 h-4 text-highlight" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Market Cap & Bond target */}
          <div className="mt-3 flex items-baseline justify-between text-xs">
            <span className="text-muted-foreground">
              MC <b className="text-sm font-mono text-foreground">${coin.mcapUsd.toLocaleString()}</b>
            </span>
            <span className="text-muted-foreground font-mono text-[11px]">
              {coin.currentSol} / {coin.targetSol} SOL
            </span>
          </div>

          {/* Bonding curve progress bar */}
          <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                coin.progress >= 100
                  ? 'bg-gradient-to-r from-highlight to-primary'
                  : 'bg-gradient-to-r from-primary to-brand'
              }`}
              style={{ width: `${Math.min(coin.progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fee Split Section */}
      <div className="p-4 pt-0">
        <div className="border-t border-border pt-3">
          <div className="flex h-1.5 overflow-hidden rounded-full" aria-label="Fee split">
            <div className="bg-primary" style={{ flexGrow: coin.feeSplit.airdrops, flexBasis: 0 }} title={`Airdrops: ${coin.feeSplit.airdrops}%`} />
            <div className="bg-brand" style={{ flexGrow: coin.feeSplit.buybacks, flexBasis: 0 }} title={`Buybacks: ${coin.feeSplit.buybacks}%`} />
            <div className="bg-magenta" style={{ flexGrow: coin.feeSplit.holderRewards, flexBasis: 0 }} title={`Holder Rewards: ${coin.feeSplit.holderRewards}%`} />
            <div className="bg-ember" style={{ flexGrow: coin.feeSplit.liquidity, flexBasis: 0 }} title={`Liquidity: ${coin.feeSplit.liquidity}%`} />
          </div>

          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            <span className="flex items-center gap-1 text-muted-foreground">
              <i className="h-1.5 w-1.5 rounded-full bg-primary" />
              Airdrops <b className="text-foreground font-mono">{coin.feeSplit.airdrops}%</b>
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <i className="h-1.5 w-1.5 rounded-full bg-brand" />
              Buybacks <b className="text-foreground font-mono">{coin.feeSplit.buybacks}%</b>
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <i className="h-1.5 w-1.5 rounded-full bg-magenta" />
              Rewards <b className="text-foreground font-mono">{coin.feeSplit.holderRewards}%</b>
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <i className="h-1.5 w-1.5 rounded-full bg-ember" />
              Liq <b className="text-foreground font-mono">{coin.feeSplit.liquidity}%</b>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

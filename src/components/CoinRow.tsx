import React, { useState } from 'react';
import { Star, Copy, Check } from 'lucide-react';
import { Coin } from '../types';

interface CoinRowProps {
  coin: Coin;
  isSaved: boolean;
  onToggleSave: (coinId: string) => void;
  onSelectCoin: (coin: Coin) => void;
  showToast: (msg: string) => void;
}

export const CoinRow: React.FC<CoinRowProps> = ({
  coin,
  isSaved,
  onToggleSave,
  onSelectCoin,
  showToast,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <tr
      onClick={() => onSelectCoin(coin)}
      className="border-b border-border hover:bg-card/70 transition-colors cursor-pointer group"
    >
      {/* Coin name & icon */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`transition-colors ${isSaved ? 'text-amber-400' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
          </button>
          <img
            src={coin.imageUrl}
            alt={coin.name}
            className="w-9 h-9 rounded-full object-cover border border-border"
          />
          <div>
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
              {coin.name}
              <span className="font-mono text-xs text-primary">${coin.ticker}</span>
            </div>
            <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
              <span>{coin.ca.slice(0, 6)}...{coin.ca.slice(-4)}</span>
              <button onClick={handleCopy} className="hover:text-foreground">
                {copied ? <Check className="w-3 h-3 text-highlight" /> : <Copy className="w-3 h-3" />}
              </button>
              {coin.isMainCoin && (
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  pump.fun
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Market Cap */}
      <td className="py-3 px-4 font-mono text-sm font-semibold text-foreground">
        ${coin.mcapUsd.toLocaleString()}
      </td>

      {/* Bonding Progress */}
      <td className="py-3 px-4">
        <div className="w-36">
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-1">
            <span>{coin.progress}%</span>
            <span>{coin.currentSol}/85 SOL</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                coin.progress >= 100
                  ? 'bg-highlight'
                  : 'bg-primary'
              }`}
              style={{ width: `${Math.min(coin.progress, 100)}%` }}
            />
          </div>
        </div>
      </td>

      {/* Fee Split */}
      <td className="py-3 px-4">
        <div className="w-44">
          <div className="flex h-1.5 overflow-hidden rounded-full mb-1">
            <div className="bg-primary" style={{ flexGrow: coin.feeSplit.airdrops }} />
            <div className="bg-brand" style={{ flexGrow: coin.feeSplit.buybacks }} />
            <div className="bg-magenta" style={{ flexGrow: coin.feeSplit.holderRewards }} />
            <div className="bg-ember" style={{ flexGrow: coin.feeSplit.liquidity }} />
          </div>
          <div className="flex gap-2 text-[10px] text-muted-foreground font-mono">
            <span>A:{coin.feeSplit.airdrops}%</span>
            <span>B:{coin.feeSplit.buybacks}%</span>
            <span>R:{coin.feeSplit.holderRewards}%</span>
            <span>L:{coin.feeSplit.liquidity}%</span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
          coin.status === 'bonded'
            ? 'bg-highlight/15 text-highlight border-highlight/30'
            : coin.status === 'almost'
            ? 'bg-primary/15 text-primary border-primary/30'
            : 'bg-muted text-muted-foreground border-border'
        }`}>
          {coin.status === 'bonded' ? 'Bonded' : coin.status === 'almost' ? 'Almost Bonded' : 'New'}
        </span>
      </td>
    </tr>
  );
};

import React from 'react';
import { X, Flame, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BuybackEvent } from '../types';

interface BuybacksModalProps {
  isOpen: boolean;
  onClose: () => void;
  buybacks: BuybackEvent[];
}

export const BuybacksModal: React.FC<BuybacksModalProps> = ({
  isOpen,
  onClose,
  buybacks,
}) => {
  if (!isOpen) return null;

  const totalBurned = buybacks.reduce((acc, curr) => acc + curr.tokensBurned, 0);
  const totalSolSpent = buybacks.reduce((acc, curr) => acc + curr.solSpent, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <Flame className="w-5 h-5 text-ember" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Automated Buybacks & Burns</h3>
              <p className="text-xs text-muted-foreground">Permanent deflationary burns funded directly by trading volume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl border border-border bg-background/50">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Total SOL Repurchased</span>
            <p className="text-xl font-bold font-mono text-foreground mt-1">{totalSolSpent.toFixed(2)} SOL</p>
          </div>
          <div className="p-3.5 rounded-2xl border border-border bg-background/50">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Tokens Burned</span>
            <p className="text-xl font-bold font-mono text-ember mt-1">{totalBurned.toLocaleString()}</p>
          </div>
        </div>

        {/* List */}
        <div className="mt-5 space-y-3">
          {buybacks.map((bb) => (
            <div
              key={bb.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/40 font-mono text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-ember/15 flex items-center justify-center text-ember">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-foreground">{bb.coinName} (${bb.coinTicker})</span>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>Burned {bb.tokensBurned.toLocaleString()} tokens</span>
                    <span>•</span>
                    <span>Spent {bb.solSpent} SOL</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground text-[11px]">{bb.timestamp}</span>
                <div className="text-primary text-[10px] flex items-center gap-1 justify-end mt-0.5">
                  Tx {bb.txHash} <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

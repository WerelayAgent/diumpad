import React from 'react';
import { X, Award, Coins, ArrowRight } from 'lucide-react';

interface HolderRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const HolderRewardsModal: React.FC<HolderRewardsModalProps> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-magenta/10 flex items-center justify-center text-magenta">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Holder Rewards & Dividends</h3>
              <p className="text-xs text-muted-foreground">Passive revenue sharing deposited straight to your wallet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Claim Banner */}
        <div className="mt-5 p-5 rounded-2xl border border-magenta/30 bg-gradient-to-r from-magenta/10 to-primary/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase">Unclaimed Rewards</span>
            <p className="text-2xl font-bold font-mono text-foreground mt-0.5">1.84 SOL <span className="text-sm text-magenta font-normal">($276.00)</span></p>
            <p className="text-xs text-muted-foreground mt-1">Accumulated from your holdings across 3 DiumPad coins</p>
          </div>
          <button
            onClick={() => showToast('Claimed 1.84 SOL in Holder Rewards to your connected wallet!')}
            className="launch-fill text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <Coins className="w-4 h-4" />
            Claim All Rewards
          </button>
        </div>

        {/* Breakdown table */}
        <div className="mt-5">
          <h4 className="text-xs font-mono uppercase text-muted-foreground mb-3">Rewards Breakdown by Token</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-background/40">
              <div>
                <span className="font-bold text-foreground">DiumPad ($DIUMPAD)</span>
                <span className="text-[11px] text-muted-foreground ml-2">Fee Split: 25%</span>
              </div>
              <span className="text-primary font-bold">1.20 SOL</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-background/40">
              <div>
                <span className="font-bold text-foreground">CyberDium ($CYBER)</span>
                <span className="text-[11px] text-muted-foreground ml-2">Fee Split: 60%</span>
              </div>
              <span className="text-primary font-bold">0.48 SOL</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-background/40">
              <div>
                <span className="font-bold text-foreground">HyperYield ($HYPER)</span>
                <span className="text-[11px] text-muted-foreground ml-2">Fee Split: 30%</span>
              </div>
              <span className="text-primary font-bold">0.16 SOL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, BookOpen, HelpCircle, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

interface DocsFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsFaqModal: React.FC<DocsFaqModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tab, setTab] = useState<'docs' | 'faq'>('docs');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">DiumPad Documentation & FAQ</h3>
              <p className="text-xs text-muted-foreground">pump.fun Architecture & Bonding Curve Specs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="mt-4 flex gap-2 border-b border-border pb-2 text-xs">
          <button
            onClick={() => setTab('docs')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              tab === 'docs' ? 'bg-primary text-black font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview & Architecture
          </button>
          <button
            onClick={() => setTab('faq')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              tab === 'faq' ? 'bg-primary text-black font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        {tab === 'docs' ? (
          <div className="mt-5 space-y-6 text-xs text-muted-foreground leading-relaxed">
            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-1.5">
                <Zap className="w-4 h-4 text-primary" />
                1. What is DiumPad?
              </h4>
              <p>
                DiumPad is the premier fair-launch platform powered by <strong>pump.fun</strong>. It allows anyone to create a Solana token in seconds with pre-programmed fee distribution mechanisms, turning standard speculative memecoins into self-sustaining community engines.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-brand" />
                2. Bonding Curve & 85 SOL Target
              </h4>
              <p>
                Every token launched on DiumPad begins on a pump.fun constant product bonding curve. As traders buy, price increases algorithmically. Once the bonding target of <strong>85 SOL</strong> is reached:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/80">
                <li>Trading on the initial curve closes automatically.</li>
                <li>All 85 SOL plus the reserved token supply are permanently migrated to a Raydium CPMM liquidity pool.</li>
                <li>Liquidity pool LP tokens are automatically burned, guaranteeing zero rug pulls.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-1.5">
                <RefreshCw className="w-4 h-4 text-magenta" />
                3. The 4-Way Fee Split ("Coins that give back")
              </h4>
              <p>
                Every creator customizes their token's 1-5% trading fee split across four transparent destination categories:
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                <div className="p-2.5 rounded-xl border border-border bg-background/50">
                  <span className="text-primary font-bold">Airdrops:</span> Automatically held in escrow and distributed via periodic snapshots to diamond hands.
                </div>
                <div className="p-2.5 rounded-xl border border-border bg-background/50">
                  <span className="text-brand font-bold">Buybacks:</span> Programmatically buys tokens from the open market and sends them to the incinerator burn address.
                </div>
                <div className="p-2.5 rounded-xl border border-border bg-background/50">
                  <span className="text-magenta font-bold">Holder Rewards:</span> Continuous pro-rata dividend yields claimable directly in SOL.
                </div>
                <div className="p-2.5 rounded-xl border border-border bg-background/50">
                  <span className="text-ember font-bold">Liquidity:</span> Deepens the backing liquidity floor to reduce price impact for future trades.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4 text-xs">
            <div className="p-3.5 rounded-xl border border-border bg-background/40">
              <p className="font-bold text-foreground mb-1">How much does it cost to launch a coin?</p>
              <p className="text-muted-foreground">Launching on DiumPad costs only 0.05 SOL to cover Solana network account rent and pump.fun initialization.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-background/40">
              <p className="font-bold text-foreground mb-1">Can the developer withdraw or drain liquidity before bonding?</p>
              <p className="text-muted-foreground">No. Bonding curve contracts are fully decentralized and non-custodial. Funds are locked by protocol rules until the 85 SOL threshold is achieved.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-background/40">
              <p className="font-bold text-foreground mb-1">Which wallets are supported?</p>
              <p className="text-muted-foreground">All major Solana standard wallets including Phantom, Solflare, Backpack, and OKX Wallet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

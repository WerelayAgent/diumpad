import React from 'react';
import { X, Gift, CheckCircle, Clock } from 'lucide-react';
import { AirdropEvent } from '../types';

interface AirdropsModalProps {
  isOpen: boolean;
  onClose: () => void;
  airdrops: AirdropEvent[];
  showToast: (msg: string) => void;
}

export const AirdropsModal: React.FC<AirdropsModalProps> = ({
  isOpen,
  onClose,
  airdrops,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Fee-Funded Airdrops</h3>
              <p className="text-xs text-muted-foreground">Automated token rewards generated from trading volume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {airdrops.map((ad) => (
            <div
              key={ad.id}
              className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">{ad.coinName}</span>
                  <span className="font-mono text-xs text-primary">${ad.coinTicker}</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span>Eligible: {ad.eligibleHolders} wallets</span>
                  <span>•</span>
                  <span>Pool: {ad.amountSol} SOL</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono flex items-center gap-1 ${
                  ad.status === 'Upcoming'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-highlight/10 text-highlight border border-highlight/20'
                }`}>
                  {ad.status === 'Upcoming' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                  {ad.date}
                </span>
                {ad.status === 'Upcoming' ? (
                  <button
                    onClick={() => showToast(`Snapshot recorded for $${ad.coinTicker} airdrop!`)}
                    className="launch-fill text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    Check Eligibility
                  </button>
                ) : (
                  <button
                    onClick={() => showToast(`Claimed $${ad.coinTicker} airdrop reward!`)}
                    className="bg-highlight/20 text-highlight border border-highlight/40 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-highlight/30 transition-colors"
                  >
                    Claimed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3.5 rounded-2xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground flex items-center justify-between">
          <span>How it works: Coins with an Airdrop fee split automatically channel a % of every swap into holder drops.</span>
        </div>
      </div>
    </div>
  );
};

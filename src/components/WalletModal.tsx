import React from 'react';
import { X, Check, Copy, LogOut, PlusCircle, ShieldCheck } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletConnected: boolean;
  walletAddress: string;
  walletBalance: number;
  onConnect: (walletName: string) => void;
  onDisconnect: () => void;
  onFaucet: () => void;
  showToast: (msg: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  walletConnected,
  walletAddress,
  walletBalance,
  onConnect,
  onDisconnect,
  onFaucet,
  showToast,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    showToast('Copied wallet address');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-display text-lg font-bold text-foreground">
            {walletConnected ? 'Solana Wallet' : 'Connect a Wallet'}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {walletConnected ? (
          <div className="mt-5 space-y-4">
            {/* Connected status & address */}
            <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
                  Connected via Phantom
                </span>
                <span className="text-xs font-mono font-bold text-primary">Mainnet Beta</span>
              </div>
              <div className="flex items-center justify-between bg-background/80 p-2.5 rounded-xl border border-border">
                <span className="font-mono text-xs text-foreground truncate max-w-[240px]">
                  {walletAddress}
                </span>
                <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
                  {copied ? <Check className="w-4 h-4 text-highlight" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Balance Card */}
            <div className="p-4 rounded-2xl border border-border bg-background/50 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Solana Balance</span>
                <p className="text-2xl font-bold font-mono text-foreground mt-0.5">{walletBalance.toFixed(2)} SOL</p>
              </div>
              <button
                onClick={onFaucet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                title="Simulate adding testnet/devnet SOL"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                +2.0 SOL
              </button>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={() => {
                onDisconnect();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-background hover:bg-magenta/10 hover:border-magenta/40 hover:text-magenta text-xs font-semibold text-muted-foreground transition-all"
            >
              <LogOut className="w-4 h-4" />
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {/* Phantom */}
            <button
              onClick={() => onConnect('Phantom')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-border bg-background/60 hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 128 128" className="h-6 w-6 fill-current">
                    <path d="M64 10C33 10 10 35 10 66v44c0 6 7 9 11 5l7-7 7 7c3 3 8 3 11 0l7-7 7 7c3 3 8 3 11 0l7-7 7 7c3 3 8 3 11 0l7-7 7 7c4 4 11 1 11-5V66c0-31-23-56-54-56h-4Zm-17 44a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm34 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Phantom</p>
                  <p className="text-[11px] text-muted-foreground">Most popular Solana wallet</p>
                </div>
              </div>
              <span className="text-xs font-mono text-primary font-medium">Connect →</span>
            </button>

            {/* Solflare */}
            <button
              onClick={() => onConnect('Solflare')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-border bg-background/60 hover:border-brand/50 hover:bg-brand/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Solflare</p>
                  <p className="text-[11px] text-muted-foreground">Advanced security features</p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand font-medium">Connect →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, Wallet, ExternalLink, HelpCircle, BookOpen, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCreateModal: () => void;
  openWalletModal: () => void;
  openDocsModal: () => void;
  walletConnected: boolean;
  walletAddress: string;
  walletBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openCreateModal,
  openWalletModal,
  openDocsModal,
  walletConnected,
  walletAddress,
  walletBalance,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="relative z-30 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="glass-panel mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border px-3 py-2.5 sm:px-4">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="mr-auto flex items-center gap-2.5 sm:mr-6 text-left transition-transform hover:scale-[1.02]"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary via-brand to-magenta flex items-center justify-center p-0.5 shadow-lg shadow-primary/20">
            <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5">
              DiumPad
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">SOL</span>
            </span>
          </div>
        </button>

        {/* Main Nav */}
        <nav aria-label="Main navigation" className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] sm:order-none sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible">
          <button
            onClick={() => setActiveTab('coins')}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'coins' ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Coins
          </button>
          <button
            onClick={openCreateModal}
            className="rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground flex items-center gap-1"
          >
            <span>Create</span>
            <span className="text-[10px] bg-brand/20 text-brand px-1 rounded font-mono">0.05 SOL</span>
          </button>
          <button
            onClick={() => setActiveTab('airdrops')}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'airdrops' ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Airdrops
          </button>
          <button
            onClick={() => setActiveTab('buybacks')}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'buybacks' ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Buybacks
          </button>
          <button
            onClick={() => setActiveTab('holder-rewards')}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'holder-rewards' ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Holder rewards
          </button>

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground"
            >
              More
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreOpen && (
              <div 
                className="absolute left-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  onClick={() => { openDocsModal(); setMoreOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  Documentation
                </button>
                <button
                  onClick={() => { openDocsModal(); setMoreOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-brand" />
                  FAQ & Mechanics
                </button>
                <a
                  href="https://raydium.io/launchpad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-highlight" />
                    Raydium LaunchLab
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons & Wallet Connect */}
        <div className="ml-auto flex items-center gap-2">
          {/* X / Twitter Link */}
          <a
            href="https://x.com/DiumPad"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DiumPad on X"
            className="inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent h-9 w-9 transition-colors"
            title="DiumPad on X"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
            </svg>
          </a>

          {/* Raydium LaunchLab link */}
          <a
            href="https://raydium.io/launchpad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raydium LaunchLab"
            className="inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent h-9 w-9 transition-colors"
            title="Raydium LaunchLab"
          >
            <img
              src="https://img-v1.raydium.io/icon/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R.png"
              alt="Raydium"
              className="h-5 w-5 rounded-full"
              onError={(e) => {
                // Fallback SVG if external image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </a>

          {/* Wallet Button */}
          <div className="relative shrink-0">
            <button
              onClick={openWalletModal}
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all rounded-xl text-xs h-9 px-3.5 ${
                walletConnected
                  ? 'bg-card border border-primary/40 text-primary hover:border-primary shadow-sm'
                  : 'launch-fill text-white hover:opacity-90'
              }`}
              title="Connect Phantom or Solflare wallet"
            >
              {walletConnected ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-highlight animate-pulse" />
                  <span className="font-mono">{walletBalance.toFixed(2)} SOL</span>
                  <span className="text-muted-foreground font-mono text-[11px] hidden sm:inline">
                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                  </span>
                </>
              ) : (
                <>
                  {/* Phantom ghost icon */}
                  <svg viewBox="0 0 128 128" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                    <path d="M64 10C33 10 10 35 10 66v44c0 6 7 9 11 5l7-7 7 7c3 3 8 3 11 0l7-7 7 7c3 3 8 3 11 0l7-7 7 7c3 3 8 3 11 0l7-7 7 7c4 4 11 1 11-5V66c0-31-23-56-54-56h-4Zm-17 44a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm34 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" />
                  </svg>
                  <span className="font-medium">Connect wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

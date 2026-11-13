import React from 'react';
import { ArrowRight, Sparkles, Layers, TrendingUp, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  totalCoins: number;
  openCreateModal: () => void;
  scrollToCoins: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalCoins,
  openCreateModal,
  scrollToCoins,
}) => {
  return (
    <header className="hero-panel overflow-hidden rounded-3xl border border-border px-6 py-10 sm:px-12 sm:py-14 relative">
      <div className="cine-sweep"></div>

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        {/* Left Column Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur-md shadow-inner">
            <span className="h-2 w-2 rounded-full bg-highlight animate-pulse"></span>
            <span>Launches opening soon</span>
            <span className="text-border">·</span>
            <span className="text-primary font-medium flex items-center gap-1">
              Powered by pump.fun
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight leading-[1.05] sm:text-6xl text-foreground">
            Coins that give<br />
            <span className="text-gradient">back.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
            Launch a Solana coin in seconds. You choose where its trading fees go: <span className="text-primary font-medium">airdrops</span>, <span className="text-brand font-medium">buybacks</span>, <span className="text-magenta font-medium">holder rewards</span> or <span className="text-ember font-medium">liquidity</span>.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold cursor-pointer transition-all launch-fill text-white hover:opacity-95 h-11 rounded-full px-8 shadow-lg shadow-primary/20"
            >
              Launch a coin
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToCoins}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-all border border-border bg-card/60 hover:bg-accent hover:text-foreground h-11 rounded-full px-8 backdrop-blur"
            >
              Explore coins
            </button>
          </div>

          {/* Protocol Metrics */}
          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-background/50 px-4 py-3.5 backdrop-blur">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Coins</dt>
              <dd className="mt-1 font-display text-xl font-bold text-foreground">{totalCoins}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-background/50 px-4 py-3.5 backdrop-blur">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Bonds at</dt>
              <dd className="mt-1 font-display text-xl font-bold text-primary">85 SOL</dd>
            </div>
            <div className="rounded-2xl border border-border bg-background/50 px-4 py-3.5 backdrop-blur">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Launch cost</dt>
              <dd className="mt-1 font-display text-xl font-bold text-brand">0.05 SOL</dd>
            </div>
          </dl>
        </div>

        {/* Right Animated Orbital Stage */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[420px] sm:block">
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-tr from-primary/30 via-brand/30 to-magenta/20 blur-3xl animate-pulse-glow" />
          
          {/* Orbital Rings */}
          <div className="cine-ring" />
          <div className="cine-ring inset-[10%]" style={{ animationDuration: '16s', animationDirection: 'reverse' }} />
          <div className="cine-ring inset-[22%] border-primary/20" style={{ animationDuration: '10s' }} />

          {/* Center Holographic Seal */}
          <div className="absolute inset-[24%] rounded-full bg-gradient-to-br from-card via-[#161d2e] to-card border-2 border-primary/40 shadow-2xl flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary via-brand to-magenta p-0.5 shadow-xl shadow-primary/30 flex items-center justify-center">
              <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            <span className="font-display font-bold text-lg text-foreground mt-3 tracking-wide">DiumPad</span>
            <span className="text-[11px] font-mono text-muted-foreground">pump.fun Engine</span>
          </div>

          {/* Floating Meteors */}
          <span className="cine-meteor right-4 top-[18%]" />
          <span className="cine-meteor right-12 top-[62%]" style={{ animationDelay: '2.2s' }} />
          <span className="cine-meteor left-8 top-[34%]" style={{ animationDelay: '1.4s', width: '5px', height: '5px' }} />
        </div>
      </div>

      {/* 3-Step Flywheel Section */}
      <ol className="relative z-10 mt-12 grid gap-4 border-t border-border pt-7 sm:grid-cols-3">
        <li className="flex gap-3.5 bg-background/30 p-3.5 rounded-2xl border border-border/50">
          <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-xs font-bold text-primary shrink-0">
            01
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              Create
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Name, ticker, picture. Pick your custom fee split allocation.
            </p>
          </div>
        </li>
        <li className="flex gap-3.5 bg-background/30 p-3.5 rounded-2xl border border-border/50">
          <div className="h-8 w-8 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center font-mono text-xs font-bold text-brand shrink-0">
            02
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand" />
              Trade on the curve
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Price rises as users buy on the bonding curve with zero rug risk.
            </p>
          </div>
        </li>
        <li className="flex gap-3.5 bg-background/30 p-3.5 rounded-2xl border border-border/50">
          <div className="h-8 w-8 rounded-xl bg-highlight/10 border border-highlight/30 flex items-center justify-center font-mono text-xs font-bold text-highlight shrink-0">
            03
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-highlight" />
              Bond to Raydium
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              At 85 SOL target, liquidity automatically locks into a full Raydium pool.
            </p>
          </div>
        </li>
      </ol>
    </header>
  );
};

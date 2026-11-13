import React, { useState } from 'react';
import { X, Copy, Check, TrendingUp, ShieldCheck, ArrowRight, ArrowDownUp, Users, History, PieChart, Sparkles } from 'lucide-react';
import { Coin, Trade } from '../types';

interface CoinDetailModalProps {
  coin: Coin | null;
  onClose: () => void;
  trades: Trade[];
  onExecuteTrade: (trade: { coinId: string; type: 'buy' | 'sell'; amountSol: number; amountToken: number }) => void;
  showToast: (msg: string) => void;
  walletBalance: number;
}

export const CoinDetailModal: React.FC<CoinDetailModalProps> = ({
  coin,
  onClose,
  trades,
  onExecuteTrade,
  showToast,
  walletBalance,
}) => {
  const [activeTab, setActiveTab] = useState<'trades' | 'feeSplit' | 'holders'>('trades');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [solAmount, setSolAmount] = useState('0.5');
  const [copied, setCopied] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  if (!coin) return null;

  const coinTrades = trades.filter((t) => t.coinId === coin.id || coin.isMainCoin);

  const parsedSol = Number(solAmount) || 0;
  // Estimated token output based on bonding curve price
  const estimatedTokens = parsedSol > 0 ? Math.round(parsedSol / coin.priceSol) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(coin.ca);
    setCopied(true);
    showToast(`Copied $${coin.ticker} CA`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedSol <= 0) {
      showToast('Please enter a valid amount');
      return;
    }
    if (tradeType === 'buy' && parsedSol > walletBalance) {
      showToast('Insufficient SOL balance in wallet');
      return;
    }

    setIsSwapping(true);
    setTimeout(() => {
      onExecuteTrade({
        coinId: coin.id,
        type: tradeType,
        amountSol: parsedSol,
        amountToken: estimatedTokens,
      });
      setIsSwapping(false);
      showToast(`Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${estimatedTokens.toLocaleString()} $${coin.ticker}!`);
    }, 800);
  };

  // Fee portions for this trade
  const tradeFeeSol = parsedSol * 0.01; // 1% platform trading fee

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-6 max-h-[92vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3.5">
            <img
              src={coin.imageUrl}
              alt={coin.name}
              className="h-12 w-12 rounded-full object-cover border-2 border-primary/40 shadow-md shadow-primary/10"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground font-display">{coin.name}</h3>
                <span className="text-sm font-mono text-primary font-semibold">${coin.ticker}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                  {coin.pair}
                </span>
                {coin.status === 'bonded' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-highlight/15 text-highlight border border-highlight/30">
                    Bonded to Raydium
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px] sm:max-w-xs select-all">
                  {coin.ca}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="Copy CA"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-highlight" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {coin.isMainCoin && (
                  <a
                    href={`https://pump.fun/coin/${coin.ca}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors font-mono ml-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live on pump.fun ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Info Grid: Bonding curve progress & Quick Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase">Bonding Curve</p>
            <p className="mt-1 text-2xl font-bold font-mono text-primary">{coin.progress}%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
              {coin.currentSol.toFixed(1)} / {coin.targetSol} SOL raised
            </p>
            <div className="mt-2.5 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-brand transition-all duration-500"
                style={{ width: `${Math.min(coin.progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase">Market Cap</p>
            <p className="mt-1 text-2xl font-bold font-mono text-foreground">${coin.mcapUsd.toLocaleString()}</p>
            <p className="text-[11px] text-highlight mt-0.5 font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% 24h
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase">Liquidity Target</p>
            <p className="mt-1 text-2xl font-bold font-mono text-brand">85 SOL</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Automated Raydium CPMM Pool</p>
          </div>
        </div>

        {/* Main Section: Chart & Swap Terminal */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: Chart & Fee Mechanism */}
          <div className="rounded-2xl border border-border bg-background/40 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  pump.fun Bonding Curve Chart
                </span>
                <span className="text-xs font-mono text-muted-foreground">Constant Product Formula</span>
              </div>

              {/* Interactive SVG Chart representation */}
              <div className="relative h-56 w-full rounded-xl bg-card/60 border border-border/80 p-3 overflow-hidden flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                  {/* Curve Path */}
                  <path
                    d="M 10 140 Q 150 135 250 80 T 390 15"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  {/* Area fill */}
                  <path
                    d="M 10 140 Q 150 135 250 80 T 390 15 L 390 150 L 10 150 Z"
                    fill="url(#chartGrad)"
                  />
                  {/* Current position marker */}
                  <circle cx="280" cy="65" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                </svg>

                <div className="absolute top-4 left-4 text-xs font-mono bg-background/80 px-2 py-1 rounded border border-border">
                  1 SOL = {(1 / coin.priceSol).toLocaleString()} {coin.ticker}
                </div>
              </div>
            </div>

            {/* Fee Split Highlights */}
            <div className="mt-5 rounded-xl border border-border/80 bg-card p-3.5">
              <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-primary" />
                Coins That Give Back — Fee Distribution
              </p>
              <div className="flex h-2 overflow-hidden rounded-full mb-2.5">
                <div className="bg-primary" style={{ width: `${coin.feeSplit.airdrops}%` }} />
                <div className="bg-brand" style={{ width: `${coin.feeSplit.buybacks}%` }} />
                <div className="bg-magenta" style={{ width: `${coin.feeSplit.holderRewards}%` }} />
                <div className="bg-ember" style={{ width: `${coin.feeSplit.liquidity}%` }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <span className="text-muted-foreground"><i className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1" />Airdrop: <strong className="text-foreground">{coin.feeSplit.airdrops}%</strong></span>
                <span className="text-muted-foreground"><i className="inline-block w-1.5 h-1.5 rounded-full bg-brand mr-1" />Buyback: <strong className="text-foreground">{coin.feeSplit.buybacks}%</strong></span>
                <span className="text-muted-foreground"><i className="inline-block w-1.5 h-1.5 rounded-full bg-magenta mr-1" />Rewards: <strong className="text-foreground">{coin.feeSplit.holderRewards}%</strong></span>
                <span className="text-muted-foreground"><i className="inline-block w-1.5 h-1.5 rounded-full bg-ember mr-1" />Liquidity: <strong className="text-foreground">{coin.feeSplit.liquidity}%</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Instant Swap Terminal */}
          <div className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between">
            <div>
              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-background p-1 border border-border mb-4">
                <button
                  type="button"
                  onClick={() => setTradeType('buy')}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    tradeType === 'buy' ? 'bg-primary text-black shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Buy {coin.ticker}
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('sell')}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    tradeType === 'sell' ? 'bg-magenta text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sell {coin.ticker}
                </button>
              </div>

              {/* Amount Input */}
              <form onSubmit={handleSwap} className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Pay</span>
                    <span className="font-mono">Wallet: {walletBalance.toFixed(2)} SOL</span>
                  </div>
                  <div className="flex items-center rounded-xl border border-border bg-background px-3 py-2">
                    <input
                      type="number"
                      step="0.05"
                      min="0.01"
                      value={solAmount}
                      onChange={(e) => setSolAmount(e.target.value)}
                      className="w-full bg-transparent text-sm font-mono font-bold text-foreground focus:outline-none"
                    />
                    <span className="text-xs font-mono font-bold text-primary ml-2">SOL</span>
                  </div>
                </div>

                {/* Quick Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {['0.1', '0.5', '1.0', '2.5'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSolAmount(amt)}
                      className="rounded-lg border border-border bg-background/60 py-1 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      {amt} SOL
                    </button>
                  ))}
                </div>

                {/* Receive estimate */}
                <div className="rounded-xl border border-border/80 bg-background/50 p-3 text-xs">
                  <div className="flex justify-between text-muted-foreground mb-1">
                    <span>You Receive (Est.)</span>
                    <span className="font-mono font-bold text-foreground">
                      {estimatedTokens.toLocaleString()} ${coin.ticker}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Platform Fee (1%)</span>
                    <span className="font-mono">{tradeFeeSol.toFixed(4)} SOL</span>
                  </div>
                </div>

                {/* Execute Swap Button */}
                <button
                  type="submit"
                  disabled={isSwapping || parsedSol <= 0}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
                    tradeType === 'buy'
                      ? 'launch-fill text-white shadow-primary/20 hover:opacity-95'
                      : 'bg-magenta text-white shadow-magenta/20 hover:opacity-95'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSwapping ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Broadcasting Tx...</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownUp className="w-4 h-4" />
                      <span>{tradeType === 'buy' ? `Buy $${coin.ticker}` : `Sell $${coin.ticker}`}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-3 font-mono">
              Protected by pump.fun constant product bonding curve.
            </p>
          </div>
        </div>

        {/* Bottom Tabs: Trades / Fee Details / Holders */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex gap-4 border-b border-border pb-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab('trades')}
              className={`flex items-center gap-1.5 pb-2 transition-colors ${
                activeTab === 'trades' ? 'text-primary border-b-2 border-primary font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Recent Trades ({coinTrades.length})
            </button>
            <button
              onClick={() => setActiveTab('holders')}
              className={`flex items-center gap-1.5 pb-2 transition-colors ${
                activeTab === 'holders' ? 'text-primary border-b-2 border-primary font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Holders ({coin.holdersCount})
            </button>
          </div>

          {activeTab === 'trades' ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/50">
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">SOL</th>
                    <th className="py-2 px-3">Tokens</th>
                    <th className="py-2 px-3">Trader</th>
                    <th className="py-2 px-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {coinTrades.map((t) => (
                    <tr key={t.id} className="border-b border-border/30 hover:bg-background/40">
                      <td className="py-2 px-3">
                        <span className={`font-bold ${t.type === 'buy' ? 'text-highlight' : 'text-magenta'}`}>
                          {t.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-foreground">{t.amountSol} SOL</td>
                      <td className="py-2 px-3 text-foreground">{t.amountToken.toLocaleString()}</td>
                      <td className="py-2 px-3 text-muted-foreground">{t.trader}</td>
                      <td className="py-2 px-3 text-muted-foreground">{t.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl border border-border bg-background/30 flex justify-between">
                <span className="text-muted-foreground">1. Raydium Bonding Vault</span>
                <span className="text-primary font-bold">79.31%</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-background/30 flex justify-between">
                <span className="text-muted-foreground">2. Creator ({coin.creator})</span>
                <span className="text-foreground font-bold">5.40%</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-background/30 flex justify-between">
                <span className="text-muted-foreground">3. Diamond Hands (8xK2...9pQr)</span>
                <span className="text-foreground font-bold">3.25%</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-background/30 flex justify-between">
                <span className="text-muted-foreground">4. Early Supporter (3vNp...1wTx)</span>
                <span className="text-foreground font-bold">2.10%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { Coin, FeeSplit } from '../types';

interface CreateCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCoinCreated: (coin: Coin) => void;
  showToast: (msg: string) => void;
  walletBalance: number;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
];

export const CreateCoinModal: React.FC<CreateCoinModalProps> = ({
  isOpen,
  onClose,
  onCoinCreated,
  showToast,
  walletBalance,
}) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [initialBuy, setInitialBuy] = useState('0');
  const [isDeploying, setIsDeploying] = useState(false);

  // Fee split
  const [feeSplit, setFeeSplit] = useState<FeeSplit>({
    airdrops: 25,
    buybacks: 25,
    holderRewards: 25,
    liquidity: 25,
  });

  if (!isOpen) return null;

  const totalSplit = feeSplit.airdrops + feeSplit.buybacks + feeSplit.holderRewards + feeSplit.liquidity;
  const isSplitValid = totalSplit === 100;

  const handleSliderChange = (key: keyof FeeSplit, val: number) => {
    setFeeSplit((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleEqualize = () => {
    setFeeSplit({ airdrops: 25, buybacks: 25, holderRewards: 25, liquidity: 25 });
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ticker.trim()) {
      showToast('Please enter both coin name and ticker');
      return;
    }
    if (!isSplitValid) {
      showToast('Fee split must sum to exactly 100%');
      return;
    }

    setIsDeploying(true);

    setTimeout(() => {
      // Generate random Solana-like address
      const randomCa = Array.from({ length: 44 }, () =>
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[Math.floor(Math.random() * 58)]
      ).join('');

      const newCoin: Coin = {
        id: `coin-${Date.now()}`,
        name: name.trim(),
        ticker: ticker.trim().toUpperCase(),
        description: description.trim() || 'Fair launched on DiumPad via Raydium LaunchLab.',
        imageUrl: selectedAvatar,
        ca: randomCa,
        pair: 'SOL',
        priceSol: 0.00001,
        priceUsd: 0.0015,
        mcapUsd: 1500,
        currentSol: Number(initialBuy) || 0,
        targetSol: 85,
        progress: Math.min(Math.round(((Number(initialBuy) || 0) / 85) * 100), 100),
        feeSplit: { ...feeSplit },
        status: (Number(initialBuy) || 0) >= 70 ? 'almost' : 'new',
        holdersCount: 1,
        txsCount: 1,
        createdAt: 'Just now',
        creator: 'Connected User',
      };

      onCoinCreated(newCoin);
      setIsDeploying(false);
      showToast(`Successfully launched $${newCoin.ticker} on Raydium LaunchLab!`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Launch a Coin on Raydium</h3>
              <p className="text-xs text-muted-foreground">Raydium LaunchLab bonding curve with automated fee splits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleDeploy} className="mt-5 space-y-4">
          {/* Name & Ticker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">Coin Name</label>
              <input
                type="text"
                placeholder="e.g. SolNova"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">Ticker / Symbol</label>
              <input
                type="text"
                placeholder="e.g. NOVA"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground uppercase placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Description (Optional)</label>
            <textarea
              placeholder="Tell traders about your coin, vision, and community..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Select Coin Avatar</label>
            <div className="flex items-center gap-3">
              {PRESET_AVATARS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`relative h-12 w-12 rounded-full overflow-hidden border-2 transition-all ${
                    selectedAvatar === url ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="preset" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Fee Split Customizer */}
          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">Fee Split Distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold ${isSplitValid ? 'text-highlight' : 'text-magenta'}`}>
                  Total: {totalSplit}% {isSplitValid ? '✓' : '(Must be 100%)'}
                </span>
                <button
                  type="button"
                  onClick={handleEqualize}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-muted-foreground hover:text-foreground"
                >
                  25% Each
                </button>
              </div>
            </div>

            {/* Split Progress Bar */}
            <div className="h-2 w-full rounded-full overflow-hidden flex bg-muted mb-4">
              <div className="bg-primary" style={{ width: `${feeSplit.airdrops}%` }} />
              <div className="bg-brand" style={{ width: `${feeSplit.buybacks}%` }} />
              <div className="bg-magenta" style={{ width: `${feeSplit.holderRewards}%` }} />
              <div className="bg-ember" style={{ width: `${feeSplit.liquidity}%` }} />
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-primary" /> Airdrops</span>
                  <span className="font-mono text-primary font-bold">{feeSplit.airdrops}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={feeSplit.airdrops}
                  onChange={(e) => handleSliderChange('airdrops', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-brand" /> Buybacks</span>
                  <span className="font-mono text-brand font-bold">{feeSplit.buybacks}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={feeSplit.buybacks}
                  onChange={(e) => handleSliderChange('buybacks', Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-magenta" /> Holder rewards</span>
                  <span className="font-mono text-magenta font-bold">{feeSplit.holderRewards}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={feeSplit.holderRewards}
                  onChange={(e) => handleSliderChange('holderRewards', Number(e.target.value))}
                  className="w-full accent-magenta"
                />
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-ember" /> Liquidity</span>
                  <span className="font-mono text-ember font-bold">{feeSplit.liquidity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={feeSplit.liquidity}
                  onChange={(e) => handleSliderChange('liquidity', Number(e.target.value))}
                  className="w-full accent-ember"
                />
              </div>
            </div>
          </div>

          {/* Initial Dev Buy */}
          <div className="rounded-2xl border border-border bg-background/50 p-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Initial Dev Buy (Optional)</p>
              <p className="text-[11px] text-muted-foreground">Snipe your own coin on launch with zero slippage.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                step="0.1"
                value={initialBuy}
                onChange={(e) => setInitialBuy(e.target.value)}
                className="w-24 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-right font-mono text-foreground focus:outline-none focus:border-primary"
              />
              <span className="text-xs font-mono text-muted-foreground">SOL</span>
            </div>
          </div>

          {/* Protocol Fees Summary */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-highlight" />
              Raydium LaunchLab Fee: <strong className="text-foreground font-mono">0.05 SOL</strong>
            </span>
            <span className="font-mono">Bonding Target: <strong className="text-primary">85 SOL</strong></span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border bg-background py-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDeploying || !isSplitValid}
              className="flex-1 rounded-xl launch-fill py-2.5 text-xs font-semibold text-white hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDeploying ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Deploying to Raydium...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Coin (0.05 SOL)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

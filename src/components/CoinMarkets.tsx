import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List, RotateCcw, Star } from 'lucide-react';
import { Coin } from '../types';
import { CoinCard } from './CoinCard';
import { CoinRow } from './CoinRow';

interface CoinMarketsProps {
  coins: Coin[];
  savedCoinIds: string[];
  onToggleSave: (coinId: string) => void;
  onSelectCoin: (coin: Coin) => void;
  showToast: (msg: string) => void;
  refreshCoins: () => void;
}

export const CoinMarkets: React.FC<CoinMarketsProps> = ({
  coins,
  savedCoinIds,
  onToggleSave,
  onSelectCoin,
  showToast,
  refreshCoins,
}) => {
  const [activeCategory, setActiveCategory] = useState<'new' | 'almost' | 'bonded' | 'saved'>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'marketcap' | 'volume'>('newest');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');
  const [minProgress, setMinProgress] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Filter & sort logic
  const filteredCoins = useMemo(() => {
    return coins.filter((coin) => {
      // Category filter
      if (activeCategory === 'saved') {
        if (!savedCoinIds.includes(coin.id)) return false;
      } else if (activeCategory === 'almost') {
        if (coin.status !== 'almost') return false;
      } else if (activeCategory === 'bonded') {
        if (coin.status !== 'bonded') return false;
      } else if (activeCategory === 'new') {
        // 'new' shows all or new status
      }

      // Progress slider filter
      if (coin.progress < minProgress) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = coin.name.toLowerCase().includes(q);
        const matchesTicker = coin.ticker.toLowerCase().includes(q);
        const matchesCa = coin.ca.toLowerCase().includes(q);
        return matchesName || matchesTicker || matchesCa;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'marketcap') {
        return b.mcapUsd - a.mcapUsd;
      }
      if (sortBy === 'volume') {
        return b.txsCount - a.txsCount;
      }
      return 0; // default newest
    });
  }, [coins, activeCategory, savedCoinIds, searchQuery, sortBy, minProgress]);

  return (
    <section aria-label="Coin markets" id="coins-section" className="mt-8">
      {/* Category Tabs & Total count */}
      <div className="flex items-center gap-3 border-b border-border">
        <div role="group" aria-label="Coin categories" className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]">
          <button
            onClick={() => setActiveCategory('new')}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-xs h-11 shrink-0 rounded-none border-b-2 px-3 sm:px-4 ${
              activeCategory === 'new'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setActiveCategory('almost')}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-xs h-11 shrink-0 rounded-none border-b-2 px-3 sm:px-4 ${
              activeCategory === 'almost'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Almost bonded
          </button>
          <button
            onClick={() => setActiveCategory('bonded')}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-xs h-11 shrink-0 rounded-none border-b-2 px-3 sm:px-4 ${
              activeCategory === 'bonded'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Bonded
          </button>
          <button
            onClick={() => setActiveCategory('saved')}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-xs h-11 shrink-0 rounded-none border-b-2 px-3 sm:px-4 ${
              activeCategory === 'saved'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Saved ({savedCoinIds.length})
          </button>
        </div>

        <span className="shrink-0 text-xs font-mono text-muted-foreground">
          {filteredCoins.length} coins
        </span>
      </div>

      {/* Control Bar: Search, Sort, Filters, Layout Switcher */}
      <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3 sm:flex">
        {/* Search */}
        <div className="relative col-span-2 min-w-0 sm:flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            className="flex w-full rounded-xl border border-border bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary pl-10 h-10"
            placeholder="Search by coin name, ticker, or address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Select */}
        <select
          aria-label="Sort coins"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="h-10 min-w-0 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary sm:w-36"
        >
          <option value="newest">Newest</option>
          <option value="marketcap">Market cap</option>
          <option value="volume">24h volume</option>
        </select>

        {/* Actions & View mode */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 w-10 border border-border ${
              showFilters ? 'bg-primary/15 text-primary border-primary/40' : 'hover:bg-accent text-muted-foreground'
            }`}
            title="Market filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Layout Switcher */}
          <div role="group" aria-label="Coin layout" className="flex border-x border-border px-1">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-9 w-9 ${
                layoutMode === 'grid'
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              title="Card layout"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('table')}
              className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-9 w-9 ${
                layoutMode === 'table'
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              title="Table layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={() => {
              refreshCoins();
              showToast('Markets refreshed');
            }}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium hover:bg-accent text-muted-foreground hover:text-foreground h-10 w-10 border border-border transition-colors"
            title="Refresh markets"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter drawer if opened */}
      {showFilters && (
        <div className="mt-3 p-4 rounded-xl border border-border bg-card/60 backdrop-blur animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono">Min Bonding Progress:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={minProgress}
                onChange={(e) => setMinProgress(Number(e.target.value))}
                className="w-36 accent-primary"
              />
              <span className="text-xs font-mono font-semibold text-primary">{minProgress}%</span>
            </div>
            {minProgress > 0 && (
              <button
                onClick={() => setMinProgress(0)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Coin Listings */}
      {filteredCoins.length === 0 ? (
        <div className="mt-12 text-center py-16 border border-dashed border-border rounded-2xl bg-card/20">
          <p className="text-base font-semibold text-foreground">No coins found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your search query or category filters.</p>
        </div>
      ) : layoutMode === 'grid' ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredCoins.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              isSaved={savedCoinIds.includes(coin.id)}
              onToggleSave={onToggleSave}
              onSelectCoin={onSelectCoin}
              showToast={showToast}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-card/80 text-[11px] font-mono uppercase text-muted-foreground">
                <th className="py-3 px-4">Coin</th>
                <th className="py-3 px-4">Market Cap</th>
                <th className="py-3 px-4">Bonding Progress</th>
                <th className="py-3 px-4">Fee Split (A/B/R/L)</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  isSaved={savedCoinIds.includes(coin.id)}
                  onToggleSave={onToggleSave}
                  onSelectCoin={onSelectCoin}
                  showToast={showToast}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

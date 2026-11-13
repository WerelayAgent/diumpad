import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MainCoinBanner } from './components/MainCoinBanner';
import { CoinMarkets } from './components/CoinMarkets';
import { CreateCoinModal } from './components/CreateCoinModal';
import { CoinDetailModal } from './components/CoinDetailModal';
import { AirdropsModal } from './components/AirdropsModal';
import { BuybacksModal } from './components/BuybacksModal';
import { HolderRewardsModal } from './components/HolderRewardsModal';
import { DocsFaqModal } from './components/DocsFaqModal';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { INITIAL_COINS, INITIAL_TRADES, MOCK_AIRDROPS, MOCK_BUYBACKS } from './mockData';
import { Coin, Trade } from './types';

export function App() {
  const [coins, setCoins] = useState<Coin[]>(INITIAL_COINS);
  const [trades, setTrades] = useState<Trade[]>(INITIAL_TRADES);
  const [savedCoinIds, setSavedCoinIds] = useState<string[]>(['diumpad-main']);
  
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [airdropsModalOpen, setAirdropsModalOpen] = useState(false);
  const [buybacksModalOpen, setBuybacksModalOpen] = useState(false);
  const [holderRewardsModalOpen, setHolderRewardsModalOpen] = useState(false);

  // Wallet State
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress, setWalletAddress] = useState('9xKr4mZ8pQ1wL2yV5u8I0o3P6a9S2d5F8g1H4j7K0l');
  const [walletBalance, setWalletBalance] = useState(12.45);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const handleToggleSave = (coinId: string) => {
    setSavedCoinIds((prev) =>
      prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]
    );
  };

  const handleCoinCreated = (newCoin: Coin) => {
    setCoins((prev) => [newCoin, ...prev]);
    setSelectedCoin(newCoin);
    if (newCoin.currentSol > 0) {
      setWalletBalance((prev) => Math.max(0, prev - newCoin.currentSol - 0.05));
    }
  };

  const handleExecuteTrade = ({
    coinId,
    type,
    amountSol,
    amountToken,
  }: {
    coinId: string;
    type: 'buy' | 'sell';
    amountSol: number;
    amountToken: number;
  }) => {
    // Update coin metrics
    setCoins((prev) =>
      prev.map((c) => {
        if (c.id !== coinId) return c;
        const newSol = type === 'buy' ? c.currentSol + amountSol : Math.max(0, c.currentSol - amountSol);
        const newProgress = Math.min(Math.round((newSol / c.targetSol) * 100), 100);
        const newStatus = newProgress >= 100 ? 'bonded' : newProgress >= 70 ? 'almost' : 'new';
        const newMcap = c.mcapUsd + (type === 'buy' ? amountSol * 150 : -amountSol * 150);

        const updated = {
          ...c,
          currentSol: Number(newSol.toFixed(2)),
          progress: newProgress,
          status: newStatus as any,
          mcapUsd: Math.max(1000, Math.round(newMcap)),
          txsCount: c.txsCount + 1,
        };
        // Update selected coin if open
        if (selectedCoin?.id === coinId) {
          setSelectedCoin(updated);
        }
        return updated;
      })
    );

    // Update wallet balance
    if (type === 'buy') {
      setWalletBalance((prev) => Math.max(0, prev - amountSol));
    } else {
      setWalletBalance((prev) => prev + amountSol);
    }

    // Add new trade
    const newTrade: Trade = {
      id: `tx-${Date.now()}`,
      coinId,
      type,
      amountSol,
      amountToken,
      trader: `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`,
      timestamp: 'Just now',
      txHash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
    };
    setTrades((prev) => [newTrade, ...prev]);
  };

  const handleConnectWallet = (walletName: string) => {
    setWalletConnected(true);
    setWalletAddress('9xKr4mZ8pQ1wL2yV5u8I0o3P6a9S2d5F8g1H4j7K0l');
    setWalletBalance(15.0);
    showToast(`Connected ${walletName} wallet`);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
    showToast('Wallet disconnected');
  };

  const handleFaucet = () => {
    setWalletBalance((prev) => prev + 2.0);
    showToast('Added +2.0 SOL testnet balance!');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'airdrops') setAirdropsModalOpen(true);
    if (tab === 'buybacks') setBuybacksModalOpen(true);
    if (tab === 'holder-rewards') setHolderRewardsModalOpen(true);
    if (tab === 'coins') {
      const el = document.getElementById('coins-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mainCoin = coins.find((c) => c.isMainCoin) || coins[0];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabClick}
        openCreateModal={() => setCreateModalOpen(true)}
        openWalletModal={() => setWalletModalOpen(true)}
        openDocsModal={() => setDocsModalOpen(true)}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
      />

      {/* Main Content Area */}
      <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-[1380px] px-4 pb-12 pt-5 sm:px-7 sm:pt-6">
          {/* Hero Panel */}
          <HeroSection
            totalCoins={coins.length}
            openCreateModal={() => setCreateModalOpen(true)}
            scrollToCoins={() => {
              const el = document.getElementById('coins-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Featured Native Token Banner */}
          <MainCoinBanner
            coin={mainCoin}
            onSelectCoin={(coin) => setSelectedCoin(coin)}
            showToast={showToast}
          />

          {/* Coin Markets & Listings */}
          <CoinMarkets
            coins={coins}
            savedCoinIds={savedCoinIds}
            onToggleSave={handleToggleSave}
            onSelectCoin={(coin) => setSelectedCoin(coin)}
            showToast={showToast}
            refreshCoins={() => {
              // slight shuffle to simulate live market refresh
              setCoins((prev) => [...prev]);
            }}
          />
        </main>
      </div>

      {/* Footer */}
      <Footer openDocsModal={() => setDocsModalOpen(true)} />

      {/* Modals */}
      <CreateCoinModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCoinCreated={handleCoinCreated}
        showToast={showToast}
        walletBalance={walletBalance}
      />

      <CoinDetailModal
        coin={selectedCoin}
        onClose={() => setSelectedCoin(null)}
        trades={trades}
        onExecuteTrade={handleExecuteTrade}
        showToast={showToast}
        walletBalance={walletBalance}
      />

      <AirdropsModal
        isOpen={airdropsModalOpen}
        onClose={() => setAirdropsModalOpen(false)}
        airdrops={MOCK_AIRDROPS}
        showToast={showToast}
      />

      <BuybacksModal
        isOpen={buybacksModalOpen}
        onClose={() => setBuybacksModalOpen(false)}
        buybacks={MOCK_BUYBACKS}
      />

      <HolderRewardsModal
        isOpen={holderRewardsModalOpen}
        onClose={() => setHolderRewardsModalOpen(false)}
        showToast={showToast}
      />

      <DocsFaqModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />

      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
        onFaucet={handleFaucet}
        showToast={showToast}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
export default App;

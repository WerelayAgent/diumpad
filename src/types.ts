export interface FeeSplit {
  airdrops: number;      // e.g. 25%
  buybacks: number;      // e.g. 25%
  holderRewards: number; // e.g. 25%
  liquidity: number;     // e.g. 25%
}

export interface Coin {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  ca: string;
  pair: string;
  priceSol: number;
  priceUsd: number;
  mcapUsd: number;
  currentSol: number;
  targetSol: number; // usually 85 SOL
  progress: number;  // 0 - 100%
  feeSplit: FeeSplit;
  status: 'new' | 'almost' | 'bonded';
  holdersCount: number;
  txsCount: number;
  createdAt: string;
  creator: string;
  isMainCoin?: boolean;
}

export interface Trade {
  id: string;
  coinId: string;
  type: 'buy' | 'sell';
  amountSol: number;
  amountToken: number;
  trader: string;
  timestamp: string;
  txHash: string;
}

export interface AirdropEvent {
  id: string;
  coinTicker: string;
  coinName: string;
  amountSol: number;
  eligibleHolders: number;
  status: 'Upcoming' | 'Distributed';
  date: string;
}

export interface BuybackEvent {
  id: string;
  coinTicker: string;
  coinName: string;
  solSpent: number;
  tokensBurned: number;
  timestamp: string;
  txHash: string;
}

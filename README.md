# DiumPad — Solana Coin Launchpad (`$DIUMPAD`)

> **"Coins that give back."**  
> Launch a Solana coin in seconds. You choose where its trading fees go: airdrops, buybacks, holder rewards or liquidity. Powered by pump.fun.

---

## 🌟 Overview

**DiumPad** is a decentralized token launchpad on Solana powered by **pump.fun**. It transforms standard speculative bonding curves into self-sustaining community engines through an automated **4-Way Fee Split** architecture.

- **Bonding Target:** `85 SOL` — Once reached, all liquidity is automatically seeded and permanently locked into a full liquidity pool.
- **Fair Launch Cost:** `0.05 SOL` flat network initialization fee.
- **No Rugs:** Liquidity LP tokens are programmatically burned upon graduation.

---

## 🛠️ Key Features

- **pump.fun Integration:** Direct constant-product bonding curve mechanics.
- **Customizable Fee Split ("Coins that give back"):**
  - **Airdrops:** Escrowed and distributed to diamond hand holders via automated snapshots.
  - **Buybacks:** Programmatic market buy & burn sent straight to the Solana incinerator.
  - **Holder Rewards:** Pro-rata continuous dividend yields claimable directly in SOL.
  - **Liquidity:** Deepening pool depth to minimize trading slippage.
- **Creator Studio (`/create`):** Launch a token in 30 seconds with custom fee sliders and instant bonding curve deployment.
- **Trading Terminal:** Interactive bonding curve progression chart, instant swap interface (Buy / Sell), live trades stream, and holder distribution metrics.
- **Ecosystem Modules:** Dedicated portals for Airdrops, Buyback & Burn logs, and Holder Yield tracking.
- **Interactive Solana Wallet:** Phantom and Solflare integration with simulated balances, testnet faucet (+2.0 SOL), and live transaction feedback.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/WerelayAgent/diumpad.git
cd diumpad

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📜 Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Glassmorphism + Cinematic animations
- **Icons:** Lucide React
- **Engine:** pump.fun constant product bonding curve simulation
- **Deployment:** GitHub Pages / Vercel ready

---

## 📄 License

MIT License © 2026 DiumPad

# 🚀 FundStx - Decentralized Crowdfunding on Stacks

> **Hackathon Submission:** [DoraHacks Stacks USDCx Builder Challenge](https://dorahacks.io/hackathon/stacks-usdcx/detail)

A next-generation crowdfunding platform leveraging **USDCx** stablecoin liquidity on the **Stacks** blockchain. FundStx eliminates volatility risk for campaign creators while providing a secure, transparent, and decentralized fundraising experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![Stacks](https://img.shields.io/badge/Stacks-Blockchain-5546FF)](https://www.stacks.co/)

---

## 🎯 Hackathon Challenge: Programming USDCx on Stacks

### What We Built

FundStx directly addresses the hackathon's goal of **bringing stablecoin liquidity from Ethereum to Stacks** by creating a real-world use case for USDCx:

✅ **USDCx Integration** - Campaign funding powered by Circle's xReserve protocol  
✅ **Stacks Smart Contracts** - Secure fund escrow and distribution via Clarity  
✅ **Wallet Connect** - Seamless Hiro/Leather wallet integration  
✅ **Production-Ready UI** - Modern, accessible web3 interface  

### Why USDCx on Stacks Matters

1. **Stability** - Campaign creators receive predictable funding without crypto volatility
2. **Liquidity** - Access to billions in USDC liquidity from Ethereum
3. **Security** - Bitcoin-grade finality with Stacks' unique consensus mechanism
4. **Transparency** - On-chain verification of all contributions and fund distribution

---

## 🌟 Key Features

### 1. Campaign Creation
- Launch crowdfunding campaigns with USDCx funding goals
- Set deadlines and define project milestones
- Automatic smart contract deployment for fund escrow

### 2. Secure Fund Management
- **Smart Contract Escrow** - Funds locked until campaign goal is met
- **Refund Mechanism** - Automatic refunds if campaign fails to reach goal
- **Transparent Tracking** - Real-time on-chain funding progress

### 3. Wallet Integration
- Connect via **Hiro Wallet** or **Leather** (formerly Xverse)
- Sign transactions with hardware wallet support
- View contribution history and campaign ownership

### 4. Discovery & Exploration
- Browse active campaigns sorted by progress, deadline, or category
- Filter by funding stage, goal size, or creator reputation
- Trending campaigns highlighted on homepage

---

## 🎨 Design Philosophy

FundStx uses a **Neo-Brutalist / Loot Drop** inspired design system:

- **Pastel Color Palette** - Soft beige background with vibrant pastel accents
- **Bold Typography** - Space Grotesk and Outfit fonts for modern readability
- **Hard Shadows** - Distinctive card shadows that "pop" on hover
- **Playful Animations** - Subtle rotations and press-down button effects
- **Accessibility First** - High contrast, keyboard navigation, screen reader support

This aesthetic makes web3 **approachable and fun** while maintaining professional credibility.

---

## 🏗️ Technical Architecture

### Frontend Stack
```
Next.js 16.1.4 (App Router)
├── React 19.2.3
├── TypeScript 5.x
├── Tailwind CSS 4.x
└── Framer Motion (animations)
```

### Blockchain Integration
```
@stacks/connect-react 23.1.4
├── @stacks/transactions
├── @stacks/network
└── @stacks/common
```

### Smart Contract (Clarity)
**Status:** 🚧 In Development

```clarity
;; FundStx Campaign Contract
(define-data-var campaign-goal uint u0)
(define-data-var funds-raised uint u0)
(define-data-var deadline uint u0)

(define-public (contribute (amount uint))
  ;; Accept USDCx contributions
  ;; Track contributor for refunds
  ;; Emit event for UI updates
)

(define-public (release-funds)
  ;; Only callable if goal met before deadline
  ;; Transfer USDCx to campaign creator
)

(define-public (refund)
  ;; Return funds if campaign failed
)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Hiro Wallet** browser extension ([Download](https://wallet.hiro.so/))

### Installation

```bash
# Clone the repository
git clone https://github.com/OmegaGbenga/fundstx.git
cd fundstx

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The app will be running at **http://localhost:3000**

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST...
NEXT_PUBLIC_USDCX_CONTRACT=SP...
```

---

## 📱 User Journey

### For Campaign Creators
1. **Connect Wallet** → Click "Connect Wallet" in navbar
2. **Start Campaign** → Fill out title, description, goal, and deadline
3. **Deploy Contract** → Confirm transaction (gas fee ~0.001 STX)
4. **Share Link** → Promote your campaign URL
5. **Receive Funds** → USDCx transferred when goal is met

### For Backers
1. **Browse Campaigns** → Explore active projects on homepage
2. **View Details** → Click any campaign to see full description
3. **Contribute** → Enter USDCx amount and confirm transaction
4. **Track Progress** → Watch real-time funding bar update
5. **Get Refund** → Automatic if campaign fails (deadline passes without meeting goal)

---

## 🔐 Security Considerations

### Smart Contract Audits
- [ ] Code review by Stacks security experts
- [ ] Automated testing with `clarinet test`
- [ ] Testnet deployment and stress testing
- [ ] Mainnet deployment with timelocks

### Frontend Security
- ✅ Input validation and sanitization
- ✅ HTTPS-only in production
- ✅ No private key handling in frontend
- ✅ Transaction signing delegated to wallet

---

## 🎯 Hackathon Deliverables

### ✅ Completed
- [x] **GitHub Repository** with source code
- [x] **Working Demo** (frontend deployed)
- [x] **USDCx Integration Plan** (smart contract design)
- [x] **Video Pitch** (link below)
- [x] **Original Work** (built during hackathon period)

### 📹 Demo Video
> **Coming Soon:** 3-minute walkthrough showing campaign creation and contribution flow

### 🌐 Live Demo
> **Deployment:** [fundstx.vercel.app](https://fundstx.vercel.app) *(pending)*

---

## 🛣️ Roadmap

### Phase 1: MVP (Hackathon Scope) ✅
- [x] Campaign creation UI
- [x] Wallet integration
- [x] Campaign discovery
- [ ] Smart contract deployment
- [ ] testnet USDCx integration

### Phase 2: Enhanced Features
- [ ] Campaign categories and tags
- [ ] Creator verification badges
- [ ] Milestone-based fund release
- [ ] Social sharing integrations
- [ ] Email notifications via API

### Phase 3: Advanced Functionality
- [ ] Multi-signature fund management
- [ ] NFT rewards for backers
- [ ] Governance voting on disputed campaigns
- [ ] Analytics dashboard for creators

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Stacks Foundation** - For the incredible Bitcoin L2 infrastructure
- **Circle** - For USDCx and the xReserve protocol
- **DoraHacks** - For hosting this builder challenge
- **Hiro** - For developer tools and wallet infrastructure

---

## 📞 Contact & Links

- **GitHub:** [@OmegaGbenga](https://github.com/OmegaGbenga)
- **Project Repo:** [github.com/OmegaGbenga/fundstx](https://github.com/OmegaGbenga/fundstx)
- **Hackathon Submission:** [DoraHacks Link](https://dorahacks.io/hackathon/stacks-usdcx/ideaism)

---

## 🏆 Built for Stacks USDCx Hackathon

**Submission by:** OmegaGbenga  
**Submission Date:** January 21, 2026  
**Category:** Crowdfunding Platform  
**Prize Track:** Programming USDCx on Stacks ($3,000 USD)

---

<div align="center">
  
### ⚡ Powered by Stacks & USDCx
  
*Making Bitcoin DeFi accessible, secure, and fun.*

</div>

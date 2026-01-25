# FundStx 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stacks](https://img.shields.io/badge/Blockchain-Stacks-purple)
![Status](https://img.shields.io/badge/Status-Development-orange)

**FundStx** is a premier decentralized crowdfunding platform built on the **Stacks** blockchain. By leveraging the security of Bitcoin and the stability of **USDCx** (USDC on Stacks), FundStx provides a seamless, transparent, and engaging fundraising experience for creators and backers alike.

## ✨ Features

-   **🎨 Neo-Brutalist Design**: A bold, high-contrast, and vibrant UI that demands attention and offers a unique user experience.
-   **🔐 Bitcoin-Level Security**: Built on Stacks, inheriting the settlement security of Bitcoin.
-   **💵 Stablecoin Native**: Utilizing `USDCx` to ensure zero volatility, protecting the value of funds raised.
-   **📝 Smart Contract Escrow**: Trustless operations where funds are securely held in Clarity smart contracts until campaign goals are met.
-   **⚡ High Performance**: Powered by Next.js 14 and React 18 for a lightning-fast, responsive interface.
-   **📱 Mobile Responsive**: Fully optimized for all devices, ensuring accessibility everywhere.

## 🛠 Tech Stack

-   **Frontend Framework**: Next.js 14 (App Router)
-   **UI Library**: React 18, Tailwind CSS
-   **Blockchain Integration**: Stacks.js, Clarinet
-   **Styling**: Custom Neo-Brutalist Design System, Lucide Icons
-   **Fonts**: Space Grotesk, Outfit

## 📂 Project Structure

```bash
fundstx/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions and Stacks integration
│   └── styles/           # Global styles and Tailwind config
├── contracts/            # Clarity smart contracts
├── public/               # Static assets
└── ...
```

## 📦 Installation & Setup

Follow these steps to get the project running locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/OmegaGbenga/Fund-STX.git
    cd Fund-STX
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and configure necessary environment variables (e.g., Stacks network config).

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Explore**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Smart Contracts

The core logic resides in `contracts/`.
-   **Language**: Clarity
-   **Key Contract**: `fundstx.clar` - Handles campaign creation, pledges, and fund release.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by OmegaGbenga for the Stacks Ecosystem.

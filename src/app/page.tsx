"use client";

import { Button } from "@/components/ui/Button";
import { CampaignCard } from "@/components/CampaignCard";
import { ArrowRight, Zap, Shield, Globe, Star } from "lucide-react";
import Link from "next/link";

const MOCK_CAMPAIGNS = [
  {
    id: "1",
    title: "DeFi Educational Portal",
    description: "A platform to teach the next billion users about Bitcoin DeFi and Stacks. We are building interactive courses and rewards.",
    goal: 50000,
    raised: 12500,
    deadline: Date.now() + 86400000 * 15,
    creator: "SP3...9A2",
  },
  {
    id: "2",
    title: "Eco-Friendly Bitcoin Mining",
    description: "Sustainable mining initiatives powered by renewable energy sources in Texas. Join us in making Bitcoin green.",
    goal: 120000,
    raised: 89000,
    deadline: Date.now() + 86400000 * 5,
    creator: "SP1...2B3",
  },
  {
    id: "3",
    title: "Stacks NFT Marketplace",
    description: "Zero-fee NFT marketplace for digital artists on the Stacks blockchain. Create, sell, and collect instantly.",
    goal: 25000,
    raised: 3200,
    deadline: Date.now() + 86400000 * 30,
    creator: "SP2...8C1",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 gap-8">

        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black bg-[#E0F7FA] text-black text-sm font-bold shadow-[4px_4px_0px_0px_#000] rotate-[-2deg] hover:rotate-[2deg] transition-transform cursor-default">
          <Star className="w-4 h-4 fill-yellow-400 text-black" />
          <span className="tracking-wide">POWERED BY STACKS & USDCx</span>
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tight text-black leading-[0.85]">
          FUND THE <br />
          <span className="text-[var(--primary)] relative inline-block">
            FUTURE
            <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 7.00001C35.9179 3.03366 109.289 -1.60338 198.001 3.50002" stroke="black" strokeWidth="3" strokeLinecap="round" /></svg>
          </span>
        </h1>

        <p className="text-black/80 font-medium text-xl max-w-2xl leading-relaxed mt-4">
          The first decentralized crowdfunding platform leveraging <span className="bg-[var(--accent)] px-1 border border-black rounded-md font-bold">USDCx</span> on Stacks.
          Raise funds securely. Zero volatility. 100% Fun.
        </p>

        <div className="flex items-center gap-6 mt-8">
          <Link href="/create">
            <Button size="lg" className="rotate-[-1deg] hover:rotate-1 text-xl px-10 py-5 bg-black text-white hover:bg-gray-800 border-none shadow-[6px_6px_0px_0px_var(--primary)]">
              Start Campaign
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary" size="lg" className="rotate-[1deg] hover:-rotate-1 text-xl border-2 border-black">
              Explore Projects
            </Button>
          </Link>
        </div>

        {/* Stats / Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl px-4">
          {[
            { icon: Shield, label: "SECURE", desc: "Smart Contract Escrow", color: "bg-[var(--secondary)]" },
            { icon: Globe, label: "GLOBAL", desc: "Borderless USDC Funding", color: "bg-[var(--accent)]" },
            { icon: Zap, label: "FAST", desc: "Bitcoin Finality", color: "bg-[var(--primary)]" }
          ].map((item, i) => (
            <div key={i} className={`neo-card p-6 flex items-center justify-center gap-4 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform bg-white`}>
              <div className={`p-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] ${item.color}`}>
                <item.icon className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-xl text-black">{item.label}</h4>
                <p className="text-sm font-bold text-black/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-10 bg-[var(--tertiary)] p-6 border-2 border-black rotate-1 mx-4 rounded-xl shadow-[4px_4px_0px_0px_#000]">
          <div>
            <h2 className="text-3xl font-black text-black">TRENDING DROPS</h2>
            <p className="text-black/70 font-bold">Support the hottest projects on Stacks right now.</p>
          </div>
          <Link href="/explore">
            <Button size="sm" variant="secondary">VIEW ALL</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CAMPAIGNS.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}

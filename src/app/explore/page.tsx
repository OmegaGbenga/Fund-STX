"use client";

import { Button } from "@/components/ui/Button";
import { CampaignCard } from "@/components/CampaignCard";
import { Search } from "lucide-react";

// Mock data for now - in production this would fetch from the blockchain
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
    {
        id: "4",
        title: "Web3 Social Network",
        description: "A decentralized social network where you own your data and content. Built on Stacks and Bitcoin.",
        goal: 75000,
        raised: 45000,
        deadline: Date.now() + 86400000 * 20,
        creator: "SP4...7D5",
    },
    {
        id: "5",
        title: "Decentralized Exchange",
        description: "A new AMM DEX for Stacks tokens with low fees and high liquidity. Swap tokens instantly.",
        goal: 200000,
        raised: 150000,
        deadline: Date.now() + 86400000 * 10,
        creator: "SP5...3E9",
    }
];

export default function ExplorePage() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4 pb-24">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-black mb-2">EXPLORE DROPS</h1>
                    <p className="text-xl font-medium text-black/60">Discover the next big thing on Stacks.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="w-full neo-input pl-12 pr-4 py-3 bg-white font-bold text-black"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_CAMPAIGNS.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </div>
    );
}

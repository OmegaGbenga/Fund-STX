"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowLeft, Clock, User, Share2, Info, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useConnect } from "@stacks/connect-react";
import { STACKS_TESTNET } from "@stacks/network";
import { uintCV, standardPrincipalCV, stringUtf8CV } from "@stacks/transactions";
import { FUNDSTX_CONTRACT_ADDRESS, FUNDSTX_CONTRACT_NAME, getUsdcxPrincipal } from "@/lib/contracts";

// Duplicate mock data for demo (ideal: move to shared context/lib)
const MOCK_CAMPAIGNS = [
    {
        id: "1",
        title: "DeFi Educational Portal",
        description: "A platform to teach the next billion users about Bitcoin DeFi and Stacks. We are building interactive courses and rewards. Students will earn NFTs for completing modules and get hands-on experience with Clarity.",
        goal: 50000,
        raised: 12500,
        deadline: Date.now() + 86400000 * 15,
        creator: "SP3...9A2",
        fullCreator: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
    },
    {
        id: "2",
        title: "Eco-Friendly Bitcoin Mining",
        description: "Sustainable mining initiatives powered by renewable energy sources in Texas. Join us in making Bitcoin green. We use flared gas and solar/wind to power ASICs.",
        goal: 120000,
        raised: 89000,
        deadline: Date.now() + 86400000 * 5,
        creator: "SP1...2B3",
        fullCreator: "SP1FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
    },
    {
        id: "3",
        title: "Stacks NFT Marketplace",
        description: "Zero-fee NFT marketplace for digital artists on the Stacks blockchain. Create, sell, and collect instantly. Supports SIP-010 tokens and USDCx payments.",
        goal: 25000,
        raised: 3200,
        deadline: Date.now() + 86400000 * 30,
        creator: "SP2...8C1",
        fullCreator: "SP2FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
    },
    {
        id: "4",
        title: "Web3 Social Network",
        description: "A decentralized social network where you own your data and content. Built on Stacks and Bitcoin.",
        goal: 75000,
        raised: 45000,
        deadline: Date.now() + 86400000 * 20,
        creator: "SP4...7D5",
        fullCreator: "SP4FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
    },
    {
        id: "5",
        title: "Decentralized Exchange",
        description: "A new AMM DEX for Stacks tokens with low fees and high liquidity. Swap tokens instantly.",
        goal: 200000,
        raised: 150000,
        deadline: Date.now() + 86400000 * 10,
        creator: "SP5...3E9",
        fullCreator: "SP5FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
    }
];

export default function CampaignDetails() {
    const params = useParams(); // params.id might be string or string[]
    const id = (Array.isArray(params.id) ? params.id[0] : params.id) || "1";
    const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);

    const { doContractCall } = useConnect();
    const [amount, setAmount] = useState("");
    const [isContributing, setIsContributing] = useState(false);

    if (!campaign) {
        return <div className="p-12 text-center text-2xl font-black">Campaign not found 😢</div>;
    }

    const daysLeft = Math.ceil((campaign.deadline - Date.now()) / (1000 * 60 * 60 * 24));
    const percent = Math.min(100, Math.floor((campaign.raised / campaign.goal) * 100));

    const handleContribute = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsContributing(true);

        const amountNum = parseInt(amount);
        if (!amountNum || amountNum <= 0) {
            alert("Please enter a valid amount");
            setIsContributing(false);
            return;
        }

        // Configuration
        const contractAddress = FUNDSTX_CONTRACT_ADDRESS;
        const contractName = FUNDSTX_CONTRACT_NAME;
        const functionName = "contribute";

        // This is the Stacks 'USDCx' on testnet
        const usdcxContract = getUsdcxPrincipal();

        try {
            await doContractCall({
                network: STACKS_TESTNET,
                contractAddress,
                contractName,
                functionName,
                functionArgs: [
                    uintCV(parseInt(id)), // Campaign ID
                    uintCV(amountNum),    // Amount
                    standardPrincipalCV(usdcxContract) // Token Trait (Contract Principal)
                ],
                onFinish: (data) => {
                    console.log("Transaction finished:", data);
                    alert("Contribution transaction broadcasted! 🚀");
                    setIsContributing(false);
                    setAmount("");
                },
                onCancel: () => {
                    console.log("Transaction cancelled");
                    setIsContributing(false);
                },
            });
        } catch (error) {
            console.error("Contract call failed", error);
            setIsContributing(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <Link href="/explore" className="inline-flex items-center text-black font-bold hover:underline mb-8 bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Explore
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="neo-card bg-white p-8">
                        <div className="flex gap-4 mb-4">
                            <span className="bg-[var(--accent)] px-3 py-1 border-2 border-black rounded text-sm font-bold uppercase tracking-wide">
                                Verified Drop
                            </span>
                            <span className="bg-green-300 px-3 py-1 border-2 border-black rounded text-sm font-bold uppercase tracking-wide">
                                Active
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
                            {campaign.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm font-bold text-black/60 mb-8 pb-8 border-b-2 border-dashed border-black/20">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded border border-black/10">
                                    {campaign.creator}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Created 2 days ago</span>
                            </div>
                        </div>

                        <div className="prose prose-lg text-black">
                            <h3 className="font-black text-2xl uppercase mb-4">About this project</h3>
                            <p className="font-medium text-lg leading-relaxed opacity-90">
                                {campaign.description}
                            </p>
                            <p className="font-medium text-lg leading-relaxed opacity-90 mt-4">
                                By contributing to this campaign, you are directly supporting the development of the Stacks ecosystem.
                                Funds are held in a secure smart contract escrow and only released when milestones are met or the goal is reached.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Funding Card */}
                <div className="lg:col-span-1">
                    <div className="neo-card bg-[var(--tertiary)] p-6 sticky top-24">
                        <h3 className="font-black text-2xl mb-6 flex items-center gap-2">
                            FUNDING GOAL <Info className="w-5 h-5 opacity-40" />
                        </h3>

                        <div className="bg-white p-6 rounded-xl border-2 border-black mb-6">
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-black text-black">{campaign.raised.toLocaleString()}</span>
                                <span className="text-xl font-bold text-black/40 mb-1">/ {campaign.goal.toLocaleString()}</span>
                            </div>
                            <div className="text-sm font-bold text-[var(--primary)] mb-4">USDCx RAISED</div>

                            <ProgressBar value={campaign.raised} max={campaign.goal} className="h-4" />
                            <div className="flex justify-between mt-2 text-xs font-bold text-black/50">
                                <span>{percent}% FUNDED</span>
                                <span>{daysLeft} DAYS LEFT</span>
                            </div>
                        </div>

                        <form onSubmit={handleContribute} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase">Amount to Contribute</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="100"
                                        className="neo-input w-full pl-4 pr-16 py-4 text-xl font-bold"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="1"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-sm bg-black text-white px-2 py-1 rounded">
                                        USDCx
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full text-xl py-6 bg-[var(--primary)] hover:bg-[var(--accent)] border-2 border-black shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000]"
                                disabled={isContributing}
                            >
                                {isContributing ? "Confirming..." : "CONTRIBUTE NOW"}
                            </Button>
                            <p className="text-center text-xs font-bold opacity-50">
                                Transaction secured by Stacks
                            </p>
                        </form>

                        <div className="mt-8 pt-6 border-t-2 border-black/10 flex flex-col gap-3">
                            <div className="flex items-start gap-3 p-3 bg-yellow-100 rounded border border-yellow-300">
                                <AlertTriangle className="w-5 h-5 text-yellow-700 shrink-0" />
                                <p className="text-xs font-bold text-yellow-800">
                                    Ensure you have USDCx and STX (for gas) in your wallet before contributing.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button variant="ghost" size="sm" className="gap-2 opacity-60 hover:opacity-100">
                                <Share2 className="w-4 h-4" /> Share Campaign
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";
import { Clock, User, Zap } from "lucide-react";
import Link from "next/link";

interface CampaignProps {
    id: string;
    title: string;
    description: string;
    goal: number;
    raised: number;
    deadline: number; // timestamp
    creator: string;
}

export function CampaignCard({ campaign }: { campaign: CampaignProps }) {
    const daysLeft = Math.ceil((campaign.deadline - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <div className="neo-card p-0 flex flex-col gap-0 overflow-hidden group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200">
            <div className="bg-[var(--tertiary)] p-6 border-b-2 border-black flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="bg-white px-2 py-0.5 border-2 border-black rounded text-xs font-bold uppercase tracking-wide">
                        Active
                    </span>
                    <Zap className="w-5 h-5 text-black fill-white" />
                </div>
                <h3 className="text-xl font-bold text-black leading-tight line-clamp-2 mt-1">
                    {campaign.title}
                </h3>
            </div>

            <div className="p-6 flex flex-col gap-4 bg-white flex-1">
                <p className="text-black/70 font-medium text-sm line-clamp-3">
                    {campaign.description}
                </p>

                <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                        <span> raised: {campaign.raised.toLocaleString()}</span>
                        <span>Goal: {campaign.goal.toLocaleString()}</span>
                    </div>
                    <ProgressBar value={campaign.raised} max={campaign.goal} />
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-black/60 pt-4 border-t-2 border-black/5">
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="font-mono bg-gray-100 px-1 rounded">{campaign.creator.slice(0, 6)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{daysLeft}d left</span>
                    </div>
                </div>
            </div>

            <Link href={`/campaign/${campaign.id}`} className="w-full">
                <button className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--secondary)] border-t-2 border-black font-bold uppercase text-sm tracking-widest transition-colors flex items-center justify-center gap-2">
                    View Project <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </button>
            </Link>
        </div>
    );
}

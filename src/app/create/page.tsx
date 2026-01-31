"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { ArrowLeft, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { useConnect } from "@stacks/connect-react";

export default function CreateCampaign() {
    const { authOptions } = useConnect();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        deadline: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Create campaign:", formData);
        alert("Contract deploying... just kidding (for now)!");
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <Link href="/" className="inline-flex items-center text-black font-bold hover:underline mb-8 bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
            </Link>

            <div className="neo-card p-0 rounded-2xl bg-white overflow-hidden">
                <div className="bg-[var(--primary)] p-8 border-b-2 border-black flex items-center gap-4">
                    <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-full rotate-[-3deg]">
                        <Sparkles className="w-8 h-8 text-black fill-yellow-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-black">START A DROP</h1>
                        <p className="text-black font-bold text-lg mt-1">Make your idea reality on Stacks.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-3">
                        <label className="text-xl font-black text-black uppercase tracking-wide">Project Title</label>
                        <input
                            type="text"
                            required
                            className="neo-input w-full p-4 text-xl font-bold text-black placeholder:text-black/20 focus:bg-[var(--secondary)] transition-colors"
                            placeholder="e.g. Moon Base Alpha"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-black text-black uppercase tracking-wide">The Pitch</label>
                        <textarea
                            required
                            rows={5}
                            className="neo-input w-full p-4 text-lg font-medium text-black placeholder:text-black/20 focus:bg-[var(--secondary)] transition-colors resize-none"
                            placeholder="Why should people throw money at you?"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-lg font-black text-black uppercase tracking-wide">Goal Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="neo-input w-full p-4 text-xl font-bold text-black placeholder:text-black/20 focus:bg-[var(--secondary)] transition-colors"
                                    placeholder="10000"
                                    value={formData.goal}
                                    onChange={e => setFormData({ ...formData, goal: e.target.value })}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-xs bg-black text-white px-2 py-1 rounded">USDCx</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-lg font-black text-black uppercase tracking-wide">Deadline</label>
                            <input
                                type="date"
                                required
                                className="neo-input w-full p-4 text-xl font-bold text-black focus:bg-[var(--secondary)] transition-colors"
                                value={formData.deadline}
                                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col items-center">
                        <Button type="submit" size="lg" className="w-full text-xl py-5 bg-[var(--accent)] hover:bg-yellow-300 border-2 border-black shadow-[6px_6px_0px_0px_#000]">
                            🚀 LAUNCH SMART CONTRACT
                        </Button>
                        <p className="text-xs font-bold text-center text-black/40 mt-4 uppercase">
                            Gas fees apply • No rug pulls allowed
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

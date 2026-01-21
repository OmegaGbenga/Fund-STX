"use client";

import { useConnect } from "@stacks/connect-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Wallet, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { UserSession, AppConfig } from "@stacks/connect";

export default function Navbar() {
    const { authenticate } = useConnect();
    const [userSession, setUserSession] = useState<UserSession | null>(null);

    useEffect(() => {
        const appConfig = new AppConfig(['store_write', 'publish_data']);
        const session = new UserSession({ appConfig });
        setUserSession(session);
    }, []);

    const handleConnect = () => {
        authenticate();
    };

    const handleDisconnect = () => {
        userSession?.signUserOut();
        window.location.reload();
    };

    const isSignedIn = userSession?.isUserSignedIn();

    const getAddress = () => {
        if (!isSignedIn) return "";
        const address = userSession?.loadUserData().profile.stxAddress.mainnet;
        return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 border-2 border-black bg-[var(--secondary)] rounded-lg shadow-[2px_2px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                        <Rocket className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-black uppercase">
                        FundStx
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 font-bold text-black/80 uppercase text-sm tracking-wide">
                        <Link href="/explore" className="hover:text-black hover:underline decoration-2 decoration-[var(--primary)] underline-offset-4 transition-all">
                            Explore
                        </Link>
                        <Link href="/create" className="hover:text-black hover:underline decoration-2 decoration-[var(--secondary)] underline-offset-4 transition-all">
                            Start Campaign
                        </Link>
                    </div>

                    {isSignedIn ? (
                        <Button variant="accent" onClick={handleDisconnect} className="gap-2" size="sm">
                            <Wallet className="w-4 h-4" />
                            {getAddress()}
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleConnect} className="gap-2" size="sm">
                            <Wallet className="w-4 h-4" />
                            Connect Wallet
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}

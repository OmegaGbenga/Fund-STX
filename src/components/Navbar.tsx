"use client";

import { useConnect } from "@stacks/connect-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Wallet, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { authenticate, authOptions, userSession } = useConnect();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isSignedIn = mounted && userSession?.isUserSignedIn();

    const handleConnect = () => {
        authenticate(authOptions);
    };

    const handleDisconnect = () => {
        userSession?.signUserOut();
        window.location.reload();
    };

    const getAddress = () => {
        if (!isSignedIn || !userSession) return "";
        try {
            const userData = userSession.loadUserData();

            // Check for modern addresses format (User's snippet guidance)
            // @ts-ignore - types might not be updated yet
            if (userData?.addresses?.stx?.[0]?.address) {
                // @ts-ignore
                return userData.addresses.stx[0].address;
            }

            // Checks for legacy profile format
            const stxAddress = userData.profile?.stxAddress;
            const address = stxAddress?.testnet || stxAddress?.mainnet;

            if (address) return address;

            return "Connected";
        } catch (e) {
            return "Connected"; // Fallback if data loading fails but is signed in
        }
    };

    const displayAddress = getAddress();
    const formattedAddress = displayAddress !== "Connected" && displayAddress.length > 10
        ? `${displayAddress.slice(0, 4)}...${displayAddress.slice(-4)}`
        : displayAddress;

    // Prevent hydration mismatch by returning placeholder or null if not mounted
    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b-2 border-black">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-2 border-2 border-black bg-[var(--secondary)] rounded-lg shadow-[2px_2px_0px_0px_#000]">
                            <Rocket className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-black uppercase">
                            FundStx
                        </span>
                    </Link>
                </div>
            </nav>
        );
    }

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
                        <Link href="/bridge" className="hover:text-black hover:underline decoration-2 decoration-[var(--tertiary)] underline-offset-4 transition-all flex items-center gap-1">
                            Bridge <span className="text-[10px] bg-black text-white px-1 rounded">NEW</span>
                        </Link>
                        <Link href="/create" className="hover:text-black hover:underline decoration-2 decoration-[var(--secondary)] underline-offset-4 transition-all">
                            Start Campaign
                        </Link>
                    </div>

                    <Button
                        variant="ghost"
                        onClick={isSignedIn ? handleDisconnect : handleConnect}
                        className="ml-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-all text-xs uppercase font-bold flex items-center gap-2"
                        size="sm"
                    >
                        {isSignedIn ? (
                            <>
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {formattedAddress}
                            </>
                        ) : (
                            <>
                                <Wallet className="w-4 h-4 mr-2" />
                                Connect Stacks
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </nav>
    );
}

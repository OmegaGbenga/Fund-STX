"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, ArrowDown, Wallet, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useConnect } from "@stacks/connect-react";
import { createWalletClient, createPublicClient, custom, parseUnits, formatUnits, pad, hexToBytes } from "viem";
import { sepolia } from "viem/chains";
import {
    ETH_SEPOLIA_USDC,
    ETH_SEPOLIA_XRESERVE,
    STACKS_DOMAIN_ID,
    USDC_ABI,
    XRESERVE_ABI,
    encodeStacksAddress,
    STACKS_TESTNET_USDCX_V1
} from "@/lib/bridge";
import { STACKS_TESTNET } from "@stacks/network";
import { uintCV, standardPrincipalCV, bufferCV, PostConditionMode } from "@stacks/transactions";
import { Toast, ToastType } from "@/components/ui/Toast";

declare global {
    interface Window {
        ethereum?: any;
    }
}

export default function BridgePage() {
    const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");
    const [amount, setAmount] = useState("");
    const [txHash, setTxHash] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    // Stacks Wallet
    const { doContractCall, authOptions } = useConnect();
    // We need to check if we are on client to access window.ethereum

    // Ethereum Wallet State
    const [ethAddress, setEthAddress] = useState("");

    const showToast = (message: string, type: ToastType = "info") => {
        setToast({ message, type });
    };

    const connectEthWallet = async () => {
        if (typeof window === "undefined" || !window.ethereum) {
            showToast("No Ethereum wallet found. Please install MetaMask.", "error");
            return;
        }
        try {
            const client = createWalletClient({
                chain: sepolia,
                transport: custom(window.ethereum)
            });
            const [address] = await client.requestAddresses();
            setEthAddress(address);
            showToast("Wallet Connected!", "success");
        } catch (e) {
            console.error(e);
            showToast("Failed to connect wallet", "error");
        }
    };

    const handleDeposit = async () => {
        if (!ethAddress) {
            await connectEthWallet();
            return;
        }
        if (!amount) return showToast("Please enter an amount", "error");

        setIsLoading(true);
        try {
            const client = createWalletClient({
                chain: sepolia,
                transport: custom(window.ethereum!)
            });

            const publicClient = createPublicClient({
                chain: sepolia,
                transport: custom(window.ethereum!)
            });

            // Need target Stacks address
            let recipientStacksAddress = "";
            const userData = authOptions.userSession?.loadUserData();
            if (userData) {
                recipientStacksAddress = userData.profile.stxAddress.testnet; // Use testnet address
            }

            if (!recipientStacksAddress) {
                recipientStacksAddress = prompt("Enter your Stacks Testnet Address where you want to receive USDCx:") || "";
            }

            if (!recipientStacksAddress) {
                setIsLoading(false);
                return;
            }

            const recipientBytes32 = encodeStacksAddress(recipientStacksAddress);
            const amountBigInt = parseUnits(amount, 6); // USDC has 6 decimals

            // 1. Approve
            console.log("Approving...");
            const approveHash = await client.writeContract({
                address: ETH_SEPOLIA_USDC as `0x${string}`,
                abi: USDC_ABI,
                functionName: "approve",
                args: [ETH_SEPOLIA_XRESERVE, amountBigInt],
                account: ethAddress as `0x${string}`
            });
            console.log("Approved:", approveHash);
            showToast("Approving USDC spend...", "info");

            // Wait for approval confirmation
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
            console.log("Approval Confirmed");
            showToast("Approval confirmed! Proceeding to deposit...", "success");

            // 2. Deposit
            console.log("Depositing...");
            const depositHash = await client.writeContract({
                address: ETH_SEPOLIA_XRESERVE as `0x${string}`,
                abi: XRESERVE_ABI,
                functionName: "depositToRemote",
                args: [
                    amountBigInt,       // value (uint256)
                    STACKS_DOMAIN_ID,   // remoteDomain (uint32)
                    recipientBytes32,   // remoteRecipient (bytes32)
                    ETH_SEPOLIA_USDC as `0x${string}`, // localToken (address)
                    BigInt(0),          // maxFee (uint256)
                    "0x" // hookData    // hookData (bytes)
                ],
                account: ethAddress as `0x${string}`
            });

            console.log("Deposit Tx:", depositHash);
            setTxHash(depositHash);
            showToast("Deposit submitted! USDCx will arrive on Stacks shortly.", "success");
        } catch (error: any) {
            console.error("Deposit failed", error);
            // Nice error message handling if possible
            const msg = error.shortMessage || error.message || "Deposit failed";
            showToast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (!amount) return showToast("Please enter an amount", "error");
        setIsLoading(true);

        // Parse amount (6 decimals for USDCx)
        const amountNum = parseFloat(amount) * 1000000;

        // Destination Eth Address
        // We need the user's Eth address to receive funds.
        let recipientEthAddress = ethAddress;
        if (!recipientEthAddress) {
            recipientEthAddress = prompt("Enter your Ethereum Address to receive funds:") || "";
        }
        if (!recipientEthAddress.startsWith("0x")) {
            showToast("Invalid Eth address", "error");
            setIsLoading(false);
            return;
        }

        try {
            // Pad address to 32 bytes
            const paddedAddress = pad(recipientEthAddress as `0x${string}`, { size: 32 });

            const ethDomain = 0; // Ethereum domain ID

            await doContractCall({
                network: STACKS_TESTNET,
                contractAddress: STACKS_TESTNET_USDCX_V1.split(".")[0],
                contractName: STACKS_TESTNET_USDCX_V1.split(".")[1],
                functionName: "burn",
                functionArgs: [
                    uintCV(amountNum),
                    uintCV(ethDomain),
                    bufferCV(hexToBytes(paddedAddress))
                ],
                postConditionMode: PostConditionMode.Allow,
                onFinish: (data) => {
                    setTxHash(data.txId);
                    showToast("Withdrawal initiated! Funds will arrive on Ethereum.", "success");
                    setIsLoading(false);
                },
                onCancel: () => setIsLoading(false)
            });
        } catch (error) {
            console.error("Withdraw failed", error);
            setIsLoading(false);
            showToast("Withdrawal failed", "error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Link href="/" className="inline-flex items-center text-black font-bold hover:underline mb-8 bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
            </Link>

            <div className="neo-card bg-white p-0 overflow-hidden">
                <div className="bg-[var(--tertiary)] p-6 border-b-2 border-black flex justify-between items-center">
                    <h1 className="text-3xl font-black text-black uppercase">USDC Bridge</h1>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className={mode === "deposit" ? "bg-black text-white" : "bg-white"}
                            onClick={() => setMode("deposit")}
                        >
                            Deposit
                        </Button>
                        <Button
                            size="sm"
                            className={mode === "withdraw" ? "bg-black text-white" : "bg-white"}
                            onClick={() => setMode("withdraw")}
                        >
                            Withdraw
                        </Button>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Visual Flow */}
                    <div className="flex items-center justify-between px-4">
                        <div className={`flex flex-col items-center gap-2 ${mode === "deposit" ? "" : "text-black/30"}`}>
                            <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center bg-[#627EEA] shadow-[4px_4px_0px_0px_#000]">
                                <span className="text-white font-black text-xl">ETH</span>
                            </div>
                            <span className="font-bold">Ethereum</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="p-2 bg-[var(--accent)] border-2 border-black rounded-full">
                                {mode === "deposit" ? <ArrowRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
                            </div>
                        </div>

                        <div className={`flex flex-col items-center gap-2 ${mode === "withdraw" ? "" : "text-black/30"}`}>
                            <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center bg-[#5546FF] shadow-[4px_4px_0px_0px_#000]">
                                <span className="text-white font-black text-xl">STX</span>
                            </div>
                            <span className="font-bold">Stacks</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Always show form, handle connection in button */}

                        {/* Connection Status Text */}
                        <div className="flex justify-center">
                            {mode === "deposit" && (
                                ethAddress ? (
                                    <div className="text-xs font-bold text-center bg-[#D1FADF] text-green-800 p-2 rounded border border-black/10 animate-in fade-in">
                                        Connected: {ethAddress.slice(0, 6)}...{ethAddress.slice(-4)}
                                    </div>
                                ) : (
                                    <div
                                        className="text-xs font-bold text-center bg-gray-100 text-gray-500 p-2 rounded border border-black/10"
                                    >
                                        Wallet Not Connected
                                    </div>
                                )
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-lg font-black uppercase">Amount (USDC)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="neo-input w-full p-4 text-2xl font-bold"
                                    placeholder="0.00"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black">USDC</span>
                            </div>
                        </div>

                        <Button
                            onClick={mode === "deposit" ? handleDeposit : handleWithdraw}
                            disabled={isLoading}
                            className="w-full py-6 text-xl bg-[var(--primary)] shadow-[4px_4px_0px_0px_#000]"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> :
                                (mode === "deposit" ? "BRIDGE TO STACKS" : "BRIDGE TO ETHEREUM")
                            }
                        </Button>
                    </div>

                    {txHash && (
                        <div className="p-4 bg-green-100 border-2 border-black rounded-xl">
                            <p className="font-bold text-green-800 mb-2">Transaction Submitted!</p>
                            <a
                                href={mode === "deposit" ? `https://sepolia.etherscan.io/tx/${txHash}` : `https://explorer.hiro.so/txid/${txHash}?chain=testnet`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-sm underline font-mono break-all"
                            >
                                {txHash} <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 text-center text-sm font-bold text-black/40 max-w-md mx-auto">
                <p>Powered by Circle xReserve & Stacks Attestation</p>
                <p className="mt-2 text-xs">Testnet Only. Do not send real funds.</p>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

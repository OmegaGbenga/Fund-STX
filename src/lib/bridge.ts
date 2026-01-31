
import { createAddress } from "@stacks/transactions";
import { hexToBytes, toHex } from "viem";

export const ETH_SEPOLIA_USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
export const ETH_SEPOLIA_XRESERVE = "0x008888878f94C0d87defdf0B07f46B93C1934442";
export const STACKS_TESTNET_USDCX = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.usdcx";
export const STACKS_TESTNET_USDCX_V1 = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.usdcx-v1";

export const STACKS_DOMAIN_ID = 10003;

export const USDC_ABI = [
    {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "success", type: "bool" }],
    },
    {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ name: "balance", type: "uint256" }],
    },
];

export const XRESERVE_ABI = [
    {
        name: "depositToRemote",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "value", type: "uint256" },
            { name: "remoteDomain", type: "uint32" },
            { name: "remoteRecipient", type: "bytes32" },
            { name: "localToken", type: "address" },
            { name: "maxFee", type: "uint256" },
            { name: "hookData", type: "bytes" },
        ],
        outputs: [],
    },
];

/**
 * Encodes a Stacks address into bytes32 format for xReserve
 * Padding: 11 bytes zero + 1 byte version + 20 bytes hash160
 */
export function encodeStacksAddress(stacksAddress: string): `0x${string}` {
    try {
        const address = createAddress(stacksAddress);
        // address.hash160 is a string hex
        const hashBytes = hexToBytes(`0x${address.hash160}`);
        const versionByte = address.version;

        // 11 bytes padding
        const padding = new Uint8Array(11).fill(0);

        // Construct buffer: [padding(11), version(1), hash(20)]
        const combined = new Uint8Array(32);
        combined.set(padding, 0);
        combined.set([versionByte], 11);
        combined.set(hashBytes, 12);

        return toHex(combined);
    } catch (error) {
        console.error("Error encoding stacks address", error);
        throw new Error("Invalid Stacks address");
    }
}

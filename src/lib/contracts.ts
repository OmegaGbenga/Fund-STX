
// Configuration for the FundStx Smart Contract and Stacks connection

// Contract Configuration
// Updated for Testnet Deployment
export const FUNDSTX_CONTRACT_ADDRESS = "STAEVZVH0E9908XWCB1THHF94BEPMB2CKFJYRES5"; // Default testnet address (Deployer)
export const FUNDSTX_CONTRACT_NAME = "fundstx";

// USDCx Configuration on Stacks Testnet
export const USDCX_CONTRACT_ADDRESS = "STAEVZVH0E9908XWCB1THHF94BEPMB2CKFJYRES5"; // Usually same as deployer for simulated tokens or specific external contract
export const USDCX_CONTRACT_NAME = "usdc"; // Example name

// Helper to get full principal
export const getFundStxPrincipal = () => `${FUNDSTX_CONTRACT_ADDRESS}.${FUNDSTX_CONTRACT_NAME}`;
export const getUsdcxPrincipal = () => `${USDCX_CONTRACT_ADDRESS}.${USDCX_CONTRACT_NAME}`;

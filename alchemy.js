import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "xn4p9804Jwlc0KaKAYA5jCFA4R0O8vps",
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

// Print token balances of USDC in Vitalik's address
alchemy.core.getTokenBalances(vitalikAddress, [usdcContract]).then(console.log);
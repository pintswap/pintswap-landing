import { ethers } from 'ethers';

const INFURA_API_KEY = 'e74b50d92fa24ebaa7b814b4aa4665e8';

export const NETWORKS = [
  {
    name: 'Ethereum',
    explorer: 'https://etherscan.io/',
    chainId: 1,
    provider: new ethers.JsonRpcProvider('https://rpc.doublecup.dev'),
    // provider: new ethers.InfuraProvider("mainnet", INFURA_API_KEY),
    // provider: new ethers.AlchemyProvider(
    //   'mainnet', 'Qoz0g86Uhc_xLj7P-etwSTLNPSXJmdi4'
    // )
    // provider: new ethers.JsonRpcProvider(
    //   `https://eth.llamarpc.com/rpc/${LLAMA_NODES_KEY}`
    // ),
  },
  {
    name: 'Arbitrum',
    explorer: 'https://arbiscan.io/',
    chainId: 42161,
    provider: new ethers.InfuraProvider('arbitrum', INFURA_API_KEY),
  },
  {
    name: 'Avalanche',
    explorer: 'https://subnets.avax.network/c-chain/',
    chainId: 43114,
    provider: new ethers.JsonRpcProvider(
      `https://avalanche-mainnet.infura.io/v3/${INFURA_API_KEY}`
    ),
  },
  {
    name: 'Base',
    provider: new ethers.JsonRpcProvider(
      `https://base-mainnet.infura.io/v3/${INFURA_API_KEY}`
    ),
    chainId: 8453,
    explorer: 'https://basescan.org/',
  },
  {
    name: 'Optimism',
    explorer: 'https://optimistic.etherscan.io/',
    chainId: 10,
    provider: new ethers.InfuraProvider('optimism', INFURA_API_KEY),
  },
  {
    name: 'Polygon',
    explorer: 'https://polygonscan.com/',
    chainId: 137,
    provider: new ethers.InfuraProvider('matic', INFURA_API_KEY),
  },
  {
    name: 'Celo',
    explorer: 'https://explorer.celo.org/mainnet/',
    chainId: 42220,
    provider: new ethers.JsonRpcProvider('https://forno.celo.org'),
  },
  {
    name: 'Binance Smart Chain',
    explorer: 'https://bscscan.com/',
    chainId: 56,
    provider: new ethers.JsonRpcProvider(
      `https://bnbsmartchain-mainnet.infura.io/v3/${INFURA_API_KEY}`
    ),
  },
];

export const providerFromChainId = (chainId = 1) =>
  NETWORKS.find((p) => p.chainId === chainId)?.provider;

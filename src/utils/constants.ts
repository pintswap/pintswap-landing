export const IS_MINT_ENABLED = false;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/feed/pintswap',
  discord: 'https://discord.gg/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0x0bA5835F87BAB3d0D66e180ea58e3b4D87ef0f17',
  },
  mainnet: {
    tris: '0x0055485fCa054D165fc0C7D836459722436544c1',
    pint: '0x8d008cac1a5cb08ac962b1e34e977b79abeee88d', // TODO: change
  },
};

export const EXPLORER_URLS: any = {
  sepolia: 'https://sepolia.etherscan.io',
  mainnet: 'https://etherscan.io',
};

export const SUBGRAPH_ENDPOINTS = {
  pintswap:
    'https://api.thegraph.com/subgraphs/name/pintswap/token-transfers-eth',
  uniswapv2: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v2-dev',
  uniswapv3: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
};

export const CHAINS_BY_ID: Record<string, string> = {
  '1': 'Ethereum',
};

// Cache
export const SYMBOL_CACHE: Record<string, string> = {};
export const DECIMAL_CACHE: Record<string, number> = {};

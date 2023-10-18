export const IS_MINT_ENABLED = false;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/pintswap',
  discord: 'https://discord.gg/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';
export const DEV = !!process.env.NEXT_PUBLIC_DEV;
export const REDEMPTION_ENABLED = true;

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0x0bA5835F87BAB3d0D66e180ea58e3b4D87ef0f17',
  },
  hardhat: {
    wock: '0xcB72ed407Cdb97a7161a2b567b5f50B55585Ee6b',
    wockRedeem: '0x...',
    tris: '0x0055485fCa054D165fc0C7D836459722436544c1',
    trisRedeem: '0xB00cAA9aCE48Ad8AcDF8EC77ef1CE77bf879D91C',
    pint: '0x14046EAa7374CdE165eD7218Ab2d8E2f42c0f23C',
    opps: '0x5522c1B6dc4F533a798908430Af7a3f5bbED801a',
  },
  localhost: {
    wock: '0xcB72ed407Cdb97a7161a2b567b5f50B55585Ee6b',
    wockRedeem: '0x...',
    tris: '0x0055485fCa054D165fc0C7D836459722436544c1',
    trisRedeem: '0xB00cAA9aCE48Ad8AcDF8EC77ef1CE77bf879D91C',
    pint: '0x14046EAa7374CdE165eD7218Ab2d8E2f42c0f23C',
    opps: '0x5522c1B6dc4F533a798908430Af7a3f5bbED801a',
  },
  mainnet: {
    wock: '0xcB72ed407Cdb97a7161a2b567b5f50B55585Ee6b',
    wockRedeem: '0x8a20b541aacc05f824f67532de995e3687431499',
    tris: '0x0055485fCa054D165fc0C7D836459722436544c1',
    trisRedeem: '0xfef8205d4c472fe0442fc1026acc34e6d88e438c',
    pint: '0x58fB30A61C218A3607e9273D52995a49fF2697Ee',
    opps: '0xd665F1153599e8F799b2514069dF4481d3bcb043', // TODO
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

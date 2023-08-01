export const IS_MINT_ENABLED = false;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/feed/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0x0bA5835F87BAB3d0D66e180ea58e3b4D87ef0f17',
  },
  mainnet: {
    tris: '0x0055485fCa054D165fc0C7D836459722436544c1',
  },
};

export const EXPLORER_URLS: any = {
  sepolia: 'https://sepolia.etherscan.io',
  mainnet: 'https://etherscan.io',
};

export const IS_MINT_ENABLED = true;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/feed/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0x6ab5E7fB352a2ccF58613703dA10AF7516A8dCae',
  },
  mainnet: {
    tris: '',
  },
};

export const EXPLORER_URLS: any = {
  sepolia: 'https://sepolia.etherscan.io',
  mainnet: 'https://etherscan.io',
};

export const IS_MINT_ENABLED = true;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/feed/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0x2112392a190c1410ffC48Ee972738c9BEdb022C4',
  },
  mainnet: {
    tris: '',
  },
};

export const EXPLORER_URLS: any = {
  sepolia: 'https://sepolia.etherscan.io',
  mainnet: 'https://etherscan.io',
};

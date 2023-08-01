export const IS_MINT_ENABLED = true;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/feed/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0x3d8616bb9f541bD8a256F0b1de13fBCC135A48bf',
  },
  mainnet: {
    tris: '0xC5CdeA33eF1B452B6d839eE7D3072Ea0827B1935',
  },
};

export const EXPLORER_URLS: any = {
  sepolia: 'https://sepolia.etherscan.io',
  mainnet: 'https://etherscan.io',
};

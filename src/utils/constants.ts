export const IS_MINT_ENABLED = true;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pintswap0x',
  medium: 'https://medium.com/feed/pintswap',
};

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

export const CONTRACT_ADDRESSES: any = {
  sepolia: {
    tris: '0xD56c53cf839066524501483fDD4343B75dCEdf98',
  },
  mainnet: {
    tris: '0x3d8616bb9f541bD8a256F0b1de13fBCC135A48bf',
  },
};

export const EXPLORER_URLS: any = {
  sepolia: 'https://sepolia.etherscan.io',
  mainnet: 'https://etherscan.io',
};

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, localhost, hardhat, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { DEV, NETWORK } from './constants';
import merge from 'lodash.merge';

const { chains, publicClient } = configureChains(
  DEV ? [mainnet, sepolia, hardhat, localhost] : [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'PintSwap',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export const walletTheme = merge(
  darkTheme({
    borderRadius: 'small',
    accentColor: '#FF6FA9',
  })
);

const getPublicClient = () => {
  let chainId;
  if (NETWORK === 'hardhat') chainId = 31337;
  else if (NETWORK === 'localhost') chainId = 1337;
  else if (NETWORK === 'sepolia') chainId = 11155111;
  else chainId = 1;
  return publicClient({ chainId });
};

export {
  WagmiConfig,
  wagmiConfig,
  RainbowKitProvider,
  chains,
  getPublicClient,
};

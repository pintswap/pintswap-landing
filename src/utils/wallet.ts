import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, hardhat, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { DEV } from './constants';
import merge from 'lodash.merge';

const { chains, publicClient } = configureChains(
  DEV ? [mainnet] : [mainnet, sepolia, hardhat],
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

export { WagmiConfig, wagmiConfig, RainbowKitProvider, chains, publicClient };

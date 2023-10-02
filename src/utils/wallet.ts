// import '@rainbow-me/rainbowkit/styles.css';

// import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
// import { mainnet, sepolia } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';
// import { NETWORK } from './constants';

// const ACTIVE_CHAIN = NETWORK === 'sepolia' ? sepolia : mainnet;

// const { chains, publicClient } = configureChains(
//   [ACTIVE_CHAIN],
//   [publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'PintSwap',
//   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

// export {
//   WagmiConfig,
//   wagmiConfig,
//   RainbowKitProvider,
//   chains,
//   publicClient,
//   ACTIVE_CHAIN,
// };

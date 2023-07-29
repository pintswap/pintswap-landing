import { AppProps } from 'next/app';

import '../styles/global.css';
import { MediumStore } from '../stores/medium';
import { RainbowKitProvider, WagmiConfig, chains, wagmiConfig } from '../utils';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <MediumStore>
          <AnyComponent {...pageProps} />
        </MediumStore>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;

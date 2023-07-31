import { AppProps } from 'next/app';

import '../styles/global.css';
import { MediumStore } from '../stores/medium';
import {
  RainbowKitProvider,
  WagmiConfig,
  chains,
  wagmiConfig,
  queryClient,
  QueryClientProvider,
} from '../utils';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <MediumStore>
            <AnyComponent {...pageProps} />
          </MediumStore>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default MyApp;

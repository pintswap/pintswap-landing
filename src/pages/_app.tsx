import { AppProps } from 'next/app';
import '../styles/global.css';
import { MediumStore, SubgraphStore } from '../stores';
import {
  AllRoundGothic,
  chains,
  queryClient,
  QueryClientProvider,
  RainbowKitProvider,
  wagmiConfig,
  WagmiConfig,
} from '../utils';
import { ParallaxProvider } from 'react-scroll-parallax';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <MediumStore>
            <SubgraphStore>
              <ParallaxProvider>
                <main className={AllRoundGothic.className}>
                  <Component {...pageProps} />
                </main>
              </ParallaxProvider>
            </SubgraphStore>
          </MediumStore>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default MyApp;

import { AppProps } from 'next/app';
import '../styles/global.css';
import { MediumStore, SubgraphStore } from '../stores';
import { AllRoundGothic, queryClient, QueryClientProvider } from '../utils';
import { ParallaxProvider } from 'react-scroll-parallax';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MediumStore>
        <SubgraphStore>
          <ParallaxProvider>
            <main className={AllRoundGothic.className}>
              <Component {...pageProps} />
            </main>
          </ParallaxProvider>
        </SubgraphStore>
      </MediumStore>
    </QueryClientProvider>
  );
};

export default MyApp;

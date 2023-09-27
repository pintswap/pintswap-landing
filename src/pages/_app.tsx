import { AppProps } from 'next/app';
import '../styles/global.css';
import { MediumStore } from '../stores/medium';
import { AllRoundGothic, queryClient, QueryClientProvider } from '../utils';
import { ParallaxProvider } from 'react-scroll-parallax';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MediumStore>
        <ParallaxProvider>
          <main className={AllRoundGothic.className}>
            <Component {...pageProps} />
          </main>
        </ParallaxProvider>
      </MediumStore>
    </QueryClientProvider>
  );
};

export default MyApp;

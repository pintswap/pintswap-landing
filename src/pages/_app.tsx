import { AppProps } from 'next/app';
import '../styles/global.css';
import { MediumStore } from '../stores/medium';
import { AllRoundGothic, queryClient, QueryClientProvider } from '../utils';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MediumStore>
        <main className={AllRoundGothic.className}>
          <Component {...pageProps} />
        </main>
      </MediumStore>
    </QueryClientProvider>
  );
};

export default MyApp;

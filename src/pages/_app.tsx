import { AppProps } from 'next/app';

import '../styles/global.css';
import { MediumStore } from '../stores/medium';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  return (
    <MediumStore>
      <AnyComponent {...pageProps} />
    </MediumStore>
  );
};

export default MyApp;

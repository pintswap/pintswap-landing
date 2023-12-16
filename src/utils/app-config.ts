import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AppConfig = {
  site_name: 'PintSwap',
  title: 'PintSwap | P2P OTC Crypto Exchange',
  description:
    'The most secure peer-to-peer token swap. Enabling slippage-free, OTC token trading, all while avoiding token taxes.',
  canonical: 'https://pintswap.exchange',
  openGraph: {
    url: 'https://pintswap.exchange',
    title: 'PintSwap | P2P OTC Crypto Exchange',
    description:
      'The most secure peer-to-peer token swap. Enabling slippage-free, OTC token swapping without relying on liquidity.',
    images: [
      {
        url: 'https://pintswap.exchange/assets/logo/pintswap-logo.svg',
        width: 800,
        height: 600,
        alt: 'PintSwap logo',
        type: 'image/svg',
      },
    ],
    siteName: 'PintSwap',
  },
  twitter: {
    handle: '@0xpintswap',
    site: '@0xpintswap',
    cardType: 'summary_large_image',
  },
  locale: 'en',
  legalName: 'PintSwap LLC',
  image: 'https://pintswap.exchange/assets/logo/pintswap-logo.svg',
};

export { QueryClientProvider, queryClient, AppConfig };

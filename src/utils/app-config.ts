import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AppConfig = {
  site_name: 'PintSwap',
  title: 'PintSwap | OTC Crypto Exchange',
  twitter: '@0xpintswap',
  description:
    'The most secure peer-to-peer ERC20 token swap. Enabling slippage-free, OTC token swapping without relying on liquidity.',
  locale: 'en',
  legalName: 'PintSwap LLC',
  image: 'link to image',
};

export { QueryClientProvider, queryClient, AppConfig };

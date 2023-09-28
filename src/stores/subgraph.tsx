import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTokenStats, getUniqueTokens, sumListOfObjs } from '../utils';
import { useTrades, usePrices } from '../hooks';

// Types
export type ISubgraphStoreProps = {
  trades: IReadablePSTrade[];
  tokenStats: ITokenStats | any;
  loading: boolean;
  error: boolean;
};

export type ISubgraphPSTrade = {
  id: string;
  timestamp: string;
  chainId: string;
  pair: string;
  maker: string;
  taker: string;
  gets: {
    id?: string;
    amount: string;
    token: string;
  };
  gives: {
    id?: string;
    amount: string;
    token: string;
  };
};

export type IReadablePSTrade = {
  txHash: string;
  datetime: string;
  chain: string;
  chainId: string;
  maker: string;
  taker: string;
  gets: {
    amount: string;
    symbol: string;
    address: string;
  };
  gives: {
    amount: string;
    symbol: string;
    address: string;
  };
};

export type ITokenStats = {
  address: string;
  amountNative: string;
  amountEth: string;
  amountUsd: string;
  transactions: string;
  priceEth: string;
  priceUsd: string;
};

// Context
const SubgraphContext = createContext<ISubgraphStoreProps>({
  trades: [],
  tokenStats: {},
  loading: true,
  error: false,
});

// Wrapper
export function SubgraphStore(props: { children: ReactNode }) {
  const [tokenStats, setTokenStats] = useState({});

  const { data: psTrades, loading: psLoading, error: psError } = useTrades();
  const { getManyUniswapV2Tokens, getEthPrice } = usePrices();

  useEffect(() => {
    (async () => {
      const uniqueAssets = getUniqueTokens(psTrades);
      const uniRes = await getManyUniswapV2Tokens(uniqueAssets);
      const ethPrice = await getEthPrice();
      // Token Stats
      const sTokenStats = getTokenStats(psTrades, uniRes, ethPrice);
      setTokenStats({
        ...sTokenStats,
        all: {
          transactions: psTrades.length,
          amountEth: sumListOfObjs(Object.values(sTokenStats), 'amountEth'),
          amountUsd: sumListOfObjs(Object.values(sTokenStats), 'amountUsd'),
        },
      });
    })().catch((err) => console.error(err));
  }, [psTrades.length]);

  return (
    <SubgraphContext.Provider
      value={{
        trades: psTrades,
        tokenStats,
        loading: psLoading,
        error: psError,
      }}
    >
      {props.children}
    </SubgraphContext.Provider>
  );
}

// Independent
export function useSubgraphStore() {
  return useContext(SubgraphContext);
}

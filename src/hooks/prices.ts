import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { SUBGRAPH_ENDPOINTS, getApolloClient } from '../utils';
import { ethers } from 'ethers';

export type IUniswapToken = {
  address: string;
  ethPrice: string;
  symbol: string;
  decimals: string;
};

export function usePrices(tokens?: string[]) {
  const [data, setData] = useState<IUniswapToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getEthPrice() {
    const ethQuery = await getApolloClient(SUBGRAPH_ENDPOINTS.uniswapv3).query({
      query: gql`
        query EthPrice {
          bundle(id: "1") {
            ethPriceUSD
          }
        }
      `,
    });
    if (ethQuery.data.bundle.ethPriceUSD)
      return ethQuery.data.bundle.ethPriceUSD;
    console.error('#getEthPrice:', ethQuery.error || ethQuery.errors);
    return '0';
  }

  async function getUniswapV2Token(address: string): Promise<IUniswapToken> {
    const uniQuery = await getApolloClient(SUBGRAPH_ENDPOINTS.uniswapv2).query({
      query: gql`
        query UniswapToken($id: String!) {
          token(id: $id) {
            id
            derivedETH
            symbol
            decimals
          }
        }
      `,
      variables: { id: ethers.getAddress(address).toLowerCase() },
    });

    if (uniQuery.data?.token) {
      const { id, derivedETH, symbol, decimals } = uniQuery.data.token;
      return { address: id, ethPrice: derivedETH, symbol, decimals };
    }

    console.error(
      '#getUniswapV2Token:',
      uniQuery.error || uniQuery.errors || 'Token not found.'
    );
    return { address: '', ethPrice: '', symbol: '', decimals: '' };
  }

  async function getManyUniswapV2Tokens(
    addresses: string[]
  ): Promise<IUniswapToken[]> {
    if (!addresses) return [];
    const validAddresses = addresses.filter((t) => ethers.isAddress(t));
    const promises = await Promise.all(
      validAddresses.map(async (token) => getUniswapV2Token(token))
    );
    return promises;
  }

  useEffect(() => {
    (async () => {
      if (tokens?.length && !data.length) {
        setLoading(true);
        const tokenPrices = await getManyUniswapV2Tokens(tokens);
        setData(tokenPrices);
        setLoading(false);
      }
    })().catch((err) => {
      console.error(err);
      setError(true);
      setLoading(false);
    });
  }, [tokens?.length, tokens, data.length]);

  return {
    data,
    loading,
    error,
    getUniswapV2Token,
    getManyUniswapV2Tokens,
    getEthPrice,
  };
}

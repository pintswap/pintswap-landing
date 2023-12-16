import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import {
  SUBGRAPH_ENDPOINTS,
  getApolloClient,
  psTradeToReadable,
} from '../utils';
import { ISubgraphPSTrade } from '../stores';

export function useTrades() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getPintswapTrades(
    chain: 'eth' | 'arb' | 'avax' = 'eth'
  ): Promise<ISubgraphPSTrade[]> {
    const psQuery = await getApolloClient(
      SUBGRAPH_ENDPOINTS.pintswap[chain]
    ).query({
      query: gql`
        query PSTrades {
          pintswapTrades(orderBy: timestamp, orderDirection: asc, first: 999) {
            id
            timestamp
            chainId
            pair
            maker
            taker
            gets {
              amount
              token
            }
            gives {
              amount
              token
            }
          }
        }
      `,
    });
    if (psQuery.data?.pintswapTrades?.length) {
      return psQuery.data.pintswapTrades;
    }

    console.error(
      '#getPintswapTrades:',
      psQuery.error || psQuery.errors || psQuery
    );
    return [];
  }

  async function getPintswapTradesAndFormat() {
    const [eth, arb, avax] = await Promise.all([
      getPintswapTrades('eth'),
      getPintswapTrades('arb'),
      getPintswapTrades('avax'),
    ]);
    const returnData = await Promise.all(
      [...eth, ...arb, ...avax].map(async (el) => psTradeToReadable(el))
    );
    return returnData;
  }

  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        const returnData = await getPintswapTradesAndFormat();
        setData(returnData);
        setLoading(false);
      })().catch((err) => {
        console.error(err);
        setError(true);
      });
    }
  }, []);

  return {
    data,
    loading,
    error,
    getPintswapTrades,
  };
}

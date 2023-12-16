import { Contract, formatUnits, getAddress } from 'ethers';
import { IReadablePSTrade, ISubgraphPSTrade, ITokenStats } from '../stores';
import {
  CHAINS_BY_ID,
  DECIMAL_CACHE,
  SYMBOL_CACHE,
  getTokenList,
} from './constants';
import { providerFromChainId } from './provider';
import { IUniswapToken } from '../hooks';

export const convertToUrl = (str: string) => {
  if (!str) return '';
  const replaceSpaces = str.replaceAll(' ', '-');
  return replaceSpaces.toLowerCase();
};

export function hourDiff(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export function secondsDiff(dt2: Date, dt1: Date) {
  return (dt2.getTime() - dt1.getTime()) / 1000;
}

export function minutesDiff(dateTimeValue2: Date, dateTimeValue1: Date) {
  let differenceValue =
    (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
  differenceValue /= 60;
  return Math.abs(Math.round(differenceValue));
}

export function padBuffer(addr: string) {
  return Buffer.from(addr.substr(2).padStart(32 * 2, '0'), 'hex');
}

export function stringToBytes32(value: string) {
  return Array.from(Buffer.from(value.substr(2), 'hex')) as any;
}

export function truncate(s?: string, amount?: number) {
  if (!s) return s || '';
  if (s.match(/\.drip$/)) return s;
  return `${s.slice(0, amount || 4)}...${s.slice(amount ? amount * -1 : -4)}`;
}

export function getAvgOfObjArr(arr: any[], key: string) {
  let sum = 0;
  arr.map((el) => (sum += Number(el[key])));
  return sum / arr.length;
}

export async function getSymbol(address: string, chainId = '1') {
  if (!address) return '';

  const cleanAddress = getAddress(address);
  if (SYMBOL_CACHE[cleanAddress]) return SYMBOL_CACHE[cleanAddress];

  const found = getTokenList(Number(chainId)).find(
    (el) => getAddress(el.address) === cleanAddress
  );
  if (found) return found.symbol;

  const contract: any = new Contract(
    cleanAddress,
    ['function symbol() view returns (string)'],
    providerFromChainId(Number(chainId))
  );
  try {
    const symbol = await contract.symbol();
    SYMBOL_CACHE[cleanAddress] = symbol;
    return symbol;
  } catch (e) {
    console.error(`#getSymbol: ${e}`);
    return '';
  }
}

export async function getDecimals(address: string, chainId = '1') {
  if (!address) return '';

  const cleanAddress = getAddress(address);
  if (DECIMAL_CACHE[cleanAddress]) return DECIMAL_CACHE[cleanAddress];

  const found = getTokenList(Number(chainId)).find(
    (el) => getAddress(el.address) === cleanAddress
  );
  if (found?.decimals) return found.decimals;

  const contract: any = new Contract(
    cleanAddress,
    ['function decimals() view returns (uint8)'],
    providerFromChainId(Number(chainId))
  );
  try {
    const decimals = await contract.decimals();
    DECIMAL_CACHE[cleanAddress] = decimals;
    return decimals;
  } catch (e) {
    console.error(`#getDecimals: ${e}`);
    return '';
  }
}

export function chainIdToName(chainId: string) {
  if (!chainId) return '';

  let cleanedUp: any = chainId;
  if (chainId && chainId.includes('.')) cleanedUp = chainId.split('.')[0];
  if (CHAINS_BY_ID[cleanedUp]) return CHAINS_BY_ID[cleanedUp];
  return cleanedUp;
}

export async function psTradeToReadable(
  psTrade: ISubgraphPSTrade
): Promise<IReadablePSTrade> {
  const getsSymbol = await getSymbol(psTrade.gets.token);
  const givesSymbol = await getSymbol(psTrade.gives.token);
  return {
    txHash: psTrade.id,
    datetime: new Date(Number(psTrade.timestamp) * 1000).toISOString(),
    chain: chainIdToName(psTrade.chainId),
    chainId: psTrade.chainId,
    maker: getAddress(psTrade.maker),
    taker: getAddress(psTrade.taker),
    gets: {
      amount: formatUnits(
        psTrade.gets.amount,
        getsSymbol === 'USDC' ? 6 : 18
        // await getDecimals(psTrade.gets.token, psTrade.chainId),
      ),
      symbol: getsSymbol,
      address: getAddress(psTrade.gets.token),
    },
    gives: {
      amount: formatUnits(
        psTrade.gives.amount,
        givesSymbol === 'USDC' ? 6 : 18
        // await getDecimals(psTrade.gets.token, psTrade.chainId),
      ),
      symbol: givesSymbol,
      address: getAddress(psTrade.gives.token),
    },
  };
}

export const findTokenInUniswapRes = (
  uniswapData: IUniswapToken[],
  tokenAddress: string
) =>
  uniswapData.find(
    (x) => x.address?.toLowerCase() === tokenAddress?.toLowerCase()
  );

export function getTokenStats(
  psTrades: IReadablePSTrade[],
  uniswapData: any[],
  ethPrice: string
): Record<string, ITokenStats> {
  const finalObj: any = {};
  psTrades.forEach((trade) => {
    const givesAsset: any = trade.gives.symbol || 'NFT';
    const givesAmount = parseFloat(trade.gives.amount);
    const givesAddress = trade.gives.address;

    const getsAsset: any = trade.gets.symbol || 'NFT';
    const getsAmount = parseFloat(trade.gets.amount);
    const getsAddress = trade.gets.address;

    if (finalObj[givesAsset]) {
      const sum = finalObj[givesAsset].amountNative + givesAmount;
      finalObj[givesAsset] = {
        transactions: finalObj[givesAsset].transactions + 1 || 0,
        amountNative: finalObj[givesAsset].amountNative + givesAmount,
        address: givesAddress,
      };
    } else {
      finalObj[givesAsset] = {
        transactions: 1,
        amountNative: givesAmount,
        address: givesAddress,
      };
    }

    if (finalObj[getsAsset]) {
      finalObj[getsAsset] = {
        transactions: finalObj[getsAsset].transactions + 1 || 0,
        amountNative: finalObj[getsAsset].amountNative + getsAmount,
        address: getsAddress,
      };
    } else {
      finalObj[getsAsset] = {
        transactions: 1,
        amountNative: getsAmount,
        address: getsAddress,
      };
    }
  });

  const final: any = {};
  Object.keys(finalObj).forEach((key) => {
    const foundEthPrice = parseFloat(
      findTokenInUniswapRes(uniswapData, finalObj[key].address)?.ethPrice || '0'
    );
    final[key] = {
      ...finalObj[key],
      amountEth: finalObj[key].amountNative * foundEthPrice,
      amountUsd: finalObj[key].amountNative * foundEthPrice * Number(ethPrice),
    };
  });
  return final;
}

export function getUniqueTokens(psTrades: IReadablePSTrade[]): string[] {
  const final: string[] = [];
  psTrades.forEach((trade) => {
    if (!final.includes(trade.gets.address))
      final.push(getAddress(trade.gets.address));
    if (!final.includes(trade.gives.address))
      final.push(getAddress(trade.gives.address));
  });
  return final;
}

export function getTradesPerDay(
  psTrades: IReadablePSTrade[],
  uniswapData?: any[],
  ethPrice?: string
) {
  if (uniswapData && uniswapData.length && ethPrice) {
    const count = Array.from(
      psTrades.reduce((r, c) => {
        const cleanDate = new Date(
          c.datetime.split('T')[0] as string
        ).toLocaleDateString();
        const getsEthPrice = parseFloat(
          findTokenInUniswapRes(uniswapData, c.gets.address)?.ethPrice || '0'
        );
        const givesEthPrice = parseFloat(
          findTokenInUniswapRes(uniswapData, c.gives.address)?.ethPrice || '0'
        );
        return r.set(cleanDate, {
          transactions: (r.get(cleanDate)?.transactions || 0) + 1,
          amountEth:
            (r.get(cleanDate)?.amountEth || 0) +
            getsEthPrice * parseFloat(c.gets.amount) +
            givesEthPrice * parseFloat(c.gives.amount),
        });
      }, new Map()),
      ([name, trades]) => ({
        name,
        transactions: trades.transactions,
        amountEth: trades.amountEth,
      })
    );
    const withUsd = count.map((el) => ({
      ...el,
      amountUsd: el.amountEth * parseFloat(ethPrice),
    }));
    return withUsd;
  }

  const count = Array.from(
    psTrades.reduce((r, c) => {
      const cleanDate = new Date(
        c.datetime.split('T')[0] as string
      ).toLocaleDateString();
      return r.set(cleanDate, (r.get(cleanDate) || 0) + 1);
    }, new Map()),
    ([name, Trades]) => ({ name, Trades })
  );
  return count;
}

export const sumObjVals = (obj: any) =>
  Object.values(obj).reduce((a, b) => Number(a) + Number(b), 0);

export const sumListOfObjs = (arr: any[], key: string) => {
  return arr.reduce((acc, obj) => {
    return acc + obj[key];
  }, 0);
};

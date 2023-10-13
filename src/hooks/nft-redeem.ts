import { getContract } from 'viem';
import { CONTRACT_ADDRESSES, NETWORK, alchemy, publicClient } from '../utils';
import { useAccount, useWalletClient } from 'wagmi';
import { useEffect, useState } from 'react';
import { ZeroAddress } from 'ethers';

const nftAbi = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const redeemAbi = [
  {
    inputs: [
      { internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' },
    ],
    name: 'redeem',
    outputs: [{ internalType: 'uint256', name: 'output', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export const useNftRedeem = () => {
  const [trisIds, setTrisIds] = useState<bigint[]>([]);
  const [wockIds, setWockIds] = useState<bigint[]>([]);
  const [isIdsLoading, setIsIdsLoading] = useState(false);

  const [trisRedeemTxHash, setTrisRedeemTxHash] = useState('');
  const [wockRedeemTxHash, setWockRedeemTxHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { address } = useAccount();
  const { data: signer } = useWalletClient();

  const tris = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].tris,
    abi: nftAbi,
    publicClient: publicClient({}),
  });

  const wock = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].wock,
    abi: nftAbi,
    publicClient: publicClient({}),
  });

  // Wallet holds NFTs
  const holdsNfts = () => {
    if (wockIds?.length || trisIds?.length) return true;
    return false;
  };

  // Reset
  const reset = (clearSuccess: boolean) => {
    setTrisRedeemTxHash('');
    setWockRedeemTxHash('');
    setTrisIds([]);
    setWockIds([]);
    clearSuccess && setIsSuccess(false);
    error && setError('');
    isLoading && setIsLoading(false);
    isIdsLoading && setIsIdsLoading(false);
  };

  // Redeem NFT
  const redeem = async () => {
    if (!signer || !address) {
      setError('Wallet not connected');
      return;
    }
    if (!wockIds?.length && !trisIds?.length) {
      setError('Wallet does not hold any PintSwap NFTs');
      return;
    }
    setIsLoading(true);

    // MOCK - START
    setTimeout(() => {
      setIsSuccess(true);
      setTrisRedeemTxHash(ZeroAddress);
      setIsLoading(false);
    }, 5000);

    // MOCK - END

    // try {
    //   if(trisIds?.length) {
    //     const { request } = await publicClient({}).simulateContract({
    //       account: address,
    //       address: CONTRACT_ADDRESSES[NETWORK].trisRedeem,
    //       abi: redeemAbi,
    //       functionName: 'redeem',
    //       args: [trisIds],
    //     });
    //     const tx = await signer.writeContract(request);
    //     setTrisRedeemTxHash(tx);
    //   }
    //   if(wockIds?.length) {
    //     const { request } = await publicClient({}).simulateContract({
    //       account: address,
    //       address: CONTRACT_ADDRESSES[NETWORK].wockRedeem,
    //       abi: redeemAbi,
    //       functionName: 'redeem',
    //       args: [wockIds],
    //     });
    //     const tx = await signer.writeContract(request);
    //     setWockRedeemTxHash(tx);
    //   }
    //   setIsLoading(false);
    // } catch (err) {
    //   setIsLoading(false);
    //   const errorMsg =
    //     String(err).includes(`reverted`) ||
    //     String(err).includes('exceeds the balance')
    //       ? String(err)
    //       : '';
    //   if (errorMsg) {
    //     if (errorMsg.includes('Minting is not enabled'))
    //       setError('Minting not enabled');
    //     else if (
    //       errorMsg.includes('Not enough ETH sent') ||
    //       errorMsg.includes('exceeds the balance of the account')
    //     )
    //       setError('Not enough ETH');
    //     else if (errorMsg.includes('Exceeds token supply'))
    //       setError('TRIS is sold out');
    //     else if (errorMsg.includes('User already claimed'))
    //       setError('Already claimed');
    //     else if (errorMsg.includes('Invalid merkle proof'))
    //       setError('Not on whitelist');
    //   }
    //   console.error(err);
    // }
  };

  // Reset error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  // Get TRIS and WOCK nfts
  useEffect(() => {
    if (address) {
      (async () => {
        setIsIdsLoading(true);
        const trisNfts: bigint[] = [];
        const wockNfts: bigint[] = [];
        const nftsIterable = alchemy.nft.getNftsForOwnerIterator(address, {
          contractAddresses: [
            CONTRACT_ADDRESSES[NETWORK].tris,
            CONTRACT_ADDRESSES[NETWORK].wock,
          ],
        });
        for await (const nft of nftsIterable) {
          if (nft.description.includes('WOCK'))
            wockNfts.push(BigInt(nft.tokenId));
          if (nft.description.includes('TRIS'))
            trisNfts.push(BigInt(nft.tokenId));
        }
        setWockIds(wockNfts);
        setTrisIds(trisNfts);
        setIsIdsLoading(false);
      })().catch((err) => console.error(err));
    }
  }, [address]);

  return {
    redeem,
    isLoading,
    trisRedeemTxHash,
    wockRedeemTxHash,
    trisIds,
    wockIds,
    error,
    isIdsLoading,
    holdsNfts,
    isSuccess,
    reset,
  };
};

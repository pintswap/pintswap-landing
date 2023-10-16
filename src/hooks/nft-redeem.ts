import { getContract } from 'viem';
import {
  CONTRACT_ADDRESSES,
  NETWORK,
  NFT_ABI,
  REDEEM_ABI,
  alchemy,
  getPublicClient,
} from '../utils';
import { useAccount, useWalletClient } from 'wagmi';
import { useEffect, useState } from 'react';

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
    abi: NFT_ABI,
    publicClient: getPublicClient(),
  });

  const wock = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].wock,
    abi: NFT_ABI,
    publicClient: getPublicClient(),
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

    try {
      console.log('Network:', NETWORK);
      console.log('Contracts:', CONTRACT_ADDRESSES[NETWORK]);
      console.log('Signer:', signer);

      if (trisIds?.length) {
        // TRIS: approve all
        const { request: approveReq } =
          await getPublicClient().simulateContract({
            account: address,
            address: CONTRACT_ADDRESSES[NETWORK].tris,
            abi: NFT_ABI,
            functionName: 'setApprovalForAll',
            args: [CONTRACT_ADDRESSES[NETWORK].trisRedeem, true],
          });
        const approveAllTx = await signer.writeContract(approveReq);
        console.log('TRIS: approveAllTx', approveAllTx);
        // TRIS: redeem
        const { request: redeemReq } = await getPublicClient().simulateContract(
          {
            account: address,
            address: CONTRACT_ADDRESSES[NETWORK].trisRedeem,
            abi: REDEEM_ABI,
            functionName: 'redeem',
            args: [trisIds],
          }
        );
        const tx = await signer.writeContract(redeemReq);
        setTrisRedeemTxHash(tx);
      }
      if (wockIds?.length) {
        // WOCK: approve all
        const { request: approveReq } =
          await getPublicClient().simulateContract({
            account: address,
            address: CONTRACT_ADDRESSES[NETWORK].wock,
            abi: NFT_ABI,
            functionName: 'setApprovalForAll',
            args: [CONTRACT_ADDRESSES[NETWORK].trisRedeem, true],
          });
        const approveAllTx = await signer.writeContract(approveReq);
        console.log('WOCK: approveAllTx', approveAllTx);
        // WOCK: redeem
        const { request: redeemReq } = await getPublicClient().simulateContract(
          {
            account: address,
            address: CONTRACT_ADDRESSES[NETWORK].wockRedeem,
            abi: REDEEM_ABI,
            functionName: 'redeem',
            args: [wockIds],
          }
        );
        const tx = await signer.writeContract(redeemReq);
        setWockRedeemTxHash(tx);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errorMsg =
        String(err).includes(`reverted`) ||
        String(err).includes('exceeds the balance')
          ? String(err)
          : '';
      if (errorMsg) {
        if (errorMsg.includes('Minting is not enabled'))
          setError('Minting not enabled');
        else if (
          errorMsg.includes('Not enough ETH sent') ||
          errorMsg.includes('exceeds the balance of the account')
        )
          setError('Not enough ETH');
        else if (errorMsg.includes('Exceeds token supply'))
          setError('TRIS is sold out');
        else if (errorMsg.includes('User already claimed'))
          setError('Already claimed');
        else if (errorMsg.includes('Invalid merkle proof'))
          setError('Not on whitelist');
      }
      console.error(err);
    }
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
    (async () => {
      if (address) {
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
      }
    })().catch((err) => console.error(err));
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

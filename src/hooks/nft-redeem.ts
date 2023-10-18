import { getContract } from 'viem';
import {
  CONTRACT_ADDRESSES,
  DEV,
  NETWORK,
  NFT_ABI,
  REDEEM_ABI,
  alchemy,
  getPublicClient,
} from '../utils';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import { waitForTransaction, prepareWriteContract } from '@wagmi/core';
import { useEffect, useState } from 'react';

export const useNftRedeem = () => {
  const [trisIds, setTrisIds] = useState<bigint[]>([]);
  const [wockIds, setWockIds] = useState<bigint[]>([]);
  const [isIdsLoading, setIsIdsLoading] = useState(false);

  const [trisRedeemTxHash, setTrisRedeemTxHash] = useState('');
  const [wockRedeemTxHash, setWockRedeemTxHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [step, setStep] = useState<
    | 'start'
    | 'wock:approve'
    | 'wock:redeem'
    | 'tris:approve'
    | 'tris:redeem'
    | 'complete'
  >('start');

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useWalletClient();

  const tris = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].tris,
    abi: NFT_ABI,
    publicClient: getPublicClient(),
  });
  const isTrisApproved = async () =>
    address
      ? tris.read.isApprovedForAll([
          address,
          CONTRACT_ADDRESSES[NETWORK].trisRedeem,
        ])
      : false;

  const wock = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].wock,
    abi: NFT_ABI,
    publicClient: getPublicClient(),
  });
  const isWockApproved = async () =>
    address
      ? tris.read.isApprovedForAll([
          address,
          CONTRACT_ADDRESSES[NETWORK].wockRedeem,
        ])
      : false;

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
      if (DEV) console.log('Network:', NETWORK);
      if (DEV) console.log('Contracts:', CONTRACT_ADDRESSES[NETWORK]);
      if (DEV) console.log('Signer:', signer);

      if (wockIds?.length) {
        // WOCK: approve all
        if (!(await isWockApproved())) {
          const { request } = await prepareWriteContract({
            account: address,
            address: CONTRACT_ADDRESSES[NETWORK].wock,
            abi: NFT_ABI,
            functionName: 'setApprovalForAll',
            args: [CONTRACT_ADDRESSES[NETWORK].wockRedeem, true],
            // gas: BigInt(100000), // TODO: is this needed
          });
          const approveTxHash = await signer.writeContract(request);
          setStep('wock:approve');
          const approveWaitTx = await waitForTransaction({
            hash: approveTxHash,
          });
          console.log('WOCK: setApprovalForAll(): Success', approveWaitTx);
        }
        // WOCK: redeem
        const { request: redeemReq } = await prepareWriteContract({
          account: address,
          address: CONTRACT_ADDRESSES[NETWORK].wockRedeem,
          abi: REDEEM_ABI,
          functionName: 'redeem',
          args: [wockIds],
        });
        const redeemTxHash = await signer.writeContract(redeemReq);
        setStep('wock:redeem');
        const redeemWaitTx = await waitForTransaction({
          hash: redeemTxHash,
          timeout: 10 * 60 * 1000, // 10 minute timeout
        });
        console.log('WOCKRedemption: redeem(): Success', redeemWaitTx);
        setTrisRedeemTxHash(redeemTxHash);
      }
      if (trisIds?.length) {
        // TRIS: approve all
        if (!(await isTrisApproved())) {
          const config: any = {
            account: address,
            address: CONTRACT_ADDRESSES[NETWORK].tris,
            abi: NFT_ABI,
            functionName: 'setApprovalForAll',
            args: [CONTRACT_ADDRESSES[NETWORK].trisRedeem, true],
            // gas: BigInt(100000),
          };
          if (NETWORK === 'localhost') config.gas = BigInt(100000);
          const { request } = await prepareWriteContract(config);
          const approveTxHash = await signer.writeContract(request);
          setStep('tris:approve');
          console.log('TRIS: setApprovalForAll(): Submitted', approveTxHash);
          const approveWaitTx = await waitForTransaction({
            hash: approveTxHash,
            timeout: 10 * 60 * 1000, // 10 minute timeout
          });
          console.log('TRIS: setApprovalForAll(): Success', approveWaitTx);
        }
        // TRIS: redeem
        const { request: redeemReq } = await prepareWriteContract({
          account: address,
          address: CONTRACT_ADDRESSES[NETWORK].trisRedeem,
          abi: REDEEM_ABI,
          functionName: 'redeem',
          args: [trisIds],
        });
        const redeemTxHash = await signer.writeContract(redeemReq);
        setStep('tris:redeem');
        console.log('TRISRedemption: redeem(): Submitted', redeemTxHash);
        const redeemWaitTx = await waitForTransaction({ hash: redeemTxHash });
        console.log('TRISRedemption: redeem(): Success', redeemWaitTx);
        setTrisRedeemTxHash(redeemTxHash);
      }
      setStep('complete');
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      setStep('start');
      setIsLoading(false);
      console.log(String(err).includes('insufficient allowance'));
      const errorMsg =
        String(err).includes(`reverted`) ||
        String(err).includes('exceeds the balance') ||
        String(err).includes('insufficient allowance')
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
      if (String(err).includes('insufficient allowance')) {
        setError(
          'PINT Deployer has not yet transferred tokens to PINT Treasury'
        );
      }
      if (String(err).includes('Timed out')) {
        setError('Transaction timed out. Please try again.');
      }
      console.error(err);
    }
  };

  // const addPintToWallet = async (e: any) => {
  //   console.log("e", e)
  //   const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
  //   const tokenSymbol = 'TUT';
  //   const tokenDecimals = 18;
  //   const tokenImage = 'http://placekitten.com/200/300';

  //   try {
  //     // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  //     const wasAdded = await (window as any).ethereum.request({
  //       method: 'wallet_watchAsset',
  //       params: {
  //         type: 'ERC20', // Initially only supports ERC20, but eventually more!
  //         options: {
  //           address: tokenAddress, // The address that the token is at.
  //           symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
  //           decimals: tokenDecimals, // The number of decimals in the token
  //           image: tokenImage, // A string url of the token logo
  //         },
  //       },
  //     });

  //     if (wasAdded) {
  //       console.log('Thanks for your interest!');
  //     } else {
  //       console.log('Your loss!');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Reset error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), 6000);
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
  }, [address, chain?.id]);

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
    step,
    // addPintToWallet
  };
};

import { useEffect, useState } from 'react';
import { useAccount, useBalance, useNetwork, useWalletClient } from 'wagmi';
import {
  writeContract,
  prepareWriteContract,
  waitForTransaction,
  readContract,
} from '@wagmi/core';
import {
  ACTIVE_CHAIN_ID,
  CONTRACT_ADDRESSES,
  NETWORK,
  PINT2_ABI,
  PINT_ABI,
} from '../utils';

export const useBurn = () => {
  const [step, setStep] = useState<
    | 'start'
    | 'approve'
    | 'allowance'
    | 'reject'
    | 'reject burn'
    | 'fail'
    | 'approving'
    | 'error'
    | 'burn'
    | 'waiting'
    | 'complete'
    | 'allowed'
  >('start');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useWalletClient();
  const [approved, setApproved] = useState(false);
  const [recheck, setRecheck] = useState(false);

  const CHAIN_ID = chain?.id || ACTIVE_CHAIN_ID;

  const { data: v1Balance } = useBalance({
    address,
    token: CONTRACT_ADDRESSES[NETWORK].pint,
    chainId: CHAIN_ID,
    watch: true,
  });
  // console.log('address:', address, 'signer:', signer);
  // console.log(
  //   'chainID:',
  //   CHAIN_ID,
  //   'NETWORK:',
  //   NETWORK,
  //   'ACTIVE_CHAIN_ID:',
  //   ACTIVE_CHAIN_ID,
  //   'userchain:',
  //   chain
  // );
  // console.log('v1Balance:', v1Balance?.value, 'bigInt', BigInt(0));

  const reset = (clearSuccess: boolean) => {
    clearSuccess && setIsSuccess(false);
    modal && setModal(false);
    step && setStep('approve');
    error && setError('');
    loading && setLoading(false);
    setRecheck(!recheck);
  };

  const approveV1 = async () => {
    if (!signer) {
      console.log('no signer');
      return;
    }
    setModal(true);
    if (v1Balance?.value && v1Balance?.value !== BigInt(0)) {
      setStep('approve');
      try {
        setLoading(true);
        const result = await writeContract({
          address: CONTRACT_ADDRESSES[NETWORK].pint,
          abi: PINT_ABI,
          functionName: 'approve',
          args: [CONTRACT_ADDRESSES[NETWORK].pwap, v1Balance?.value],
        });
        setStep('approving');
        await waitForTransaction({
          chainId: CHAIN_ID,
          hash: result.hash,
        });
        setStep('burn');
      } catch (e: any) {
        const errorMessage = e.message;
        if (errorMessage.includes('User rejected')) {
          console.log('user rejected');
          setStep('reject');
          setLoading(false);
          setError(errorMessage);
          console.log(errorMessage);
          return;
        }
        console.log('user Rejected approval');
        reset(false);
        setLoading(false);
      }
    }
    if (v1Balance?.value && v1Balance?.value === BigInt(0)) {
      console.log('no balance to approve');
      setStep('error');
      setLoading(false);
    }
  };

  const migrate = async () => {
    console.log('step', step);
    if (!address || !signer) {
      console.log('no address yet or signer');
      return;
    }
    setStep('burn');
    setLoading(true);
    setModal(true);
    if (v1Balance?.value && v1Balance?.value !== BigInt(0)) {
      try {
        const { request } = await prepareWriteContract({
          account: address,
          address: CONTRACT_ADDRESSES[NETWORK].pwap,
          abi: PINT2_ABI,
          functionName: 'migrate',
        });
        console.log('Prepare Migration:', request);
        const writeRes = await writeContract(request);
        await waitForTransaction({
          hash: writeRes.hash,
        });
        setStep('complete');
        setIsSuccess(true);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        const errorMessage = e.message;
        console.log(errorMessage);
        if (errorMessage.includes('insufficient allowance')) {
          console.log('insufficent allowance');
          setStep('allowance');
        } else if (errorMessage.includes('User rejected')) {
          console.log('user rejected');
          setStep('reject burn');
        } else {
          console.log('migrate failure');
          setStep('fail');
        }
      }
    } else {
      console.log('no balance to migrate');
      setStep('error');
      setLoading(false);
    }
  };

  const addPwapToWallet = async (e: any) => {
    e.preventDefault();
    const tokenAddress = CONTRACT_ADDRESSES[NETWORK].pwap;
    const tokenSymbol = chain?.id === 1 ? 'PWAP' : 'PINTV2';
    const tokenDecimals = 18;
    const tokenImage = 'https://i.ibb.co/VmhyTxM/PINT.png';

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await (window as any).ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('#addPintToWallet: Added PINT');
      } else {
        console.log('#addPintToWallet: User rejected');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check how much has already been approved
  useEffect(() => {
    (async () => {
      if (address && v1Balance && v1Balance?.formatted !== '0.0') {
        const allowance = await readContract({
          address: CONTRACT_ADDRESSES[NETWORK].pint,
          abi: PINT_ABI,
          functionName: 'allowance',
          args: [address, CONTRACT_ADDRESSES[NETWORK].pwap],
        });
        console.log('allowance:', allowance);
        if (allowance >= v1Balance?.value) {
          setApproved(true);
          setStep('allowed');
        }
      }
    })().catch((e) => console.error(e));
  }, [address, chain?.id, v1Balance?.formatted, approved, recheck]);

  return {
    step,
    setStep,
    loading,
    modal,
    setModal,
    setLoading,
    CHAIN_ID,
    error,
    isSuccess,
    approved,
    reset,
    migrate,
    approveV1,
    addPwapToWallet,
  };
};

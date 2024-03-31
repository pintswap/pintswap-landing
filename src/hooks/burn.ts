import { useState } from 'react';
import { useAccount, useBalance, useNetwork, useWalletClient } from 'wagmi';
import {
  writeContract,
  prepareWriteContract,
  waitForTransaction,
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
    | 'fetching'
    | 'fail'
    | 'approving'
    | 'error'
    | 'burn'
    | 'waiting'
    | 'complete'
  >('start');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useWalletClient();

  const CHAIN_ID = chain?.id || ACTIVE_CHAIN_ID;

  const { data: v1Balance } = useBalance({
    address: CONTRACT_ADDRESSES[NETWORK].pintv1,
    chainId: CHAIN_ID,
    watch: true,
  });

  console.log('v1 balance:', v1Balance?.formatted);

  const reset = (clearSuccess: boolean) => {
    clearSuccess && setIsSuccess(false);
    modal && setModal(false);
    step && setStep('approve');
    error && setError('');
    loading && setLoading(false);
  };
  console.log('chain', ACTIVE_CHAIN_ID, NETWORK);
  // const getBalance = async () => {
  //   try {
  //     if (address && chain) {
  //       setStep('fetching');
  //       setModal(true);
  //       console.log('Fetch Balance::', v1Balance);
  //       // return (balance ? balance.value : BigInt(1000000))
  //       if (v1Balance?.value === BigInt(0)) {
  //         setStep('error');
  //         setLoading(false);
  //         return;
  //       }
  //       return v1Balance?.value;
  //     }
  //     console.log('Address is not provided.');
  //     return null;
  //   } catch (e) {
  //     setStep('fail');
  //     setLoading(false);
  //     console.error('Failed to fetch balance:', e);
  //   }
  // };

  const approveV1 = async () => {
    if (!signer) {
      console.log('no signer');
      return;
    }
    // const balance = await getBalance();
    if (v1Balance?.value && v1Balance?.value !== BigInt(0)) {
      setStep('approving');
      try {
        setLoading(true);
        const result = await writeContract({
          address: CONTRACT_ADDRESSES[NETWORK].pintv2,
          abi: PINT_ABI,
          functionName: 'approve',
          args: [CONTRACT_ADDRESSES[NETWORK].pintv1, v1Balance?.value],
        });
        console.log('approval return', result);
        await waitForTransaction({
          chainId: CHAIN_ID,
          hash: result.hash,
        });
        setStep('burn');
        setLoading(false);
      } catch (e) {
        console.log('user Rejected approval');
        reset(false);
        console.log(e);
      }
    }
    if (v1Balance?.value && v1Balance?.value === BigInt(0)) {
      setStep('error');
    }
  };

  const migrate = async () => {
    if (!address || !signer) {
      console.log('no address yet or signer');
      return;
    }
    setLoading(true);
    try {
      const { request } = await prepareWriteContract({
        account: address,
        address: CONTRACT_ADDRESSES[NETWORK].pintv2,
        abi: PINT2_ABI,
        functionName: 'migrate',
      });
      console.log('prepare migrate?:', request);
      const data = await writeContract(request);
      console.log('migrate', data);
      // const approveWaitTx = await waitForTransaction({
      //   hash: data
      // });
      // console.log('approve wait TX', approveWaitTx)
      setLoading(false);
      setStep('complete');
    } catch (e) {
      console.log('migrate failure');
      console.log(e);
    }
  };

  const addPintv2ToWallet = async () => {
    console.log('adding Pintv2 to Wallet');
  };

  return {
    step,
    setStep,
    loading,
    modal,
    setModal,
    setLoading,
    error,
    isSuccess,
    addPintv2ToWallet,
    reset,
    migrate,
    approveV1,
  };
};

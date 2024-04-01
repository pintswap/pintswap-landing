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
    | 'allowance'
    | 'reject'
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
    address,
    token: CONTRACT_ADDRESSES[NETWORK].pintv1,
    chainId: CHAIN_ID,
    watch: true,
  });
  console.log('address:', address, 'signer:', signer);
  console.log(
    'chainID:',
    CHAIN_ID,
    'NETWORK:',
    NETWORK,
    'ACTIVE_CHAIN_ID:',
    ACTIVE_CHAIN_ID,
    'regularchain:',
    chain
  );
  console.log('v1Balance:', v1Balance?.value, 'bigInt', BigInt(0));

  const reset = (clearSuccess: boolean) => {
    clearSuccess && setIsSuccess(false);
    modal && setModal(false);
    step && setStep('approve');
    error && setError('');
    loading && setLoading(false);
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
        console.log('attempting approval');
        const result = await writeContract({
          address: CONTRACT_ADDRESSES[NETWORK].pintv1,
          abi: PINT_ABI,
          functionName: 'approve',
          args: [CONTRACT_ADDRESSES[NETWORK].pintv2, v1Balance?.value],
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
    setLoading(true);
    if (v1Balance?.value && v1Balance?.value !== BigInt(0)) {
      try {
        const { request } = await prepareWriteContract({
          account: address,
          address: CONTRACT_ADDRESSES[NETWORK].pintv2,
          abi: PINT2_ABI,
          functionName: 'migrate',
        });
        console.log('Prepare Migration:', request);
        const writeRes = await writeContract(request);
        await waitForTransaction({
          hash: writeRes.hash,
        });
        setStep('complete');
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
          setStep('reject');
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
    reset,
    migrate,
    approveV1,
  };
};

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
    address,
    token: CONTRACT_ADDRESSES[NETWORK].pintv1,
    chainId: CHAIN_ID,
    watch: true,
  });

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
    // const balance = await getBalance();
    if (v1Balance?.value && v1Balance?.value !== BigInt(0)) {
      setStep('approve');
      try {
        setLoading(true);
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
      } catch (e) {
        console.log('user Rejected approval');
        reset(false);
        console.log(e);
        setLoading(false);
      }
    }
    if (v1Balance?.value && v1Balance?.value === BigInt(0)) {
      setStep('error');
      setLoading(false);
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
      console.log('Prepare Migration:', request);
      const writeRes = await writeContract(request);
      await waitForTransaction({
        hash: writeRes.hash,
      });
      setStep('complete');
      setLoading(false);
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

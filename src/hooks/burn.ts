import { useState } from 'react';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import {
  fetchTransaction,
  prepareWriteContract,
  fetchBalance,
} from '@wagmi/core';
import { PINT2_ABI, PINT_ABI } from '../utils';

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

  const pintv1 = '0x0401CFe25e3A1E43EA706124e2d0a8557a6538dd';
  const pintv2 = '0x436382754092aDD64b69417703d02F97b89a1be6';

  const reset = (clearSuccess: boolean) => {
    clearSuccess && setIsSuccess(false);
    modal && setModal(false);
    step && setStep('approve');
    error && setError('');
    loading && setLoading(false);
  };

  const getBalance = async () => {
    try {
      if (address && chain) {
        setStep('fetching');
        setModal(true);
        const balance = await fetchBalance({
          address,
          token: '0x0401CFe25e3A1E43EA706124e2d0a8557a6538dd',
          chainId: chain.id,
        });
        console.log('Fetch Balance::', balance);
        // return (balance ? balance.value : BigInt(1000000))
        if (balance.value === BigInt(0)) {
          setStep('error');
          setLoading(false);
          return;
        }
        return balance.value;
      }
      console.log('Address is not provided.');
      return null;
    } catch (e) {
      setStep('fail');
      setLoading(false);
      console.error('Failed to fetch balance:', e);
    }
  };

  const approveV1 = async () => {
    if (!signer) {
      console.log('no signer');
      return;
    }
    const balance = await getBalance();
    if (balance && balance !== BigInt(0)) {
      setStep('approving');
      try {
        setLoading(true);
        const result = await signer.writeContract({
          address: pintv1,
          abi: PINT_ABI,
          functionName: 'approve',
          args: [pintv2, balance],
        });
        console.log('approval return', result);
        setStep('burn');
        if (result) {
          try {
            const transaction = await fetchTransaction({
              hash: result,
            });
            console.log('transaction result', transaction);
            setStep('burn');
            setLoading(false);
          } catch (e) {
            console.log('FetchTransaction cant find transaction');
          }
        }
      } catch (e) {
        console.log('user Rejected approval');
        reset(false);
        console.log(e);
      }
    }
    if (balance && balance === BigInt(0)) {
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
        address: pintv2,
        abi: PINT2_ABI,
        functionName: 'migrate',
      });
      console.log('prepare migrate?:', request);
      const data = await signer.writeContract(request);
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
    getBalance,
    reset,
    migrate,
    approveV1,
  };
};

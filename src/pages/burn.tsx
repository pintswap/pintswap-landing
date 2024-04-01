import { Base } from '../ui/base';
import { Section } from '../ui/layouts';
import { Button, Modal, RenderLottie } from '../ui/components';
import { useBurn } from '../hooks/burn';
import {
  CONTRACT_ADDRESSES,
  EXPLORER_URLS,
  NETWORK,
  REDEMPTION_ENABLED,
  truncate,
} from '../utils';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { useRef } from 'react';

export default function Burn() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const {
    step,
    setStep,
    loading,
    setLoading,
    modal,
    CHAIN_ID,
    error,
    migrate,
    approveV1,
    reset,
  } = useBurn();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const { data: v1Balance } = useBalance({
    address,
    token: CONTRACT_ADDRESSES[NETWORK].pintv1,
    chainId: CHAIN_ID,
    watch: true,
  });

  const renderBtnText = () => {
    if (!REDEMPTION_ENABLED) return 'Coming soon';
    if (!address) return 'Connect Wallet';
    if (address && step === 'approve') return 'Approve';
    if (address && step === 'allowance') return 'Approve';
    if (address && step === 'error') return 'Error';
    if (address && step === 'complete') return 'Complete';
    if (address && step === 'approving') return 'Approving...';
    if (address && step === 'burn') return 'Burning...';
    if (address && step === 'complete') return 'PINT Burned';
    if (address && step === 'allowed') return 'Burn PINT';
    // if(address && step === 'error') return 'No Pint' // TODO: have a different message if not PINTV1
    if (loading) return 'Loading...';
    if (v1Balance?.value === BigInt(0)) return 'No PINT to Burn';
    return 'Approve';
  };

  const handleBtnClick = async () => {
    if (!address && openConnectModal) {
      setStep('approve');
      return openConnectModal();
    }
    if (chain?.unsupported && openChainModal) return openChainModal();
    if (address) {
      if (step === 'allowed') {
        await migrate();
      } else {
        setLoading(true);
        await approveV1();
        await migrate();
      }
    }
  };

  const renderModalText: () => string = () => {
    switch (step) {
      case 'start':
        return 'Initiating burn';
      case 'allowance':
        return 'Migrate failed: must approve max tokens';
      case 'reject':
        return 'User rejected allowance';
      case 'approve':
        return 'Approve transaction in Wallet';

      case 'approving':
        return 'Approving transaction';
      case 'burn':
        return 'Burning...';
      case 'complete':
        return 'Successfully burned old PINT for PWAP';
      case 'error':
        return 'No Pint to burn';
      default:
        return 'Submitting transaction...';
    }
  };

  return (
    <>
      <Base>
        <div className="absolute left-0 top-0 w-full h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />
        <Section padding="y" wrapperClass={`!z-[99] mt-5 2xl:mt-6`}>
          <h1 className="font-semibold flex items-center gap-0.5">
            <span className="text-2xl md:text-3xl">$</span>
            <span className="text-rebrand-indigo text-5xl">PINT</span>
            <span className="text-5xl ml-3">Relaunch</span>
          </h1>
        </Section>
        <Section padding="y">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">
            <div className="md:col-span-2">
              <p className="text-lg">
                Welcome to the PINT Relaunch! Burn old PINT tokens for our new
                PWAP token. With a 10 to 1 ratio you will recive 1 new token for
                ten of your old tokens. It is important to note that the value
                of your new tokens will be equivelant to the value of your old
                ones.
              </p>
              <p className="mt-4">
                NOTE: You must approve all PINT tokens to be burned for
                migration to complete
              </p>
              <br />
              <p className="text-lg font-medium mb-2">
                Steps to Burn and Mint:
              </p>
              <ol className="pl-6 sm:pl-8 list-decimal">
                <li>Connect your wallet that holds PINT</li>
                <li>Initiate Approval</li>
                <li>Approve max amount of tokens held</li>
                <li>
                  Upon redemption, 10 of your old Tokens will be{' '}
                  <span className="font-semibold">burned</span> for{' '}
                  <span className="font-semibold">1 token</span>
                </li>
              </ol>
              <br />
              <div className="flex items-center">
                <Button
                  disabled={v1Balance?.value === BigInt(0)}
                  size="lg"
                  onClick={handleBtnClick}
                  loading={loading}
                  className={`${address ? '!rounded-r-none' : ''}`}
                >
                  {renderBtnText()}
                </Button>
                <Transition
                  show={address !== undefined}
                  enter="transition-opacity ease-in-out duration-500 delay-50"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-in-out duration-400"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="flex flex-col px-4 py-0.5 rounded-r-lg border-l-0 border-2 border-primary-regular bg-neutral-900 cursor-default"
                >
                  <span className="text-neutral-400 text-xs leading-snug">
                    Wallet
                  </span>
                  <span className="leading-none font-medium">
                    {truncate(address)}
                  </span>
                </Transition>
              </div>
              <Transition
                show={!!error}
                enter="transition-opacity ease-in-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute pl-1 pt-1"
              >
                <p className="font-medium text-red-400 text-sm !leading-tight">
                  {/* {error} */}
                </p>
              </Transition>
            </div>
          </div>
        </Section>
      </Base>

      <Modal
        state={modal}
        closeFx={() => reset(false)}
        title="Transaction Details"
        secondary={<div></div>}
      >
        <div className="flex flex-col items-center justify-center">
          {loading ? (
            <>
              <RenderLottie animation="loading" width={200} height={200} />
              <span className="font-medium mt-2 text-lg">
                {renderModalText()}
              </span>
            </>
          ) : step === 'complete' ? (
            <>
              <RenderLottie
                animation={`success`}
                height={140}
                width={140}
                loop={false}
              />
              <span className="font-medium mt-6 text-lg">
                Successfully burned old PINT for PWAP
              </span>
              <Link
                target="_blank"
                className=""
                href={`${EXPLORER_URLS[NETWORK]}/token/${CONTRACT_ADDRESSES[NETWORK].pintv2}`}
              >
                PINT Contract:{' '}
                <span className="underline transition duration-150 hover:text-neutral-200">
                  {truncate(CONTRACT_ADDRESSES[NETWORK].pintv2)}
                </span>
              </Link>
            </>
          ) : (
            <>
              <RenderLottie
                animation={`hashing`}
                height={140}
                width={140}
                loop={false}
              />
              <span className="font-medium mt-6 text-lg">
                {renderModalText()}
              </span>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

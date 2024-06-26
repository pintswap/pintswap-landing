import { Base } from '../ui/base';
import { Section } from '../ui/layouts';
import { Button, Modal, RenderLottie, DataDisplay } from '../ui/components';
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
    isSuccess,
    error,
    approved,
    migrate,
    approveV1,
    reset,
    addPwapToWallet,
  } = useBurn();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const { data: v1Balance } = useBalance({
    address,
    token: CONTRACT_ADDRESSES[NETWORK].pint,
    chainId: CHAIN_ID,
    watch: true,
  });

  const renderBtnText = () => {
    if (!REDEMPTION_ENABLED) return 'Coming soon';
    if (!address) return 'Connect Wallet';
    if (address && step === 'approve' && !approved) return 'Approve';
    if (address && v1Balance?.value === BigInt(0)) return 'No Pint';
    if (address && step === 'allowance') return 'Approve';
    if (address && step === 'error') return 'Error';
    if (address && step === 'complete') return 'Complete';
    if (address && step === 'approving') return 'Approving...';
    if (address && step === 'burn') return 'Burning...';
    if (address && step === 'complete') return 'PINT Burned';
    if (address && (step === 'allowed' || approved)) return 'Burn PINT';
    if (loading) return 'Loading...';
    if (v1Balance?.value === BigInt(0)) return 'No PINT to Burn';
    return 'Burn Pint';
  };

  const handleBtnClick = async () => {
    if (!address && openConnectModal) {
      setStep('approve');
      return openConnectModal();
    }
    if (chain?.unsupported && openChainModal) return openChainModal();
    if (address) {
      if (approved) {
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
      case 'reject burn':
        return 'User rejected burn';
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
          <h3 className="text-2xl md:text-3xl font-medium">
            Brand new drip, same great taste.
          </h3>
        </Section>
        <Section padding="y">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16 !font-walsheim">
            <div className="md:col-span-2">
              <p className="text-lg">
                Welcome to the PINT Relaunch! Burn old PINT tokens for our new
                PWAP token. With a 10 to 1 ratio you will recive 1 new token for
                10 of your old tokens. It is important to note that the value of
                your new tokens will be equivalent to the value of your old
                ones.
              </p>
              <p className="mt-4">
                <em>
                  NOTE: You must approve all PINT tokens to be burned for
                  migration to succesfully complete
                </em>
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
            <div className="md:col-span-1">
              <h4 className="text-3xl mb-6 sm:mb-8">Token Stats</h4>
              <div className="text-lg grid grid-cols-1 gap-x-2 gap-y-6 px-4">
                <DataDisplay
                  text={'Circulating Supply'}
                  value={'15800000'}
                  type="fancy"
                />
                <DataDisplay
                  text={'Total Supply'}
                  value={'100000000'}
                  type="fancy"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-8">
                <Link
                  href="https://app.pintswap.com/#/markets/pwap-usdc"
                  target="_blank"
                >
                  <Button className="!w-fit">Buy on PintSwap</Button>
                </Link>
                <Link
                  href={`https://app.uniswap.org/swap?chain=mainnet&inputCurrency=ETH&outputCurrency=${CONTRACT_ADDRESSES[NETWORK].pwap}`}
                  target="_blank"
                >
                  <Button type="outline" className="!w-fit">
                    Buy on Uniswap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </Base>

      <Modal
        state={modal}
        closeFx={() => reset(false)}
        title="Transaction Details"
        secondary={
          isSuccess ? (
            <div ref={buttonRef} onClick={addPwapToWallet}>
              <Button className="!w-fit" type="outline">
                Add to wallet
              </Button>
            </div>
          ) : (
            <div></div>
          )
        }
      >
        <div className="flex flex-col items-center justify-center">
          {loading ? (
            <>
              <RenderLottie animation="loading" width={200} height={200} />
              <span className="font-medium mt-2 text-lg">
                {renderModalText()}
              </span>
            </>
          ) : isSuccess ? (
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
                href={`${EXPLORER_URLS[NETWORK]}/token/${CONTRACT_ADDRESSES[NETWORK].pwap}`}
              >
                PINT Contract:{' '}
                <span className="underline transition duration-150 hover:text-neutral-200">
                  {truncate(CONTRACT_ADDRESSES[NETWORK].pwap)}
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

import { Base } from '../ui/base';
import { Section } from '../ui/layouts';
import { Button, DataDisplay, Modal, RenderLottie } from '../ui/components';
import { useNftRedeem, usePrices } from '../hooks';
import {
  CONTRACT_ADDRESSES,
  EXPLORER_URLS,
  NETWORK,
  REDEMPTION_ENABLED,
  truncate,
} from '../utils';
import { useAccount, useNetwork } from 'wagmi';
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { useRef } from 'react';

const Token = () => {
  const { data } = usePrices([CONTRACT_ADDRESSES.mainnet.pint]);
  // if (DEV) console.log('PINT Data:', data);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const {
    redeem,
    isLoading,
    trisRedeemTxHash,
    wockRedeemTxHash,
    error,
    isIdsLoading,
    holdsNfts,
    isSuccess,
    reset,
    step,
    addPintToWallet,
  } = useNftRedeem();

  const renderBtnText = () => {
    if (!REDEMPTION_ENABLED) return 'Coming soon';
    if (!address) return 'Connect Wallet';
    if (isIdsLoading) return 'Connecting';
    if (isSuccess) return 'Redeemed';
    if (chain?.unsupported) return 'Switch Networks';
    if (!holdsNfts()) return 'No NFTs to Redeem';
    return 'Redeem';
  };

  const handleBtnClick = () => {
    if (!address && openConnectModal) return openConnectModal();
    if (chain?.unsupported && openChainModal) return openChainModal();
    if (!holdsNfts())
      return console.error('Wallet does not hold any PintSwap NFTs');
    return redeem();
  };

  const determineDisabled = () => {
    if (!REDEMPTION_ENABLED) return true;
    if (chain?.unsupported) return false;
    if ((!holdsNfts() && address !== undefined) || isLoading) return true;
    return false;
  };

  const renderModalText = () => {
    switch (step) {
      case 'start':
        return 'Initiating redemption...';
      case 'signature':
        return 'Waiting for signature...';
      case 'wock:approve':
        return 'Approving WOCK spend...';
      case 'wock:redeem':
        return 'Redeeming WOCK...';
      case 'tris:approve':
        return 'Approving TRIS spend...';
      case 'tris:redeem':
        return 'Redeeming TRIS...';
      case 'complete':
        return 'Successfully redeemed PINT!';
      default:
        'Submitting transaction...';
    }
  };
  return (
    <>
      <Base>
        <div className="absolute left-0 top-0 w-full h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25 !font-walsheim" />
        <Section padding="y" wrapperClass={`!z-[99] mt-5 2xl:mt-6`}>
          <h1 className="font-semibold flex items-center gap-0.5">
            <span className="text-2xl md:text-3xl">$</span>
            <span className="text-accent-light text-5xl">PINT</span>
            <span className="text-5xl ml-3">Launch</span>
          </h1>
          <h3 className="text-2xl md:text-3xl font-medium">
            For degens. By degens.
          </h3>
        </Section>
        <Section padding="y">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">
            <div className="md:col-span-2">
              <h4 className="text-3xl mb-6 sm:mb-8">Redeem your NFT</h4>
              <p className="text-lg">
                TRIS NFTs are redeemable for $PINT tokens enabling holders to
                benefit from the protocol. This includes earning $PINT from
                protocol trading fees, upside from{' '}
                <Link
                  target="_blank"
                  className="underline"
                  href="https://www.techopedia.com/definition/maximal-extractable-value-mev#:~:text=Maximal%20extractable%20value%20(MEV)%20is,of%20transactions%20in%20a%20block."
                >
                  MEV
                </Link>{' '}
                captured by the{' '}
                <Link
                  target="_blank"
                  href="https://docs.pintswap.exchange/contracts"
                  className="underline"
                >
                  OPPS contract
                </Link>
                , tax revenue from token trading, governing the DAO, and market
                making profits.
              </p>
              <br />
              <p className="text-lg font-medium mb-2">Steps to redeem:</p>
              <ol className="pl-6 sm:pl-8 list-decimal">
                <li>Connect the wallet that holds TRIS</li>
                <li>Click &quot;Redeem&quot; below</li>
                <li>Sit back, relax, and take a sip</li>
                <li>
                  Upon redemption, your TRIS will be{' '}
                  <span className="font-semibold">burned</span> for{' '}
                  <span className="font-semibold">100,000 tokens</span>
                </li>
              </ol>
              <br />
              <div className="flex items-center">
                <Button
                  disabled={determineDisabled()}
                  size="lg"
                  onClick={handleBtnClick}
                  className={`${
                    address && !isIdsLoading ? '!rounded-r-none' : ''
                  }`}
                  loading={isIdsLoading || isLoading}
                >
                  {renderBtnText()}
                </Button>
                <Transition
                  show={address !== undefined && !isIdsLoading}
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
                  {error}
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
                  href="https://app.pintswap.exchange/#/markets/pwap-usdc"
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
        state={isLoading || !!trisRedeemTxHash || !!wockRedeemTxHash}
        closeFx={() => reset(false)}
        title="Transaction Details"
        secondary={
          isSuccess ? (
            <div ref={buttonRef} onClick={addPintToWallet}>
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
          {isLoading ? (
            <>
              <RenderLottie animation="loading" width={200} height={200} />
              <span className="font-medium mt-2 text-lg">
                {renderModalText()}
              </span>
            </>
          ) : (
            <>
              <RenderLottie
                animation="success"
                height={140}
                width={140}
                loop={false}
              />
              <span className="font-medium mt-6 text-lg">
                Redeemed your PINT
              </span>
              <Link
                className=""
                href={`${EXPLORER_URLS[NETWORK]}/token/${CONTRACT_ADDRESSES[NETWORK].pint}`}
              >
                PINT Contract:{' '}
                <span className="underline transition duration-150 hover:text-neutral-200">
                  {truncate(CONTRACT_ADDRESSES[NETWORK].pint)}
                </span>
              </Link>
            </>
          )}
          <Transition
            show={!!wockRedeemTxHash}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Link
              target="_blank"
              href={`${EXPLORER_URLS.mainnet}/tx/${wockRedeemTxHash}`}
            >
              WOCK Transaction:{' '}
              <span className="underline transition duration-150 hover:text-neutral-200">
                {truncate(wockRedeemTxHash)}
              </span>
            </Link>
          </Transition>
          <Transition
            show={!!trisRedeemTxHash}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Link
              target="_blank"
              href={`${EXPLORER_URLS.mainnet}/tx/${trisRedeemTxHash}`}
            >
              TRIS Transaction:{' '}
              <span className="underline transition duration-150 hover:text-neutral-200">
                {truncate(trisRedeemTxHash)}
              </span>
            </Link>
          </Transition>
        </div>
      </Modal>
    </>
  );
};

export default Token;

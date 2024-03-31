import Image from 'next/image';
import Link from 'next/link';
import { Base } from '../ui/base';
import {
  Button,
  DataDisplay,
  ParallaxMouseChild,
  ParallaxScrollWrapper,
  RenderLottie,
} from '../ui/components';
import { Section, Split } from '../ui/layouts';
import { MouseParallaxContainer } from 'react-parallax-mouse';
import { Tab } from '@headlessui/react';
import {
  MdChevronRight,
  MdOutlineWater,
  MdOutlineLocalOffer,
  MdSupervisorAccount,
  MdAvTimer,
} from 'react-icons/md';
import { useSubgraphStore } from '../stores';
import { useWindowSize } from '../hooks';
import { SOCIAL_LINKS } from '../utils';

const ParallaxItems: any = [
  {
    img: '/assets/img/bubble-1-min.png',
    top: '494px',
    left: '98px',
    width: 68,
    height: 80,
    factor: 0.6,
    blur: 'blur-[3px]',
    speed: 'floating-fast',
  },
  {
    img: '/assets/img/bubble-2-min.png',
    top: '147px',
    left: '-55px',
    width: 160,
    height: 181,
    factor: 0.3,
    inverted: true,
    speed: 'floating-fast',
  },
  {
    img: '/assets/img/bubble-3-min.png',
    top: '98px',
    right: '-10px',
    width: 230,
    height: 233,
    factor: 0.2,
    className: 'hidden md:block',
    speed: 'floating-slow',
  },
  {
    img: '/assets/img/bubble-4-min.png',
    top: '306px',
    left: '206px',
    width: 136,
    height: 114,
    factor: 0.1,
    blur: 'blur-[1.5px]',
  },
  {
    img: '/assets/img/bubble-1-min.png',
    top: '374px',
    right: '256px',
    width: 63,
    height: 73,
    factor: 0.4,
    inverted: true,
    blur: 'blur-[1.5px]',
    speed: 'floating-fast',
  },
];

const TabItems = [
  {
    title: 'Zero Taxes',
    icon: MdOutlineLocalOffer,
    text: "Trade with zero buy and sell taxes via PintSwap. Trading shouldn't involve any hidden fees, so we created a way to avoid them.",
    animation: 'wallet',
  },
  {
    title: 'Zero Slippage',
    icon: MdOutlineWater,
    text: 'Trade with zero slippage, like how it should be. Swap large sums with confidence, without the risk of any surprising losses.',
    animation: 'globalTransfer',
  },
  {
    title: 'Peer-to-Peer',
    icon: MdSupervisorAccount,
    text: 'Engage in decentralized and permissionless trading directly with your peers using LibP2P, making OTC trades easy.',
    animation: 'blockchainGlobal',
  },
  {
    title: 'Limit Orders',
    icon: MdAvTimer,
    text: 'Take control of your trades with the capability to place limit-orders for a CEX-like trading experience.',
    animation: 'hashing',
  },
];

const Partners = ['Pepe Analytics'];

const Features = [
  {
    text: 'Bloomberg Business',
    img: '/assets/features/bloomberg.svg',
    link: 'https://www.bloomberg.com/press-releases/2023-10-02/pintswap-telegram-bots-unveiled-the-days-of-taxes-and-slippage-are-over',
  },
  {
    text: 'Yahoo Finance',
    img: '/assets/features/yahoo-finance.svg',
    link: 'https://finance.yahoo.com/news/pintswap-telegram-bots-unveiled-days-221000047.html',
  },
  {
    text: 'AP News',
    img: '/assets/features/associated-press.svg',
    link: 'https://apnews.com/press-release/accesswire/pintswap-telegram-bots-unveiled-the-days-of-taxes-and-slippage-are-over-d29151c0968d292c8a0c380a5d6b49ea',
  },
  {
    text: 'Tech Bullion',
    img: '/assets/features/tech-bullion.png',
    link: 'https://techbullion.com/pintswap-revolution-say-goodbye-to-taxes-and-slippage-with-pintswaps-telegram-bot/',
  },
];

const Index = () => {
  const { width, breakpoints } = useWindowSize();
  const { tokenStats, loading } = useSubgraphStore();
  const isLoading = tokenStats?.all?.transactions === 0 || loading;
  return (
    <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
      {ParallaxItems.map((x: any, i: number) => (
        <ParallaxMouseChild key={`parallax-${i}`} {...x} />
      ))}

      <Base>
        <div className="absolute left-0 top-0 w-full h-[50vh] bg-gradient-to-t from-black to-neutral-800 opacity-25" />

        <Section id="home" padding="y" wrapperClass={`!z-[99]`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between max-w-5xl mx-auto relative">
            {/* <Droplets type={"fill"}></Droplets> */}
            <div className="flex flex-col gap-4 md:gap-6 ">
              <div className="flex flex-col gap-2 relative z-100">
                <h1 className="leading-tight">
                  <span className="text-4xl md:text-4xl font-medium">
                    P2P Crypto Trading
                  </span>
                  <br />
                  <span className="text-indigo-600 text-2xl md:text-3xl font-semibold">
                    Zero Slippage. <br className="sm:hidden" /> Zero Taxes.
                  </span>
                  {/* <p className="text-primary-light">Primary Light</p>
                  <p className="text-primary-dark">Primary Dark</p>
                  <p className="text-primary-regular">Primary Regular</p>
                  <p className="text-primary-default">Primary Default</p>
                  <p className="text-secondary-black bg-white">Secondary Black</p>
                  <p className="text-secondary-dark">Secondary dark</p>
                  <p className="text-secondary-light">Secondary Light</p>
                  <p className="text-secondary-regular">Secondary Regular</p>
                  <p className="text-accent-light">Accent light</p>
                  <p className="text-accent-regular">Accent regular</p>
                  <p className="text-accent-default ">Accent default</p>
                  <p className='text-indigo-500'>New Regular</p> */}
                </h1>
                <p className="sm:text-lg ">
                  Trade{' '}
                  <span className="font-semibold text-rebrand-indigo">
                    low-liquidity
                  </span>{' '}
                  tokens without all the{' '}
                  <span className="font-extrabold text-rebrand-indigo">BS</span>
                  .<br></br> With our Telegram bot and web app, enter and exit
                  <br className="hidden md:block" />
                  lowcaps with{' '}
                  <span className="font-semibold text-rebrand-indigo">
                    ease
                  </span>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 px-2 md:px-0 relative z-100">
                <Link
                  href="https://app.pintswap.exchange"
                  target="_blank"
                  className="w-full sm:w-fit"
                >
                  <Button size="lg" className="w-full sm:w-fit">
                    Enter App
                  </Button>
                </Link>
                <Link
                  href="https://t.me/pintswap_bot"
                  target="_blank"
                  className="w-full sm:w-fit"
                >
                  <Button type="outline" size="lg" className="w-full sm:w-fit">
                    Launch TG Bot
                  </Button>
                </Link>
              </div>
              <ParallaxScrollWrapper
                animation="opacity"
                reverse
                startValue={2}
                endValue={0.2}
                className="flex flex-col md:flex-row gap-10 mt-4 md:mt-8"
              >
                <DataDisplay
                  loading={isLoading}
                  usd
                  value={tokenStats?.all?.amountUsd || 0}
                  text="Total Volume"
                  type="fancy"
                />
                <DataDisplay
                  loading={isLoading}
                  value={tokenStats?.all?.transactions || 0}
                  text="Transactions"
                  type="fancy"
                />
                {/* TODO: connect */}
                <DataDisplay
                  loading={isLoading}
                  value={Math.floor(Math.random() * 50)}
                  text="Peers"
                  type="fancy"
                />
              </ParallaxScrollWrapper>
            </div>
            <div className="hidden md:flex md:w-1/2 md:h-full">
              <Image
                src="/assets/img/swap-module-min.png"
                alt="Swap module preview on PintSwap app"
                width={370}
                height={360}
                className="rounded-lg  shadow-[-3px_-3px_12px_2px_rgba(0,0,0,0.5),_3px_3px_12px_2px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </Section>

        {/* <Section wrapperClass="mt-10 sm:mt-12">
          <ParallaxScrollWrapper
            animation="opacity"
            reverse
            startValue={2}
            endValue={0.2}
            className="flex flex-col md:grid md:grid-cols-3 gap-4"
          >
            <DataDisplay
              loading={isLoading}
              usd
              value={tokenStats?.all?.amountUsd || 0}
              text="Total Volume"
              type="fancy"
            />
            <DataDisplay
              loading={isLoading}
              value={tokenStats?.all?.transactions || 0}
              text="Transactions"
              type="fancy"
            />
            <DataDisplay
              loading={isLoading}
              value={Math.floor(Math.random() * 50)}
              text="Peers"
              type="fancy"
            />
          </ParallaxScrollWrapper>
        </Section> */}

        <Section
          padding="y"
          id="features"
          wrapperClass="mt-16 sm:mt-24 xl:mt-32 2xl:mt-36"
        >
          <ParallaxScrollWrapper
            animation="opacity"
            reverse
            startValue={2}
            endValue={0.2}
          >
            <ParallaxScrollWrapper className="text-center mb-10 sm:mb-12 2xl:mb-20">
              <h2 className="text-3xl md:text-4xl font-medium">
                Trading Made <span className="text-rebrand-indigo">Easy</span>
              </h2>
              <h4 className="">
                We simplify the technical complexities, allowing you to focus on
                trading.
              </h4>
            </ParallaxScrollWrapper>
            <div className="bg-gradient-to-b from-black to-neutral-800 rounded-md">
              <Tab.Group>
                <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-6 px-4 pb-8">
                  <Tab.List className="grid grid-cols-2 lg:flex lg:flex-col lg:px-4 gap-2 lg:gap-4 lg:mt-10">
                    {TabItems.map((x, i) => (
                      <Tab
                        key={`how-it-works-tab-${i}`}
                        className={'ring-0 focus:ring-0 focus:outline-none'}
                      >
                        {({ selected }) => (
                          <div
                            className={`lg:text-left sm:text-lg px-4 py-2 lg:py-3 rounded-md border border-1 border-neutral-500 transition duration-150 font-medium flex items-center justify-center lg:justify-between text-center ${
                              selected
                                ? 'bg-neutral-800 hover:bg-neutral-800 !border-neutral-300'
                                : 'hover:bg-neutral-900'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <x.icon
                                size={20}
                                color={selected ? '#4F46E5' : '#6052FF'}
                                className="hidden md:block"
                              />
                              <span>{x.title}</span>
                            </div>
                            <MdChevronRight
                              size={24}
                              className="hidden md:block"
                            />
                          </div>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="px-1 lg:px-4 mt-2">
                    {TabItems.map((x, i) => (
                      <Tab.Panel key={`how-it-works-panel-${i}`}>
                        <h3 className="text-3xl font-medium">{x.title}</h3>
                        <p className="mb-2 sm:mb-0">{x.text}</p>
                        <RenderLottie
                          animation={x.animation as any}
                          height={width < breakpoints.sm ? 150 : 250}
                          width={width < breakpoints.sm ? 300 : 500}
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </ParallaxScrollWrapper>
        </Section>

        <Section
          id="featured-in"
          padding="none"
          type="wide"
          background="bg-neutral-800"
          wrapperClass="mt-16 sm:mt-24 xl:mt-32 2xl:mt-36"
        >
          <ParallaxScrollWrapper
            animation="opacity"
            reverse
            startValue={2}
            endValue={0.2}
          >
            <div className="p-4">
              <div className="text-center mb-2">
                <h2 className="text-3xl md:text-4xl font-medium">
                  Featured In
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                {Features.map((x, i) => (
                  <Link key={`featured-in-${i}`} target="_blank" href={x.link}>
                    <Image
                      src={`${x.img}`}
                      alt={`PintSwap featured in ${x.text}`}
                      width={i === 1 ? 180 : 240}
                      height={60}
                      className="rounded-xl px-4 py-2"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </ParallaxScrollWrapper>
        </Section>

        <Section
          id="how-it-works"
          padding="y"
          wrapperClass="mt-16 sm:mt-24 xl:mt-32 2xl:mt-36"
        >
          <ParallaxScrollWrapper className="text-center mb-10 sm:mb-12 2xl:mb-20">
            <h2 className="text-3xl md:text-4xl font-medium">
              <span className="text-rebrand-indigo">How</span> It Works
            </h2>
            <h4 className="">
              Think of us like a combination of Uniswap and Unibot, but better.
            </h4>
          </ParallaxScrollWrapper>
          <div className="flex flex-col gap-20 md:gap-12 lg:gap-24 2xl:gap-32">
            <ParallaxScrollWrapper
              animation="opacity"
              reverse
              startValue={2}
              endValue={0.2}
            >
              <Split>
                <ParallaxScrollWrapper>
                  <RenderLottie animation="blockchainNetwork" />
                </ParallaxScrollWrapper>
                <ParallaxScrollWrapper
                  reverse
                  className="mt-2 md:mt-3 lg:mt-4 flex flex-col gap-3 md:gap-4"
                >
                  <div className="flex flex-col">
                    <span className="text-rebrand-indigo">
                      Public and OTC Features
                    </span>
                    <h3 className="text-3xl font-medium">
                      Peer-to-Peer Technology
                    </h3>
                  </div>
                  <p>
                    We have an orderbook like other exchanges, without the
                    centralization.
                  </p>
                  <p>
                    Our orderbook is made up of many individual orderbooks
                    empowering users to decide if they want everyone to see
                    their trade or if they just want to create an OTC offer to
                    be shared with someone.
                  </p>
                  <Link
                    href="https://app.pintswap.exchange/#/markets"
                    target="_blank"
                    className="w-fit"
                  >
                    <Button className="w-fit">See Available Trades</Button>
                  </Link>
                </ParallaxScrollWrapper>
              </Split>
            </ParallaxScrollWrapper>
            <ParallaxScrollWrapper
              animation="opacity"
              reverse
              startValue={2}
              endValue={0.2}
            >
              <Split>
                <ParallaxScrollWrapper
                  reverse
                  className="mt-2 md:mt-3 lg:mt-4 flex flex-col gap-3 md:gap-4 order-2 md:order-1"
                >
                  <div className="flex flex-col">
                    <span className="text-rebrand-indigo">
                      Automatic Matching
                    </span>
                    <h3 className="text-3xl font-medium">
                      Seamless Trading Experience
                    </h3>
                  </div>
                  <p>
                    We find the best trade possible, even if it&apos;s not on
                    our orderbook.
                  </p>
                  <p>
                    With our{' '}
                    <Link
                      href="https://github.com/pintswap/pintswap-engine"
                      className="underline"
                    >
                      trading engine
                    </Link>
                    , we&apos;ll quickly match your offer with another user. If
                    that isn&apos;t available, the engine routes trades through
                    exchange aggregator, so users still quickly execute trades
                    at the best price and are not limited to PintSwap&apos;s
                    orderbook.
                  </p>
                  <Link href="https://t.me/pintswap_bot" target="_blank">
                    <Button className="sm:w-fit">Launch Telegram Bot</Button>
                  </Link>
                </ParallaxScrollWrapper>
                <ParallaxScrollWrapper className="order-1 md:order-2">
                  <RenderLottie animation="blockchainWorks" />
                </ParallaxScrollWrapper>
              </Split>
            </ParallaxScrollWrapper>
          </div>
        </Section>

        <Section
          padding="y"
          id="features"
          wrapperClass="mt-16 sm:mt-24 xl:mt-32 2xl:mt-36"
        >
          <ParallaxScrollWrapper
            animation="opacity"
            reverse
            startValue={2}
            endValue={0.2}
          >
            <div className="bg-gradient-to-b to-black from-neutral-900 rounded-md pt-12 pb-4">
              <ParallaxScrollWrapper className="text-center mb-10 sm:mb-12 2xl:mb-20">
                <h2 className="text-3xl md:text-4xl font-medium">
                  Join the{' '}
                  <span className="text-rebrand-indigo">Community</span>
                </h2>
                <h4 className="text-neutral-300">
                  Be a part of the protocol, see new OTC offers, and get updates
                  before the public knows.
                </h4>
              </ParallaxScrollWrapper>
              <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-6 px-4">
                <Link
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  className="w-fit mx-auto"
                >
                  <div className="text-center cursor-pointer">
                    <h3 className="text-3xl font-medium">Telegram</h3>
                    <RenderLottie animation="telegram" cursor="pointer" />
                  </div>
                </Link>

                <Link
                  href={SOCIAL_LINKS.discord}
                  target="_blank"
                  className="w-fit mx-auto"
                >
                  <div className="text-center cursor-pointer">
                    <h3 className="text-3xl font-medium">Discord</h3>
                    <RenderLottie animation="discord" cursor="pointer" />
                  </div>
                </Link>
              </div>
            </div>
          </ParallaxScrollWrapper>
        </Section>
      </Base>
    </MouseParallaxContainer>
  );
};

export default Index;

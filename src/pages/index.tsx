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
        <div className="absolute left-0 top-0 w-screen h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />

        <Section id="home" padding="y" wrapperClass={`!z-[99] mt-10 sm:mt-12`}>
          <div className="flex flex-col md:items-center md:flex-row justify-between">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="leading-tight">
                  <span className="text-2xl md:text-3xl font-medium">
                    P2P Crypto Trading
                  </span>
                  <br />
                  <span className="text-accent-light text-5xl font-semibold">
                    Zero Slippage. <br className="sm:hidden" /> Zero Taxes.
                  </span>
                </h1>
                <p className="sm:text-lg text-neutral-300">
                  Trade <span className="font-semibold">low-liquidity</span>{' '}
                  tokens without all the{' '}
                  <span className="font-semibold">BS</span>. With our Telegram
                  bot
                  <br className="hidden md:block" /> and web app, enter and exit
                  lowcaps with <span className="font-semibold">ease</span>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 px-2 md:px-0">
                <Link
                  href="https://app.pintswap.exchange"
                  target="_blank"
                  className="w-full sm:w-fit"
                >
                  <Button size="lg" className="w-full sm:w-fit">
                    Enter App
                  </Button>
                </Link>
                <Link href="#how-it-works" className="w-full sm:w-fit">
                  <Button type="outline" size="lg" className="w-full sm:w-fit">
                    How it works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex">
              <Image
                src="/assets/img/swap-module-min.png"
                alt="Swap module preview on PintSwap app"
                width={420}
                height={410}
                className="rounded-lg shadow-[-3px_-3px_12px_2px_rgba(0,0,0,0.5),_3px_3px_12px_2px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </Section>

        <Section wrapperClass="mt-10 sm:mt-12">
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
            {/* TODO: connect */}
            <DataDisplay
              loading={isLoading}
              value="8"
              text="Peers"
              type="fancy"
            />
          </ParallaxScrollWrapper>
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
            <ParallaxScrollWrapper className="text-center mb-10 sm:mb-12 2xl:mb-20">
              <h2 className="text-3xl md:text-4xl font-medium">
                Trading Made <span className="text-accent-light">Easy</span>
              </h2>
              <h4 className="text-neutral-300">
                We simplify the technical complexities, allowing you to focus on
                trading.
              </h4>
            </ParallaxScrollWrapper>
            <div className="bg-gradient-to-b from-black to-neutral-900 rounded-3xl">
              <Tab.Group>
                <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-6 px-4 pb-8">
                  <Tab.List className="grid grid-cols-2 lg:flex lg:flex-col lg:px-4 gap-2 lg:gap-4 lg:mt-10">
                    {TabItems.map((x, i) => (
                      <Tab
                        key={`how-it-works-tab-${i}`}
                        className={
                          'ring-0 focus-visible:ring-0 focus:outline-0 focus:ring-0 focus-visible:outline-0'
                        }
                      >
                        {({ selected }) => (
                          <div
                            className={`lg:text-left sm:text-lg px-4 py-2 lg:py-3 rounded-lg border border-1 border-neutral-500 transition duration-150 font-medium flex items-center justify-center lg:justify-between text-center ${
                              selected
                                ? 'bg-neutral-800 hover:bg-neutral-800 !border-neutral-300'
                                : 'hover:bg-neutral-900'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <x.icon
                                size={20}
                                color={selected ? '#ff3869' : '#FF6FA9'}
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
                        <p>{x.text}</p>
                        {/* <Image
                          src="https://placehold.co/500x250"
                          width={600}
                          height={400}
                          alt=""
                          className="p-2 mt-4"
                        /> */}
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

        {/* <Section
          id="partners"
          padding="none"
          type="wide"
          background="bg-neutral-900"
          wrapperClass="mt-16 sm:mt-24 xl:mt-32 2xl:mt-36"
        >
          <div className="p-4">
            <div className="text-center mb-2">
              <h2 className="text-3xl md:text-4xl font-medium">Partners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Partners.map((x, i) => (
                <Image
                  key={`partner-${i}`}
                  src={`/assets/partners/${x
                    .toLowerCase()
                    .replaceAll(' ', '-')}.png`}
                  alt={`PintSwap partner with ${x.toLowerCase()}`}
                  width={600}
                  height={100}
                  className="bg-black rounded-xl px-4 py-2"
                />
              ))}
            </div>
          </div>
        </Section> */}

        <Section
          id="how-it-works"
          padding="y"
          wrapperClass="mt-16 sm:mt-24 xl:mt-32 2xl:mt-36"
        >
          <ParallaxScrollWrapper className="text-center mb-10 sm:mb-12 2xl:mb-20">
            <h2 className="text-3xl md:text-4xl font-medium">
              <span className="text-accent-light">How</span> It Works
            </h2>
            <h4 className="text-neutral-300">
              Think of us like a combination of Uniswap and Unibot, but better.
            </h4>
          </ParallaxScrollWrapper>
          <div className="flex flex-col gap-24 md:gap-12 lg:gap-24 2xl:gap-32">
            <ParallaxScrollWrapper
              animation="opacity"
              reverse
              startValue={2}
              endValue={0.2}
            >
              <Split>
                <ParallaxScrollWrapper>
                  {/* <Image
                    src="https://placehold.co/300x300"
                    alt="Swap module preview on PintSwap app"
                    width={300}
                    height={300}
                  /> */}
                  <RenderLottie animation="blockchainNetwork" />
                </ParallaxScrollWrapper>
                <ParallaxScrollWrapper
                  reverse
                  className="mt-4 flex flex-col gap-3 md:gap-4"
                >
                  <div className="flex flex-col">
                    <span className="text-accent-light">
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
                    <Button className="w-fit" type="outline">
                      See Available Trades
                    </Button>
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
                  className="mt-4 flex flex-col gap-3 md:gap-4 order-2 md:order-1"
                >
                  <div className="flex flex-col">
                    <span className="text-accent-light">
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
                  <Link href="#" target="_blank">
                    <Button className="sm:w-fit">Launch Telegram Bot</Button>
                  </Link>
                </ParallaxScrollWrapper>
                <ParallaxScrollWrapper className="order-1 md:order-2">
                  {/* <Image
                    src="https://placehold.co/300x300"
                    alt="Swap module preview on PintSwap app"
                    width={300}
                    height={400}
                  /> */}
                  <RenderLottie animation="blockchainWorks" />
                </ParallaxScrollWrapper>
              </Split>
            </ParallaxScrollWrapper>
          </div>
        </Section>
      </Base>
    </MouseParallaxContainer>
  );
};

export default Index;

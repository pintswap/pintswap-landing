import Image from 'next/image';
import Link from 'next/link';
import { Base } from '../ui/base';
import { Button, DataDisplay, ParallaxChild } from '../ui/components';
import { Section } from '../ui/layouts';
import { MouseParallaxContainer } from 'react-parallax-mouse';
import { Tab } from '@headlessui/react';
import {
  MdChevronRight,
  MdOutlineWater,
  MdOutlineLocalOffer,
  MdSupervisorAccount,
  MdAvTimer,
} from 'react-icons/md';

const ParallaxItems: any = [
  {
    img: 'bubble-1.png',
    top: '494px',
    left: '98px',
    width: 68,
    height: 80,
    factor: 0.6,
  },
  {
    img: 'bubble-2.png',
    top: '147px',
    left: '-55px',
    width: 160,
    height: 181,
    factor: 0.3,
    inverted: true,
  },
  {
    img: 'bubble-3.png',
    top: '98px',
    right: '-10px',
    width: 230,
    height: 233,
    factor: 0.2,
    className: 'hidden md:block',
  },
  {
    img: 'bubble-4.png',
    top: '306px',
    left: '206px',
    width: 136,
    height: 114,
    factor: 0.1,
  },
  {
    img: 'bubble-5.png',
    top: '374px',
    right: '256px',
    width: 63,
    height: 73,
    factor: 0.4,
    inverted: true,
  },
];

const TabItems = [
  {
    title: 'No Slippage',
    icon: MdOutlineWater,
    text: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'No Taxes',
    icon: MdOutlineLocalOffer,
    text: '2. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    title: 'Peer-to-Peer',
    icon: MdSupervisorAccount,
    text: '3. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Limit Orders',
    icon: MdAvTimer,
    text: '4. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const Partners = ['Pepe Analytics'];

const Index = () => {
  return (
    <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
      {ParallaxItems.map((x: any, i: number) => (
        <ParallaxChild
          key={`parallax-${i}`}
          img={`/assets/img/${x.img}`}
          top={x.top}
          left={x.left}
          right={x.right}
          height={x.height}
          width={x.width}
          factor={x.factor}
          className={x.className}
          inverted={x.inverted}
        />
      ))}

      <Base>
        <div className="absolute left-0 top-0 w-screen h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />

        <Section id="home" padding="y" wrapperClass={`!z-[99] mt-12`}>
          <div className="flex flex-col md:items-center md:flex-row justify-between">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                  <span>P2P Crypto Trading</span>
                  <br />
                  <span className="text-accent-light">
                    No Slippage. No Taxes.
                  </span>
                </h1>
                <p className="text-lg text-neutral-300">
                  Trade <span className="font-semibold">low-liquidity</span>{' '}
                  crypto without all the{' '}
                  <span className="font-semibold">BS</span>. With our Telegram
                  bot
                  <br className="hidden md:block" />
                  and integrated app, enter and exit lowcaps with{' '}
                  <span className="font-semibold">ease</span>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 px-2 md:px-0">
                <Link
                  href="https://pintswap.eth.limo"
                  target="_blank"
                  className="w-full sm:w-fit"
                >
                  <Button type="outline" size="lg" className="w-full sm:w-fit">
                    Get started
                  </Button>
                </Link>
                <Link
                  href="https://docs.pintswap.exchange"
                  target="_blank"
                  className="w-full sm:w-fit"
                >
                  <Button
                    type="outline"
                    size="lg"
                    className="w-full sm:w-fit"
                    borderColor="border-accent"
                  >
                    How it works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex">
              <Image
                src="/assets/img/swap-module.png"
                alt="iPhone preview of PintSwap facing right"
                width={420}
                height={410}
              />
            </div>
          </div>
        </Section>

        <Section wrapperClass="mt-12 ">
          <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
            <DataDisplay value="$1,000,000" text="Daily Volume" type="fancy" />
            <DataDisplay value="1,852,124" text="Transactions" type="fancy" />
            <DataDisplay value="8" text="Peers" type="fancy" />
          </div>
        </Section>

        <Section padding="y" id="how-it-works" wrapperClass="mt-16 xl:mt-32">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-medium">
              Trading Made <span className="text-accent-light">Easy</span>
            </h2>
            <h4 className="text-neutral-300">
              We abstract the complexities of the tech, so you can focus on the
              trading.
            </h4>
          </div>
          <div className="bg-gradient-to-b from-black to-neutral-900 rounded-3xl">
            <Tab.Group>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 pb-8">
                <Tab.List className="grid grid-cols-2 lg:grid-cols-1 lg:px-4 gap-2 lg:gap-4">
                  {TabItems.map((x, i) => (
                    <Tab key={`how-it-works-tab-${i}`}>
                      {({ selected }) => (
                        <div
                          className={`lg:text-left sm:text-lg px-4 py-2 lg:py-3 rounded-lg border border-1 border-neutral-500 transition duration-150 font-medium flex items-center justify-center lg:justify-between ring-0 focus-visible:ring-0 focus:outline-0 focus:ring-0 focus-visible:outline-0 text-center ${
                            selected
                              ? 'bg-neutral-800 hover:bg-neutral-800'
                              : 'hover:bg-neutral-900'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <x.icon
                              size={20}
                              color="#FF6FA9"
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
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </div>
            </Tab.Group>
          </div>
        </Section>

        <Section id="partners" padding="y">
          <div className="bg-neutral-900 rounded-3xl p-4">
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
        </Section>
      </Base>
    </MouseParallaxContainer>
  );
};

export default Index;

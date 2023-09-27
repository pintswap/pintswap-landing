import Image from 'next/image';
import { Base } from '../ui/base';
import { Button, DataDisplay, ParallaxChild } from '../ui/components';
import { Section } from '../ui/layouts';
import { MouseParallaxContainer } from 'react-parallax-mouse';

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

        <Section
          id="home"
          padding="y"
          wrapperClass={`!z-[99] mt-2 md:mt-6 lg:mt-12`}
        >
          <div className="flex flex-col md:items-center md:flex-row justify-between">
            <div className="flex flex-col gap-3 md:gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                  <span>One place for</span>
                  <br />
                  <span className="text-accent-light">
                    all your investment needs
                  </span>
                </h1>
                <p className="text-lg text-neutral-300">
                  In pintswap we make sure you are up to In pintswap we make
                  <br className="hidden md:block" />
                  sure you are up to
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 lg:gap-4">
                <Button type="outline" size="lg" className="w-full md:w-fit">
                  Explore Markets
                </Button>
                <Button
                  type="outline"
                  size="lg"
                  className="w-full md:w-fit"
                  borderColor="border-accent"
                >
                  Explore Peers
                </Button>
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

        <Section padding="y" wrapperClass="mt-2 md:mt-6 lg:mt-12 xl:mt-16">
          <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
            <DataDisplay value="$1,000,000" text="Daily Volume" type="fancy" />
            <DataDisplay value="1,852,124" text="Transactions" type="fancy" />
            <DataDisplay value="8" text="Peers" type="fancy" />
          </div>
        </Section>

        <Section
          padding="y"
          id="how-it-works"
          wrapperClass="mt-2 md:mt-6 lg:mt-12 xl:mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-center">
            Trading Made Easy
          </h2>
          <div></div>
        </Section>
      </Base>
    </MouseParallaxContainer>
  );
};

export default Index;

import Image from 'next/image';
import { Base } from '../ui/base';
import { Button, DataDisplay } from '../ui/components';
import { Section } from '../ui/layouts';
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from 'react-parallax-mouse';

const Index = () => {
  const defaultParallaxStyle: any = { position: 'absolute', zIndex: '99' };
  const defaultFactor = 0.2;
  return (
    <>
      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild
          style={{ ...defaultParallaxStyle, top: '394px', left: '98px' }}
          factorX={defaultFactor}
          factorY={defaultFactor}
        >
          <Image src="/assets/img/bubble-1.png" width={68} height={80} alt="" />
        </MouseParallaxChild>
        <MouseParallaxChild
          style={{ ...defaultParallaxStyle, top: '147px', left: '-55px' }}
          factorX={defaultFactor}
          factorY={defaultFactor}
        >
          <Image
            src="/assets/img/bubble-2.png"
            width={160}
            height={181}
            alt=""
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          style={{ ...defaultParallaxStyle, top: '98px', right: '-10px' }}
          factorX={defaultFactor}
          factorY={defaultFactor}
          className="hidden md:block"
        >
          <Image
            src="/assets/img/bubble-3.png"
            width={230}
            height={233}
            alt=""
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          style={{ ...defaultParallaxStyle, top: '206px', left: '206px' }}
          factorX={defaultFactor}
          factorY={defaultFactor}
        >
          <Image
            src="/assets/img/bubble-4.png"
            width={136}
            height={114}
            alt=""
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          style={{ ...defaultParallaxStyle, top: '374px', right: '256px' }}
          factorX={defaultFactor}
          factorY={defaultFactor}
        >
          <Image src="/assets/img/bubble-5.png" width={63} height={72} alt="" />
        </MouseParallaxChild>
        <Base>
          <div className="absolute left-0 top-0 w-screen h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />

          <Section id="home" padding="y">
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
                  src="/assets/img/iphone-left.png"
                  alt="iPhone preview of PintSwap facing right"
                  width={224}
                  height={394}
                />
                <Image
                  src="/assets/img/iphone-right.png"
                  alt="iPhone preview of PintSwap facing left"
                  width={261}
                  height={391}
                />
              </div>
            </div>
          </Section>
          <Section padding="y">
            <div className="flex flex-col md:grid md:grid-cols-3 md:mt-6 gap-4">
              <DataDisplay
                value="$1,000,000"
                text="Daily Volume"
                type="fancy"
              />
              <DataDisplay value="1,852,124" text="Transactions" type="fancy" />
              <DataDisplay value="8" text="Peers" type="fancy" />
            </div>
          </Section>
        </Base>
      </MouseParallaxContainer>
    </>
  );
};

export default Index;

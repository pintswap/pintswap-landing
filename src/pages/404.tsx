import { MouseParallaxContainer } from 'react-parallax-mouse';
import { Button, ParallaxMouseChild } from '../ui/components';
import { Base } from '../ui/base';
import { Section } from '../ui/layouts';
import Link from 'next/link';

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

export default function Custom404() {
  return (
    <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
      {ParallaxItems.map((x: any, i: number) => (
        <ParallaxMouseChild key={`parallax-${i}`} {...x} />
      ))}
      <Base>
        <div className="absolute left-0 top-0 w-full h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />

        <Section id="404" wrapperClass={`!z-[99]`}>
          <div className="text-center flex flex-col justify-center items-center min-h-[55vh]">
            <h1 className="text-6xl font-bold leading-none">404</h1>
            <p className="mb-5 text-lg">
              Seems you&apos;re in the wrong place.
            </p>
            <Link href="/">
              <Button type="outline">Return Home</Button>
            </Link>
          </div>
        </Section>
      </Base>
    </MouseParallaxContainer>
  );
}

import Link from 'next/link';
import { Button } from '../components/button';
import { AnimatedBrand } from '../components/animated-brand';
import { useWindowSize } from '../../hooks/window-size';
import { SocialList } from '../components/social-list';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { hourDiff } from '../../utils/helpers';

const Hero = () => {
  const { width } = useWindowSize();
  const deadline = new Date('August 1, 2023 17:00:00');

  const determineSize = () => {
    if (width > 1024) return 160;
    if (width > 768) return 120;
    return 100;
  };
  return (
    <>
      <div className="absolute flex flex-col items-center gap-2 text-center top-5 left-5 md:top-12 md:left-12 -rotate-12 lg:bottom-32 lg:top-auto lg:left-32 lg:rotate-12">
        <CountdownCircleTimer
          isPlaying
          duration={hourDiff(deadline, new Date())}
          colors={['#0ea5e9', '#ec4899']}
          colorsTime={[70, 10]}
          isSmoothColorTransition
          size={determineSize()}
          updateInterval={3600}
        >
          {({ remainingTime }) => (
            <div className="flex flex-col items-center">
              <span className="text-md md:text-lg">{remainingTime}</span>
              <span className="text-xs md:text-sm">HOURS</span>
            </div>
          )}
        </CountdownCircleTimer>
        <span className="text-sm md:text-lg">
          Until <span className="text-sky-500">TRIS</span> Mint
        </span>
      </div>

      <SocialList
        direction={'vertical'}
        absolute={width > 769 ? 'right-center' : 'bottom-right'}
      />

      <div className="flex flex-col justify-center items-center w-full h-screen relative -top-8">
        <AnimatedBrand subtitle="INTRODUCING" />
        <div className="w-full px-12 relative -top-8 md:-top-10 lg:-top-28">
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <Link href="https://pintswap.eth.limo" target="_blank">
              <a>
                <Button cta icon="FaPlay">
                  LAUNCH APP
                </Button>
              </a>
            </Link>
            <div className="grid grid-cols-2 items-center justify-center gap-4">
              <Link href="https://docs.pintswap.exchange" target="_blank">
                <a>
                  <Button icon="FaBook" cta>
                    DOCS
                  </Button>
                </a>
              </Link>
              <Link href="/blog">
                <a>
                  <Button icon="FaNewspaper" cta>
                    BLOG
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Hero };

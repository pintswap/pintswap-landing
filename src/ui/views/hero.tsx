import Link from 'next/link';
import { useWindowSize } from '../../hooks';
import {
  CountdownTimer,
  SocialList,
  AnimatedBrand,
  Button,
} from '../components';
import { IS_MINT_ENABLED } from '../../utils';

export const HeroView = () => {
  const { width } = useWindowSize();
  return (
    <>
      <div className="absolute flex flex-col items-center gap-2 text-center top-5 left-5 md:top-12 md:left-12 -rotate-12 lg:bottom-32 lg:top-auto lg:left-32 lg:rotate-12">
        <CountdownTimer />
      </div>

      <SocialList
        direction={'vertical'}
        absolute={width > 769 ? 'right-center' : 'bottom-right'}
      />

      <div className="flex flex-col justify-center items-center w-full h-screen relative -top-8">
        <AnimatedBrand subtitle="INTRODUCING" />
        <div className="w-full px-12 relative -top-8 md:-top-10 lg:-top-28">
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <Link
              href={IS_MINT_ENABLED ? '/mint' : 'https://pintswap.eth.limo'}
              target="_blank"
            >
              <a>
                <Button cta icon={IS_MINT_ENABLED ? 'drink' : 'play'}>
                  {IS_MINT_ENABLED ? 'MINT TRIS' : 'LAUNCH APP'}
                </Button>
              </a>
            </Link>
            <div className="grid grid-cols-2 items-center justify-center gap-4">
              <Link href="https://docs.pintswap.exchange" target="_blank">
                <a>
                  <Button icon="book" cta>
                    DOCS
                  </Button>
                </a>
              </Link>
              <Link href="/blog">
                <a>
                  <Button icon="newspaper" cta>
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

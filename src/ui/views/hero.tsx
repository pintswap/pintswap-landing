import Link from 'next/link';
import { Button } from '../components/button';
import { AnimatedBrand } from '../components/animated-brand';
import { useWindowSize } from '../../hooks/window-size';
import { SocialList } from '../components/social-list';

const Hero = () => {
  const { width } = useWindowSize();
  return (
    <>
      <SocialList
        direction={'vertical'}
        absolute={width > 769 ? 'right-center' : 'bottom-right'}
      />
      <div className="flex flex-col justify-center items-center w-full h-screen relative -top-8">
        <AnimatedBrand
          size={width > 768 ? '420px' : '240px'}
          subtitle="INTRODUCING"
        />
        <div className="w-full px-12 relative -top-8">
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

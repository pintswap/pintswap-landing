import Link from 'next/link';
import { Padding } from '../layouts/padding';
import { Button } from '../components/button';

const Hero = () => {
  return (
    <>
      <div
        className="h-screen flex justify-center items-center md:px-8 lg:px-16 xl:px-24"
        style={{
          backgroundImage: 'url("/assets/pintswap-dripping.gif")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          paddingTop: '4rem',
        }}
      >
        <Padding type="x">
          <div className="flex justify-center relative -top-16 md:-top-28 lg:-top-36">
            <img
              src="/logo/ps-logo.png"
              alt="PintSwap Logo"
              className="w-20 h-20 md:w-24 md:h-24"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 text-center relative top-16 lg:top-24">
            <h2 className="md:text-lg text-gray-400">
              Peer-to-Peer token swaps
              <br className="block" /> using multi-party transaction scripts.
            </h2>

            <ul className="navbar flex flex-col gap-3 items-center font-medium">
              <li>
                <Link href="https://pintswap.eth.limo" target="_blank">
                  <a>
                    <Button>Launch App</Button>
                  </a>
                </Link>
              </li>
              <li className="transition duration-200 hover:text-neutral-300">
                <Link href="https://docs.pintswap.exchange" target="_blank">
                  <a>Docs</a>
                </Link>
              </li>
            </ul>
          </div>
        </Padding>
      </div>

      {/* <div className="absolute left-6 top-36 lg:left-20 lg:top-20 -rotate-[20deg]">
        <AnimatedText text="No Slippage!" size="text-xl" />
      </div>

      <div className="absolute right-6 lg:right-20 bottom-20 -rotate-[20deg]">
        <AnimatedText text="Censorship Resistant!" delay="animate-delay-1000" size="text-md" />
      </div>

      <div className="absolute right-6 lg:right-20 top-48 rotate-[10deg]">
        <AnimatedText text="Completely Decentralized!" delay="animate-delay-500" size="text-lg" />
      </div> */}
    </>
  );
};

export { Hero };

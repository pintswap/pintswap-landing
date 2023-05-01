import { Background } from '../layouts/background';
import { Section } from '../layouts/section';
import Link from 'next/link';

const Hero = () => (
  <Background color="bg-transparent" fullscreen>
    <Section yPadding="py-20" className="z-10 relative">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <img
          src="/logo/ps-logo.png"
          alt="PintSwap Logo"
          height="120"
          width="120"
        />
        <div className="max-w-xl">
          <span className="text-xs text-indigo-500">Introducing PintSwap</span>
          <h1 className="text-2xl lg:text-3xl mb-3 lg:mb-6">
            Peer-to-Peer token swaps using multi-party transaction scripts.
          </h1>
          <h2 className="text-gray-300">
            Built with the OTC use-case in mind, PintSwap is a DEX using LibP2P
            where there is no persistent contract that facilitates trades.
          </h2>
        </div>
        <button className="text-white transition duration-200 border-x-2 px-2 hover:border-pink-500 hover:text-pink-200">
          <Link href="https://docs.pintswap.exchange" target="_blank">
            <a>Learn More</a>
          </Link>
        </button>
      </div>
    </Section>
    {/* <Section className="flex flex-col justify-center items-center gap-4">
      <span className="text-xs text-gray-500">Scroll to Explore</span>
      <div className="scroll" />
    </Section> */}
  </Background>
);

export { Hero };

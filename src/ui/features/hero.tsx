import { Background } from '../layouts/background';
import { Section } from '../layouts/section';
import {} from 'react-icons/md';

const Hero = () => (
  <Background color="bg-[#212121]" fullscreen className="flex flex-col">
    <Section yPadding="py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly justify-items-center content-evenly items-center gap-6">
        <div className="flex flex-col items-center lg:items-start gap-4 max-w-xl order-2 lg:order-1">
          <h3 className="text-center lg:text-left text-xl">
            Peer-to-peer token swaps using multi-party transaction scripts.
          </h3>
          <p className="text-center lg:text-left leading-7">
            Built with the OTC use-case in mind, PintSwap is a DEX using LibP2P
            where there is no persistent contract that facilitates trades. The
            contract only exists atomically and solely contains the logic to
            execute the trade, after which it self-destructs.
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src="/logo/ps-logo.png"
            alt="PintSwap Logo"
            height="200"
            width="200"
          />
        </div>
      </div>
    </Section>
    <Section>{/* TODO: add scroll down animation here */}</Section>
  </Background>
);

export { Hero };

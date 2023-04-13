import { Logo } from '../base/logo';
import { Background } from '../layouts/background';
import { Section } from '../layouts/section';

const Hero = () => (
  <Background color="bg-[#212121]" fullscreen>
    <Section yPadding="pt-20 pb-32">
      <div className="flex flex-col items-center gap-4">
        <img 
          src="/logo/ps-logo.png" 
          alt="PintSwap Logo" 
          height="120" 
          width="120" 
        />
        <Logo />
        <h3 className="text-center text-lg">Peer-to-peer token swaps using multi-party transaction scripts.</h3>
      </div>
    </Section>
  </Background>
);

export { Hero };

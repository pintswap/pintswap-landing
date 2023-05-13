import Link from 'next/link';
import { Padding } from '../layouts/padding';
import { Button } from '../components/button';
import { Logo } from '../base/logo';

const Hero = () => {
  return (
    <div className="h-screen flex justify-center items-center md:justify-between md:px-8 lg:px-16 xl:px-24">
      <Padding type="x">
        <div className="flex flex-col items-center justify-center gap-8 text-center md:text-left md:items-start mb-12">
          <div className="max-w-xl md:max-w-full flex flex-col justify-center items-center md:items-start">
            <img
              src="/logo/ps-logo.png"
              alt="PintSwap Logo"
              className="w-28 h-28 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
            <Logo tag="h1" textSize="text-4xl lg:text-5xl" />
            <h2 className="text-lg text-gray-400">
              Peer-to-Peer token swaps
              <br className="block" /> using multi-party transaction scripts.
            </h2>
          </div>

          <ul className="navbar flex flex-col gap-3 items-center font-medium md:gap-4 md:flex-row">
            <li>
              <Link href="https://pintswap.eth.limo" target="_blank">
                <a>
                  <Button>Launch App</Button>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://docs.pintswap.exchange" target="_blank">
                <a>Learn More</a>
              </Link>
            </li>
          </ul>
        </div>
      </Padding>
    </div>
  );
};

export { Hero };

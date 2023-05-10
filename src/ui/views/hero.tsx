import Link from 'next/link';
import { Padding } from '../layouts/padding';
import { Button } from '../components/button';
import { Logo } from '../base/logo';

const Hero = () => {
  return (
    <Padding type="x">
      <div className="flex flex-col items-center justify-center gap-8 text-center h-screen">
        <div className="max-w-xl flex flex-col justify-center items-center">
          <img
            src="/logo/ps-logo.png"
            alt="PintSwap Logo"
            height="120"
            width="120"
          />
          <Logo tag="h1" textSize="text-4xl lg:text-5xl 2xl:text-6xl" />
          <h2 className="text-lg text-gray-400">
            Peer-to-Peer token swaps
            <br /> using multi-party transaction scripts.
          </h2>
        </div>

        <ul className="navbar flex flex-col gap-3 items-center font-medium">
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
  );
};

export { Hero };

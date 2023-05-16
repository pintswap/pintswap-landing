import Link from 'next/link';
import { Padding } from '../layouts/padding';
import { Button } from '../components/button';

const Hero = () => {
  return (
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

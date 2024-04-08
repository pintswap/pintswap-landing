import Link from 'next/link';
import { Button } from '../components/button';
import { Section } from '../layouts';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { AnimatedHamburger } from '../components';
import { APP_URL } from '../../utils';

const NAV_ITEMS = [
  {
    text: 'Analytics',
    link: 'https://analytics.pintswap.com',
    target: '_blank',
  },
  {
    text: 'Litepaper',
    link: 'https://pintswap.com/litepaper.pdf',
    target: '_blank',
  },
  { text: 'Docs', link: 'https://docs.pintswap.com', target: '_blank' },
  // { text: 'Blog', link: '/blog', target: '_self' },
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <Section
        background={isMobileOpen ? 'bg-neutral-900' : 'bg-transparent'}
        wrapperClass={`!z-[102]`}
        type="wide"
        padding="y"
      >
        <div className="flex flex-wrap justify-between items-center mx-auto px-2">
          <Link href="/">
            <div className="max-w-[160px] max-h-[30px]">
              <Image
                src={'/assets/logo/pintswap-blue.svg'}
                alt="PintSwap is a decentralized, P2P OTC crypto exchange"
                width={790}
                height={149}
              />
            </div>
          </Link>

          <nav className="flex">
            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-3 md:gap-4 lg:gap-6 items-center font-medium md:text-lg">
              {NAV_ITEMS.map((el, i) => (
                <li key={`nav-item-${i}`}>
                  <Link href={el.link} target={el.target}>
                    <Button type="link" noIcon>
                      {el.text}
                    </Button>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/burn">
                  <Button type="outline">Burn</Button>
                </Link>
              </li>
              <li>
                <Link href="/token">
                  <Button>Buy $PINT</Button>
                </Link>
              </li>
            </ul>

            <div className="sm:hidden flex items-center gap-1">
              <Link href="/token">
                <Button>Buy $PINT</Button>
              </Link>
              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="px-0.5 sm:hidden"
              >
                <AnimatedHamburger state={isMobileOpen} />
              </button>
            </div>
          </nav>
        </div>
      </Section>

      <Transition
        show={isMobileOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="-translate-y-[100vw]"
        enterTo="translate-y-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-[100vw]"
        className="absolute !z-[101] right-0 -top-0"
      >
        <ul className="flex flex-col w-screen bg-neutral-900 shadow-md p-2 items-start justify-end gap-1 pb-2 min-h-[16rem]">
          {NAV_ITEMS.map((el, i) => (
            <li key={`nav-item-${i}`} className="w-full">
              <Link href={el.link} target={el.target} className="text-center">
                <Button
                  type="link"
                  noIcon
                  className={`text-lg p-2 font-medium mx-auto ${
                    isMobileOpen ? '' : 'opacity-0'
                  }`}
                >
                  {el.text}
                </Button>
              </Link>
            </li>
          ))}
          <li className="w-full">
            {/* <Button wallet>Connect</Button> */}
            <Link
              href={`${APP_URL}`}
              target="_blank"
              className={`w-full ${isMobileOpen ? '' : 'opacity-0'}`}
            >
              <Button className="text-lg w-full">Enter App</Button>
            </Link>
          </li>
        </ul>
      </Transition>

      <Transition
        show={isMobileOpen}
        enter="transition-opacity ease-in-out duration-500 delay-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={`fixed bottom-0 left-0 w-screen h-full flex flex-grow z-[100]`}
      >
        <div
          className="w-screen h-full bg-[rgba(0,0,0,0.3)]"
          onClick={() => setIsMobileOpen(false)}
        />
      </Transition>
    </>
  );
};

export { Navbar };

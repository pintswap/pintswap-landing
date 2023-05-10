import Link from 'next/link';
import { useWindowSize } from '../../hooks/window-size';

import { Button } from '../components/button';
import { Logo } from './logo';
import { Padding } from '../layouts/padding';

const Navbar = () => {
  const { width } = useWindowSize();
  return (
    <div className="w-full fixed">
      <Padding>
        <div className="flex flex-wrap justify-between items-center max-w-7xl mx-auto">
          <div>
            <Link href="/">
              <a>
                <Logo textSize="text-2xl lg:text-3xl" />
              </a>
            </Link>
          </div>

          <nav>
            <ul className="navbar flex items-center font-medium md:text-lg">
              <li>
                <Link href="https://docs.pintswap.exchange" target="_blank">
                  <a>Docs</a>
                </Link>
              </li>
              <li>
                <Link href="https://pintswap.eth.limo" target="_blank">
                  <a>
                    <Button className="md:text-lg">
                      Launch{width > 768 ? ' App' : ''}
                    </Button>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>

          <style jsx>
            {`
              .navbar :global(li:not(:first-child)) {
                @apply mt-0;
              }

              .navbar :global(li:not(:last-child)) {
                @apply mr-3 lg:mr-6;
              }
              .navbar :global(li) {
                @apply transition duration-200;
              }
              .navbar :global(li:hover) {
                @apply text-pink-100;
              }
            `}
          </style>
        </div>
      </Padding>
    </div>
  );
};

export { Navbar };

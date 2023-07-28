import Link from 'next/link';

import { Button } from '../components/button';
import { Logo } from './logo';
import { Padding } from '../layouts/padding';

const Navbar = () => {
  return (
    <div className="w-full">
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
            <ul className="flex gap-3 md:gap-4 lg:gap-6 items-center font-medium md:text-lg">
              <li className="transition duration-150 hover:text-pink-500">
                <Link href="https://docs.pintswap.exchange" target="_blank">
                  <a>DOCS</a>
                </Link>
              </li>
              <li>
                <Button wallet>Connect</Button>
                {/* <Link href="https://pintswap.eth.limo" target="_blank">
                  <a>
                    <Button className="md:text-lg">
                      Launch{width > 768 ? ' App' : ''}
                    </Button>
                  </a>
                </Link> */}
              </li>
            </ul>
          </nav>
        </div>
      </Padding>
    </div>
  );
};

export { Navbar };

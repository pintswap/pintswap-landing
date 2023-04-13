import Link from 'next/link';

import { Button } from '../components/button';
import { Section } from '../layouts/section';
import { Logo } from './logo';

const Navbar = () => (
  <Section yPadding="py-8">
    <div className="flex flex-wrap justify-between items-center">
      <div>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>

      <nav>
        <ul className="navbar flex items-center font-medium text-lg">
          <li>
            <Link href="https://docs.pintswap.com" target="_blank">
              <a>Docs</a>
            </Link>
          </li>
          <li>
            <Link href="https://pintswap.eth.limo" target="_blank">
              <a>
                <Button>Enter App</Button>
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
            @apply mr-6;
          }
          .navbar :global(li) {
            @apply transition duration-200;
          }
          .navbar :global(li:hover) {
            @apply text-neutral-300;
          }
        `}
      </style>
    </div>
  </Section>
);

export { Navbar };

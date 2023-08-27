import Link from 'next/link';
import { Button } from '../components/button';
import { Logo } from './logo';
import { Padding } from '../layouts/padding';
import { useWindowSize } from '../../hooks';

const NAV_ITEMS = [
  {
    text: 'STATS',
    link: 'https://analytics.pintswap.exchange',
    target: '_blank',
  },
  { text: 'DOCS', link: 'https://docs.pintswap.exchange', target: '_blank' },
  { text: 'BLOG', link: '/blog', target: '_self' },
];

const Navbar = () => {
  const { width, breakpoints } = useWindowSize();
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
              {width > breakpoints.sm &&
                NAV_ITEMS.map((el, i) => (
                  <li
                    key={`nav-item-${i}`}
                    className="transition duration-150 hover:text-pink-500 uppercase"
                  >
                    <Link href={el.link} target={el.target}>
                      <a>{el.text}</a>
                    </Link>
                  </li>
                ))}
              <li>
                {/* <Button wallet>Connect</Button> */}
                <Link href="https://pintswap.eth.limo" target="_blank">
                  <a>
                    <Button className="md:text-lg">
                      Launch{width > breakpoints.md ? ' App' : ''}
                    </Button>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Padding>
    </div>
  );
};

export { Navbar };

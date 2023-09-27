import Link from 'next/link';
import { Button } from '../components/button';
import { useWindowSize } from '../../hooks';
import { Section } from '../layouts';
import Image from 'next/image';

const NAV_ITEMS = [
  {
    text: 'Stats',
    link: 'https://analytics.pintswap.exchange',
    target: '_blank',
  },
  { text: 'Docs', link: 'https://docs.pintswap.exchange', target: '_blank' },
  { text: 'Blog', link: '/blog', target: '_self' },
];

const Navbar = () => {
  const { width, breakpoints } = useWindowSize();
  return (
    <Section wrapperClass="!z-50" type="wide" padding="y">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <div>
          <Link href="/">
            <div className="max-w-[190px] max-h-[36px]">
              <Image
                src={'/assets/logo/pintswap-logo.svg'}
                alt="PintSwap is a decentralized, P2P OTC crypto exchange"
                width={790}
                height={149}
              />
            </div>
          </Link>
        </div>

        <nav>
          <ul className="flex gap-3 md:gap-4 lg:gap-6 items-center font-medium md:text-lg">
            {width > breakpoints.sm &&
              NAV_ITEMS.map((el, i) => (
                <li key={`nav-item-${i}`}>
                  <Link href={el.link} target={el.target}>
                    <Button type="link" noIcon>
                      {el.text}
                    </Button>
                  </Link>
                </li>
              ))}
            <li>
              {/* <Button wallet>Connect</Button> */}
              <Link href="https://pintswap.eth.limo" target="_blank">
                <Button>Enter{width > breakpoints.md ? ' App' : ''}</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Section>
  );
};

export { Navbar };

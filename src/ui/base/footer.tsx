import Link from 'next/link';
import { Button, SocialList } from '../components';
import { Section } from '../layouts';

const Footer = () => (
  <Section
    background="bg-neutral-900"
    type="wide"
    padding="y"
    wrapperClass="mt-16 md:mt-24 xl:mt-36 absolute bottom-0"
  >
    <div className="flex flex-col-reverse gap-2 justify-center items-center lg:grid lg:grid-cols-3">
      <span className="text-xs">
        Cold Water Labs &copy; {new Date().getFullYear()}
      </span>
      <div className="justify-self-center">
        <SocialList />
      </div>
      <div className="flex gap-3 xl:gap-4 justify-self-end">
        <Link href="https://analytics.pintswap.exchange">
          <Button type="link" noIcon>
            Analytics
          </Button>
        </Link>
        <Link href="https://docs.pintswap.exchange">
          <Button type="link" noIcon>
            Docs
          </Button>
        </Link>
        <Link href="/blog">
          <Button type="link" noIcon>
            Blog
          </Button>
        </Link>
        <Link href="/litepaper.pdf">
          <Button type="link" noIcon>
            Litepaper
          </Button>
        </Link>
      </div>
    </div>
  </Section>
);

export { Footer };

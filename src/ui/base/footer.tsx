import Link from 'next/link';
import { Button, SocialList } from '../components';
import { Section } from '../layouts';

const Footer = () => (
  <Section
    background="bg-indigo-900"
    type="wide"
    padding="y"
    wrapperClass="mt-24"
  >
    <div className="flex flex-col-reverse gap-1.5 justify-center items-center lg:grid lg:grid-cols-3">
      <span>Cold Water Labs &copy; {new Date().getFullYear()}</span>
      <div className="justify-self-center">
        <SocialList />
      </div>
      <div className="flex gap-3 xl:gap-4 justify-self-end">
        <Link href="https://analytics.pintswap.exchange">
          <Button type="link" noIcon>
            Stats
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
      </div>
    </div>
  </Section>
);

export { Footer };

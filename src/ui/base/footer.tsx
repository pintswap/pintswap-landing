import Link from 'next/link';
import { Button, SocialList } from '../components';
import { Section } from '../layouts';

const Footer = () => (
  <Section background="bg-indigo-900" type="wide" padding="y">
    <div className="flex flex-col-reverse gap-2 justify-center items-center lg:grid lg:grid-cols-3">
      <span>Cold Water Labs &copy; {new Date().getFullYear()}</span>
      <div className="justify-self-center">
        <SocialList />
      </div>
      <div className="flex gap-3 justify-self-end">
        <Link href="https://analytics.pintswap.exchange">
          <Button type="link" noIcon>
            stats
          </Button>
        </Link>
        <Link href="https://docs.pintswap.exchange">
          <Button type="link" noIcon>
            docs
          </Button>
        </Link>
        <Link href="/blog">
          <Button type="link" noIcon>
            blog
          </Button>
        </Link>
      </div>
    </div>
  </Section>
);

export { Footer };

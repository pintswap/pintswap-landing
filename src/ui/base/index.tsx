import { ReactNode } from 'react';

import { AppConfig } from '../../utils/app-config';
import { Meta } from './meta';
import { Navbar } from './navbar';
import { useRouter } from 'next/router';
import { Footer } from './footer';

type IBaseProps = {
  children?: ReactNode;
  nav?: boolean;
};

const Base = (props: IBaseProps) => {
  const { pathname } = useRouter();
  return (
    <div className="antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Navbar />
      <div className={pathname !== '/' ? 'pb-4 sm:pb-0' : ''}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export { Base };

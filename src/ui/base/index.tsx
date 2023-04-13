import { ReactNode } from 'react';

import { AppConfig } from '../../utils/app-config';
import { Footer } from './footer';
import { Meta } from './meta';
import { Navbar } from './navbar';

type IBaseProps = {
  children?: ReactNode;
};

const Base = (props: IBaseProps) => (
  <div className="antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Navbar />
    {props.children}
    <Footer />
  </div>
);

export { Base };

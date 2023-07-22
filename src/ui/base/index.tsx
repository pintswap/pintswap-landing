import { ReactNode } from 'react';

import { AppConfig } from '../../utils/app-config';
import { Meta } from './meta';
import { Navbar } from './navbar';

type IBaseProps = {
  children?: ReactNode;
  nav?: boolean;
};

const Base = (props: IBaseProps) => (
  <div className="antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    {props.nav && <Navbar />}
    {props.children}
    {/* <Footer /> */}
  </div>
);

export { Base };

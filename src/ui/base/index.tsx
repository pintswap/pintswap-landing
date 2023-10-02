import { ReactNode } from 'react';

import { AppConfig } from '../../utils/app-config';
import { Meta } from './meta';
import { Navbar } from './navbar';
import { Footer } from './footer';

type IBaseProps = {
  children?: ReactNode;
};

const Base = (props: IBaseProps) => {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export { Base };

import { ReactNode } from 'react';
import { Padding } from './padding';

type ISection = {
  children: ReactNode;
  type?: 'wide' | 'default';
  id?: string;
  padding?: 'x' | 'y' | 'full' | 'none';
  background?: `bg${string}`;
  wrapperClass?: string;
};

export const Section = ({
  children,
  type = 'default',
  id,
  padding,
  background,
  wrapperClass,
}: ISection) => {
  const widthClass =
    type === 'wide' ? 'max-w-7xl px-2 xl:px-0' : 'max-w-6xl px-6 xl:px-0';
  return (
    <div className={`${background} relative z-10 ${wrapperClass || ''}`}>
      <div id={id} className={`${widthClass} mx-auto`}>
        <Padding type={padding}>{children}</Padding>
      </div>
    </div>
  );
};

import { ReactNode } from 'react';

type IPaddingProps = {
  children: ReactNode;
  type?: 'x' | 'y' | 'full';
};

export const Padding = ({ children, type = 'full' }: IPaddingProps) => {
  const yPadClass = `py-4 lg:py-5 xl:py-6`;
  const xPadClass = `px-2 lg:px-4 xl:px-6`;

  const determinePadClass = () => {
    switch (type) {
      case 'x':
        return xPadClass;
      case 'y':
        return yPadClass;
      default:
        return `${xPadClass} ${yPadClass}`;
    }
  };

  return <div className={determinePadClass()}>{children}</div>;
};

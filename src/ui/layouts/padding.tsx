import { ReactNode } from 'react';

type IPaddingProps = {
  children: ReactNode;
  type?: 'x' | 'y' | 'full';
};

export const Padding = ({ children, type = 'full' }: IPaddingProps) => {
  const yPadClass = `py-4 md:py-5 lg:py-6`;
  const xPadClass = `px-2 md:px-4 lg:px-6`;

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

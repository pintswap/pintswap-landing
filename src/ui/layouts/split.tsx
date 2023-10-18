import { ReactNode } from 'react';

type ISplit = {
  children: ReactNode;
};

export const Split = ({ children }: ISplit) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 2xl:gap-8">{children}</div>
  );
};

import { ReactNode } from 'react';

type ISplit = {
  children: ReactNode;
};

export const Split = ({ children }: ISplit) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      {children}
    </div>
  );
};

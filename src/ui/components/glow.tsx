import { ReactNode } from 'react';

type IGlow = {
  children: ReactNode;
};

export const Glow = ({ children }: IGlow) => {
  return <div className="shadow-[0_0_80px_8px_rgb(79,70,229)]">{children}</div>;
};

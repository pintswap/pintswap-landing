import { ReactNode } from 'react';

type IGlow = {
  children: ReactNode;
};

export const Glow = ({ children }: IGlow) => {
  return (
    <div className="shadow-[0_0_50px_5px_rgb(129,77,198)]">{children}</div>
  );
};

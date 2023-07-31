import { ReactNode } from 'react';

type ISkeleton = {
  shape?: 'rectangle' | 'circle';
  loading?: boolean;
  children: ReactNode | string;
  height?: `h-${string}`;
  width?: `h-${string}`;
};

export const Skeleton = ({
  shape,
  loading,
  children,
  height,
  width,
}: ISkeleton) => {
  if (loading) {
    return (
      <div
        className={`
        bg-neutral-800 animate-pulse
        ${shape ? 'rounded-full' : 'rounded'} 
        ${height || 'h-6 md:h-7'} 
        ${width || 'w-24 md:w-28'}
      `}
      />
    );
  }
  return children;
};

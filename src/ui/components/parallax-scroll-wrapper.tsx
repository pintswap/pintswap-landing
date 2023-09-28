import { ReactNode } from 'react';
import { useParallax } from 'react-scroll-parallax';

type IParallaxScrollWrapper = {
  children: ReactNode;
  animation?:
    | 'scale'
    | 'scaleX'
    | 'scaleY'
    | 'rotateX'
    | 'rotateY'
    | 'rotate'
    | 'translateY'
    | 'translateX'
    | 'opacity';
  reverse?: boolean;
  className?: string;
  startValue?: number | `${string}px`;
  endValue?: number | `${string}px`;
};

export const ParallaxScrollWrapper = ({
  children,
  animation = 'translateY',
  reverse,
  className,
  startValue,
  endValue,
}: IParallaxScrollWrapper) => {
  const isTranslate = !!(
    animation === 'translateY' || animation === 'translateX'
  );
  const parallaxRef = useParallax<HTMLDivElement>({
    [animation]: isTranslate
      ? reverse
        ? [startValue || '15px', endValue || '-15px']
        : [startValue || '-15px', endValue || '15px']
      : reverse
      ? [startValue || 1, endValue || 0.9, 'easeInQuad']
      : [startValue || 0.9, endValue || 1, 'easeInQuad'],
  });

  return (
    <div ref={parallaxRef.ref} className={className}>
      {children}
    </div>
  );
};

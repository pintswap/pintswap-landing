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
    | 'translateX';
  reverse?: boolean;
  className?: string;
};

export const ParallaxScrollWrapper = ({
  children,
  animation = 'translateY',
  reverse,
  className,
}: IParallaxScrollWrapper) => {
  const isTranslate = !!(
    animation === 'translateY' || animation === 'translateX'
  );
  const parallaxRef = useParallax<HTMLDivElement>({
    [animation]: isTranslate
      ? [reverse ? '15px' : '-15px', reverse ? '-15px' : '15px']
      : [0.95, 1, 'easeInQuad'],
  });

  return (
    <div ref={parallaxRef.ref} className={className}>
      {children}
    </div>
  );
};

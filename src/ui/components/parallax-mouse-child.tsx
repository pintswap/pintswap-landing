import { MouseParallaxChild } from 'react-parallax-mouse';
import Image from 'next/image';

type IParallaxChild = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: number;
  height: number;
  factor?: number;
  img: string;
  alt?: string;
  className?: string;
  inverted?: boolean;
  animation?: string;
  blur?: `blur-${string}`;
  speed?: `floating${string}`;
};

const defaultParallaxStyle: any = { position: 'absolute', zIndex: '99' };
const defaultFactor = 0.2;

export const ParallaxMouseChild = ({
  top,
  bottom,
  left,
  right,
  width,
  height,
  factor,
  img,
  alt,
  className,
  inverted,
  animation = 'duration-[2000ms]',
  blur,
  speed = 'floating',
}: IParallaxChild) => {
  return (
    <MouseParallaxChild
      style={{
        ...defaultParallaxStyle,
        top: top || 'auto',
        left: left || 'auto',
        right: right || 'auto',
        bottom: bottom || 'auto',
      }}
      className={`${className}`}
      factorX={factor || defaultFactor}
      factorY={factor || defaultFactor}
      inverted={inverted}
    >
      <Image
        src={img}
        width={width}
        height={height}
        alt={alt || 'Parallax PintSwap Image'}
        className={`${speed} ${animation} ${blur || ''}`}
      />
    </MouseParallaxChild>
  );
};

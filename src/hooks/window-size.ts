import { useEffect, useState } from 'react';

type WindowDimentions = {
  width: number;
  height: number;
};

const breakpoints = {
  sm: 600,
  md: 769,
  lg: 1024,
};

const useWindowSize = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...windowDimensions, breakpoints };
};

export { useWindowSize };

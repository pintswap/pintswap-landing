import { useWindowSize } from '../../hooks/window-size';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { minutesDiff } from '../../utils/helpers';

const deadline = new Date('August 1, 2023 13:00:00');
const timeLeft = minutesDiff(deadline, new Date());

export const CountdownTimer = () => {
  const { width, breakpoints } = useWindowSize();
  const determineSize = () => {
    if (width > breakpoints.lg) return 160;
    if (width > breakpoints.md) return 120;
    if (width > breakpoints.sm) return 100;
    return 80;
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <CountdownCircleTimer
        isPlaying
        duration={timeLeft}
        colors={'url(#color-id)'}
        isSmoothColorTransition
        size={determineSize()}
        updateInterval={60}
        strokeWidth={width > breakpoints.sm ? 12 : 6}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col items-center">
            <span className="text-md md:text-lg">{remainingTime}</span>
            <span className="text-[10px] sm:text-xs md:text-sm">MIN</span>
          </div>
        )}
      </CountdownCircleTimer>
      <span className="text-xs sm:text-sm md:text-lg">
        Until <span className="text-sky-500">TRIS</span> Mint
      </span>
      <svg className="absolute">
        <defs>
          <linearGradient id="color-id" x1="1" y1="0" x2="0" y2="0">
            <stop offset="5%" stopColor="#0ea5e9" />
            <stop offset="95%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

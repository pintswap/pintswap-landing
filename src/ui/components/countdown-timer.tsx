import { useWindowSize } from '../../hooks/window-size';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { hourDiff } from '../../utils/helpers';

export const CountdownTimer = () => {
  const deadline = new Date('August 1, 2023 17:00:00');
  const { width } = useWindowSize();
  const determineSize = () => {
    if (width > 1024) return 160;
    if (width > 768) return 120;
    return 100;
  };
  return (
    <>
      <CountdownCircleTimer
        isPlaying
        duration={hourDiff(deadline, new Date())}
        colors={'url(#color-id)'}
        isSmoothColorTransition
        size={determineSize()}
        updateInterval={3600}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col items-center">
            <span className="text-md md:text-lg">{remainingTime}</span>
            <span className="text-xs md:text-sm">HOURS</span>
          </div>
        )}
      </CountdownCircleTimer>
      <span className="text-sm md:text-lg">
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
    </>
  );
};

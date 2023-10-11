import Link from 'next/link';
import { Skeleton } from './skeleton';
import { Glow } from './glow';
import CountUp from 'react-countup';
import { useWindowSize } from '../../hooks';
import { SmartPrice } from './smart-price';

type IDataDisplay = {
  value: string | number;
  text: string;
  color?: `text-${string}`;
  link?: string;
  loading?: boolean;
  align?: 'center' | 'left' | 'right';
  type?: 'fancy' | 'simple';
  usd?: boolean;
};

export const DataDisplay = ({
  value,
  text,
  color,
  link,
  loading,
  align,
  type = 'simple',
  usd,
}: IDataDisplay) => {
  const { width, breakpoints } = useWindowSize();
  const determineAlign = (_align?: 'center' | 'left' | 'right') => {
    switch (_align || align) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      default:
        'items-center text-center';
    }
  };
  if (type === 'fancy') {
    return (
      <div className="flex flex-row gap-3">
        <Glow>
          <span className="h-full w-1.5 bg-primary rounded-l-xl block" />
        </Glow>
        <div
          className={`flex flex-col justify-center ${determineAlign('left')}`}
        >
          <Skeleton
            width={width < breakpoints.sm ? 'w-[48px]' : 'w-[60px]'}
            height={width < breakpoints.sm ? 'h-[30px]' : 'h-[36px]'}
            loading={loading}
          >
            <span
              className={`text-3xl lg:text-4xl font-medium ${
                color || ''
              } leading-none`}
            >
              {Number(value) < 1 ? (
                <span>
                  {usd && '$'}
                  <SmartPrice price={value} />
                </span>
              ) : (
                <CountUp prefix={usd ? '$' : ''} end={Number(value)} />
              )}
            </span>
          </Skeleton>
          <span className="text-sm text-neutral-400 mt-1">{text}</span>
        </div>
      </div>
    );
  }
  const wrapperClass = `flex flex-col justify-center ${determineAlign()}`;
  return (
    <div className={wrapperClass}>
      <span className="text-xs lg:text-sm">{text}</span>
      <Skeleton loading={loading}>
        {link ? (
          <Link href={link} target="_blank">
            <a target="_blank">
              <span
                className={`font-bold lg:text-lg ${
                  color || ''
                } underline cursor-pointer`}
              >
                {value}
              </span>
            </a>
          </Link>
        ) : (
          <span className={`font-bold lg:text-lg ${color || ''}`}>{value}</span>
        )}
      </Skeleton>
    </div>
  );
};

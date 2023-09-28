import Link from 'next/link';
import { Skeleton } from './skeleton';
import { Glow } from './glow';
import CountUp from 'react-countup';

type IDataDisplay = {
  value: string | number;
  text: string;
  color?: `text-${string}`;
  link?: string;
  loading?: boolean;
  align?: 'center' | 'left' | 'right';
  type?: 'fancy' | 'simple';
};

export const DataDisplay = ({
  value,
  text,
  color,
  link,
  loading,
  align,
  type = 'simple',
}: IDataDisplay) => {
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
          <span className="h-full w-1.5 bg-primary-light rounded-l-xl block" />
        </Glow>
        <div
          className={`flex flex-col justify-center ${determineAlign('left')}`}
        >
          <span className={`text-3xl lg:text-4xl font-medium ${color || ''}`}>
            <CountUp end={Number(value)} />
          </span>
          <span className="text-md text-neutral-400">{text}</span>
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

import Link from 'next/link';
import { Skeleton } from './skeleton';

type IDataDisplay = {
  value: string | number;
  text: string;
  color?: `text-${string}`;
  link?: string;
  loading?: boolean;
  align?: 'center' | 'left' | 'right';
};

export const DataDisplay = ({
  value,
  text,
  color,
  link,
  loading,
  align,
}: IDataDisplay) => {
  const determineAlign = () => {
    switch (align) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      default:
        'items-center text-center';
    }
  };
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

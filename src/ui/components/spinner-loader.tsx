import { MdOutlineMotionPhotosOn } from 'react-icons/md';

type ISpinnerLoaderProps = {
  color?: `text-${string}`;
  size?: `${string}px`;
  height?: `min-h-${string}`;
  className?: string;
};

export const SpinnerLoader = ({
  color = 'text-white',
  size = '20px',
  height = 'min-h-[50px]',
  className,
}: ISpinnerLoaderProps) => (
  <div
    className={`flex ${className || ''} justify-center items-center ${height}`}
  >
    <MdOutlineMotionPhotosOn className={`animate-spin ${color}`} size={size} />
  </div>
);

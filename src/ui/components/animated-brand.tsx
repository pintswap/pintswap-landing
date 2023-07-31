import { useWindowSize } from '../../hooks/window-size';

export const AnimatedBrand = ({
  size,
  subtitle,
}: {
  size?: string;
  subtitle?: string;
}) => {
  const { width } = useWindowSize();
  const determineAnimationSize = () => {
    if (width > 1024) return '540px';
    if (width > 768) return '420px';
    return '240px';
  };
  return (
    <div className="flex flex-col text-center justify-center w-full">
      {subtitle && (
        <h2 className="uppercase md:text-lg relative top-20 md:top-36 lg:top-48">
          {subtitle}
        </h2>
      )}
      <div
        style={{
          backgroundImage: 'url("https://i.ibb.co/q9nHy2p/ps-drip.gif")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          height: size || determineAnimationSize(),
        }}
      />
    </div>
  );
};

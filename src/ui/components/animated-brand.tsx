export const AnimatedBrand = ({
  size,
  subtitle,
}: {
  size: string;
  subtitle?: string;
}) => (
  <div className="flex flex-col text-center justify-center w-full">
    {subtitle && (
      <h2 className="uppercase md:text-lg relative top-20 md:top-36">
        {subtitle}
      </h2>
    )}
    <div
      style={{
        backgroundImage: 'url("/assets/ps-drip.gif")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        height: size,
      }}
    />
  </div>
);

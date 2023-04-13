import { AppConfig } from '../../utils/app-config';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <h2 className="text-3xl">
        <span className="text-pink-500">Pint</span>
        <span className="text-sky-400">Swap</span>
    </h2>
  );
};

export { Logo };

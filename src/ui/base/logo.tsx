type ILogoProps = {
  textSize?: `text-${string}`;
};

const Logo = (props: ILogoProps) => {
  return (
    <h2 className={props.textSize ? props.textSize : 'text-3xl'}>
        <span className="text-pink-500">Pint</span>
        <span className="text-sky-400">Swap</span>
    </h2>
  );
};

export { Logo };

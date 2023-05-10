type ILogoProps = {
  textSize?: `text-${string}`;
  tag?: 'h1' | 'h2' | 'span';
};

const Logo = (props: ILogoProps) => {
  const renderClass = `${props.textSize ? props.textSize : 'text-3xl'}`;
  const renderText = () => (
    <>
      <span className="text-pink-500">Pint</span>
      <span className="text-sky-400">Swap</span>
    </>
  );
  if (props.tag === 'h1') {
    <h1 className={renderClass}>{renderText()}</h1>;
  } else if (props.tag === 'h2') {
    <h2 className={renderClass}>{renderText()}</h2>;
  }
  return <span className={renderClass}>{renderText()}</span>;
};

export { Logo };

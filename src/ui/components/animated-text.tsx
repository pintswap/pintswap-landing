type IAnimatedTextProps = {
  delay?: `animate-delay-${string}`;
  type?: 'animate-jump-in';
  size?:
    | 'text-sm'
    | 'text-md'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl';
  text: string;
};

export const AnimatedText = ({
  delay,
  type = 'animate-jump-in',
  size,
  text,
}: IAnimatedTextProps) => {
  return (
    <div className={`${type} ${delay} animate-duration-[800ms]`}>
      <span className={`${size} text-neutral-300`}>{text}</span>
    </div>
  );
};

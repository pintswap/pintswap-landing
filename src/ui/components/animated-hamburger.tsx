type IHamburgerProps = {
  state: boolean;
  className?: string;
};

export const AnimatedHamburger = ({ state, className }: IHamburgerProps) => {
  const genericHamburgerLine = `h-[3px] w-7 my-[3px] bg-white transition ease transform duration-200 rounded-sm`;
  return (
    <div
      className={`p-1 group flex flex-col justify-center items-center ${
        className || ''
      }`}
    >
      <div
        className={`${genericHamburgerLine} ${
          state ? 'rotate-45 translate-y-[9px]' : ''
        }`}
      />
      <div className={`${genericHamburgerLine} ${state ? 'opacity-0' : ''}`} />
      <div
        className={`${genericHamburgerLine} ${
          state ? '-rotate-45 -translate-y-[9px]' : ''
        }`}
      />
    </div>
  );
};

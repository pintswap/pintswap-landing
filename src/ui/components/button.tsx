import className from 'classnames';
import { ReactNode } from 'react';
import { FaPlay, FaBook, FaNewspaper, FaChevronRight } from 'react-icons/fa';

type IButtonProps = {
  xl?: boolean;
  children: string | ReactNode;
  className?: string;
  cta?: boolean;
  link?: boolean;
  icon?: 'FaPlay' | 'FaBook' | 'FaNewspaper';
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-cta': props.cta,
    'btn-base': !props.xl,
    'btn-primary': true,
  });

  if (props.link) {
    return (
      <button className="flex items-center gap-1.5 uppercase transition duration-200 hover:text-pink-500">
        {props.children}
        <FaChevronRight size="12px" />
      </button>
    );
  }
  if (props.cta) {
    const move = `relative top-5 left-4`;
    const iconClass = `${move} !left-6 fill-slate-200`;
    const iconSize = `48px`;

    const renderIcon = () => {
      switch (props.icon) {
        case 'FaBook':
          return <FaBook className={iconClass} size={iconSize} />;
        case 'FaNewspaper':
          return <FaNewspaper className={iconClass} size={iconSize} />;
        default:
          return <FaPlay className={iconClass} size={iconSize} />;
      }
    };
    return (
      <div
        className={`transition group duration-200 flex justify-between overflow-hidden ${btnClass} ${
          props.className ? props.className : ''
        }`}
      >
        {props.children}
        <span
          className={`h-[90px] w-[90px] bg-sky-400 group-hover:bg-sky-500 duration-200 transition rounded-full ${move}`}
        >
          {renderIcon()}
        </span>
        <style jsx>
          {`
            .btn {
              @apply inline-block rounded-md text-center;
            }

            .btn-base {
              @apply py-2 pl-4 shadow-[4.0px_8.0px_8.0px_rgba(219,39,119,0.38)] transition duration-150;
            }

            .btn-base:hover {
              @apply shadow-none;
            }

            .btn-cta {
              @apply p-3 pr-0 !text-left flex items-end h-[72px];
            }

            .btn-primary {
              @apply text-slate-800 bg-gradient-to-r from-slate-100 to-slate-400 transition duration-150;
            }

            .btn-primary:hover {
              @apply bg-slate-300 cursor-pointer text-pink-500;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className={`${btnClass} ${props.className ? props.className : ''}`}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply py-2 px-4 shadow-[4.0px_8.0px_8.0px_rgba(219,39,119,0.38)] transition duration-150;
          }

          .btn-base:hover {
            @apply shadow-none;
          }

          .btn-xl {
            @apply text-xl px-6 py-4;
          }

          .btn-primary {
            @apply text-slate-800 bg-gradient-to-r from-slate-100 to-slate-300 transition duration-150;
          }

          .btn-primary:hover {
            @apply bg-slate-300 cursor-pointer text-pink-500;
          }
        `}
      </style>
    </div>
  );
};

export { Button };

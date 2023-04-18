import className from 'classnames';
import { ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: string | ReactNode;
  className?: string;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
  });

  return (
    <div className={`${btnClass} ${props.className ? props.className : ''}`}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply py-2 px-4;
          }

          .btn-xl {
            @apply text-xl py-4 px-6;
          }

          .btn-primary {
            @apply text-white bg-indigo-700 transition duration-200;
          }

          .btn-primary:hover {
            @apply bg-indigo-800 cursor-pointer;
          }
        `}
      </style>
    </div>
  );
};

export { Button };

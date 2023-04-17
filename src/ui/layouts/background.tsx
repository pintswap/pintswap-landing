import { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  fullscreen?: boolean;
  image?: `url(${string})`;
  className?: string;
};

const Background = (props: IBackgroundProps) => (
  <div
    className={`${props.color}
      ${props.fullscreen ? 'min-h-[calc(100vh-100px)]' : ''}
      ${props.className ? props.className : ''}
    `}
    style={{
      backgroundImage: props.image ? props.image : '',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '75% 25%',
    }}
  >
    {props.children}
  </div>
);

export { Background };

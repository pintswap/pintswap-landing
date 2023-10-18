import { MouseEventHandler, ReactNode } from 'react';
import {
  FaPlay,
  FaBook,
  FaNewspaper,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';
import { MdLocalDrink } from 'react-icons/md';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SpinnerLoader } from './spinner-loader';

type IButtonProps = {
  xl?: boolean;
  children: string | ReactNode;
  className?: string;
  icon?: 'play' | 'book' | 'newspaper' | 'drink';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  noIcon?: boolean;
  type?: 'cta' | 'link' | 'wallet' | 'outline' | 'default';
  size?: 'lg' | 'md' | 'sm';
  borderColor?: `border-${string}`;
  back?: boolean;
};

const Button = (props: IButtonProps) => {
  const ctaBtnClass = `hover:text-pink-500 inline-block rounded-md text-center py-2 pl-4 shadow-[4.0px_8.0px_8.0px_rgba(219,39,119,0.38)] transition duration-150 hover:shadow-none p-3 pr-0 !text-left flex items-end h-[72px] text-slate-800 bg-gradient-to-r from-slate-100 to-slate-400`;
  const sizeClass = () => {
    switch (props.size) {
      case 'lg':
        return 'py-1.5 px-5 text-lg';
      case 'sm':
        return 'py-1 px-2.5';
      default:
        return 'py-[5px] px-4';
    }
  };
  const btnClass = `inline-block font-semibold rounded-lg text-center ${sizeClass()} text-neutral-100 border border-1 ${
    props.borderColor || 'border-primary-dark'
  } cursor-pointer disabled:cursor-not-allowed disabled:!text-neutral-400`;

  switch (props.type) {
    case 'link': {
      return (
        <button
          className={`${
            props.className || ''
          } flex items-center gap-1.5 transition duration-150 hover:text-neutral-300`}
        >
          {!props.noIcon && props.back && <FaChevronLeft size="12px" />}
          <span className="pt-0.5">{props.children}</span>
          {!props.noIcon && !props.back && <FaChevronRight size="12px" />}
        </button>
      );
    }
    case 'wallet': {
      const walletClass = `py-2 px-4 shadow-[4.0px_8.0px_8.0px_rgba(219,39,119,0.38)] transition duration-150 rounded-md text-center text-slate-800 bg-gradient-to-r from-slate-100 to-slate-400 hover:shadow-none hover:text-pink-500`;
      return (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal,
            openAccountModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className={walletClass}
                        type="button"
                      >
                        {props.children}
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        className={walletClass}
                        type="button"
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={openAccountModal}
                        className={walletClass}
                        type="button"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      );
    }
    case 'cta': {
      const move = `relative top-5 left-4`;
      const iconClass = `${move} !left-6 fill-slate-200`;
      const iconSize = `48px`;

      const renderIcon = () => {
        switch (props.icon) {
          case 'book':
            return <FaBook className={iconClass} size={iconSize} />;
          case 'newspaper':
            return <FaNewspaper className={iconClass} size={iconSize} />;
          case 'drink':
            return <MdLocalDrink className={iconClass} size={iconSize} />;
          default:
            return <FaPlay className={iconClass} size={iconSize} />;
        }
      };
      return (
        <button
          className={`w-full transition group duration-150 flex justify-between overflow-hidden ${ctaBtnClass} ${
            props.className ? props.className : ''
          }`}
        >
          {props.children}
          <span
            className={`h-[90px] w-[90px] bg-sky-400 group-hover:bg-sky-500 duration-150 transition rounded-full ${move}`}
          >
            {renderIcon()}
          </span>
        </button>
      );
    }
    case 'outline': {
      return (
        <button
          className={`btn-hover outline-click rounded-lg p-0.5 w-full disabled:cursor-not-allowed text-white hover:text-neutral-100 disabled:text-neutral-400 ${
            props.className || ''
          }`}
          disabled={props.disabled}
        >
          <div className="flex h-full w-full items-center justify-center transtion duration-150 bg-neutral-900 hover:bg-[rgb(18,18,18)] back rounded-lg">
            <span className={`${sizeClass()} font-medium`}>
              {props.children}
            </span>
          </div>
        </button>
      );
    }
    default: {
      return (
        <button
          onClick={props.onClick}
          className={`${btnClass} btn-hover fill-click ${
            props.className ? props.className : ''
          } ${
            props.disabled
              ? 'cursor-not-allowed !shadow-none !text-slate-800 hover:!to-slate-800'
              : ''
          }`}
          disabled={props.disabled}
        >
          {props.loading ? (
            <span className="flex justify-center items-center gap-2">
              <span>
                {props.loadingText ? props.loadingText : props.children}
              </span>
              <SpinnerLoader height="min-h-0" />
            </span>
          ) : (
            <>{props.children}</>
          )}
        </button>
      );
    }
  }
};

export { Button };

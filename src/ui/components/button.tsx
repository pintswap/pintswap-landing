import { MouseEventHandler, ReactNode } from 'react';
import { FaPlay, FaBook, FaNewspaper, FaChevronRight } from 'react-icons/fa';
import { MdLocalDrink } from 'react-icons/md';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SpinnerLoader } from './spinner-loader';

type IButtonProps = {
  xl?: boolean;
  children: string | ReactNode;
  className?: string;
  cta?: boolean;
  link?: boolean;
  icon?: 'play' | 'book' | 'newspaper' | 'drink';
  wallet?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
};

const Button = (props: IButtonProps) => {
  const btnClass = `inline-block rounded-md text-center py-2 px-4 shadow-[4.0px_8.0px_8.0px_rgba(219,39,119,0.38)] transition duration-150 hover:shadow-none text-slate-800 bg-gradient-to-r from-slate-100 to-slate-400 cursor-pointer hover:text-pink-500`;
  const ctaBtnClass = `hover:text-pink-500 inline-block rounded-md text-center py-2 pl-4 shadow-[4.0px_8.0px_8.0px_rgba(219,39,119,0.38)] transition duration-150 hover:shadow-none p-3 pr-0 !text-left flex items-end h-[72px] text-slate-800 bg-gradient-to-r from-slate-100 to-slate-400`;
  if (props.link) {
    return (
      <button className="flex items-center gap-1.5 uppercase transition duration-200 hover:text-pink-500">
        {props.children}
        <FaChevronRight size="12px" />
      </button>
    );
  }

  if (props.wallet) {
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

  if (props.cta) {
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
        className={`w-full transition group duration-200 flex justify-between overflow-hidden ${ctaBtnClass} ${
          props.className ? props.className : ''
        }`}
      >
        {props.children}
        <span
          className={`h-[90px] w-[90px] bg-sky-400 group-hover:bg-sky-500 duration-200 transition rounded-full ${move}`}
        >
          {renderIcon()}
        </span>
      </button>
    );
  }
  return (
    <button
      onClick={props.onClick}
      className={`${btnClass} ${props.className ? props.className : ''} ${
        props.disabled
          ? 'cursor-not-allowed !shadow-none !text-slate-800 hover:!to-slate-'
          : ''
      }`}
      disabled={props.disabled}
    >
      {props.loading ? (
        <span className="flex justify-center items-center gap-2">
          <span>{props.loadingText ? props.loadingText : props.children}</span>
          <SpinnerLoader height="min-h-0" color="text-slate-800" />
        </span>
      ) : (
        <>{props.children}</>
      )}
    </button>
  );
};

export { Button };

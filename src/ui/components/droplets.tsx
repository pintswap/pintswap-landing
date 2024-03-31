import React, { ReactNode, useState } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';

interface IDroplets {
  type?: string;
  children?: ReactNode;
}

export const Droplets = (props: IDroplets) => {
  const [showState, setShowState] = useState(false);
  if (props.type === 'fill') {
    return (
      <div className="droplet-container w-full h-full z--100 absolute top-0 left-0 overflow-hidden">
        <button onClick={() => setShowState(!showState)}>Rain Drops</button>
        {[...Array(25)].map((_, index) => (
          <div key={index} className={`flex gap-32 justify-center w-full`}>
            {[...Array(index % 2 === 0 ? 10 : 9)].map((_, subIndex) => (
              <Transition
                key={subIndex}
                className={'flex-none droplets'}
                show={showState}
                enter="transition-all ease-out duration-800 transform rotate-y-360"
                enterFrom="transform rotate-y-180"
                enterTo="rotate-y-0"
                leave="transition-all ease-out duration-800"
                leaveFrom="transform rotate-y-0"
                leaveTo="transform rotate-y-180"
              >
                <Image
                  className="w-12 h-12"
                  src="/assets/img/droplet.svg"
                  width={50}
                  height={50}
                  alt="droplet"
                />
              </Transition>
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (props.type === 'background') {
    return (
      <div className="droplet-container w-full z--100 overflow-hidden relative">
        {[...Array(9)].map((_, index) => (
          <div key={index} className={`flex gap-16 justify-center w-full`}>
            {[...Array(index % 2 === 0 ? 10 : 9)].map((_, subIndex) => (
              <Transition
                key={subIndex}
                appear={true}
                className={'flex-none droplets'}
                show={true}
                enter="transition-all ease-out duration-800 transform rotate-y-360"
                enterFrom="transform rotate-y-180"
                enterTo="rotate-y-0"
                leave="transition-all ease-out duration-800"
                leaveFrom="transform rotate-y-0"
                leaveTo="transform rotate-y-180"
              >
                <Image
                  className="w-12 h-12"
                  src="/assets/img/droplet.svg"
                  width={50}
                  height={50}
                  alt="droplet"
                />
              </Transition>
            ))}
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full ">
          <div className="tunnel-vision w-full h-full flex justify-center items-center">
            {props.children}
          </div>
        </div>
      </div>
    );
  }
  <div className="droplet-container w-full h-full z-0">
    <button onClick={() => setShowState(!showState)}>Rain Drops</button>
    {[...Array(25)].map((_, index) => (
      <div key={index} className={`flex gap-32 justify-center w-full`}>
        {[...Array(index % 2 === 0 ? 10 : 9)].map((_, subIndex) => (
          <Transition
            key={subIndex}
            className={'flex-none droplets'}
            show={showState}
            enter="transition-all ease-out duration-800 transform rotate-y-360"
            enterFrom="transform rotate-y-180"
            enterTo="rotate-y-0"
            leave="transition-all ease-out duration-800"
            leaveFrom="transform rotate-y-0"
            leaveTo="transform rotate-y-180"
          >
            <img className="w-12 h-12" src="/img/droplet.svg" />
          </Transition>
        ))}
      </div>
    ))}
  </div>;
};

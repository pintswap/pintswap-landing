import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import { Button } from './button';

type IModal = {
  state: boolean;
  setState?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  closeFx?: any;
  title: string;
  secondary: ReactNode;
};

export const Modal = ({
  state,
  setState,
  children,
  closeFx,
  title,
  secondary,
}: IModal) => {
  function closeModal() {
    setState && setState(false);
  }

  function openModal() {
    setState && setState(true);
  }

  return (
    <Transition appear show={state} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500 delay-500"
          enterFrom="opacity-0 delay-500"
          enterTo="opacity-100 delay-500"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-round-gothic">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 delay-500"
              enterFrom="opacity-0 scale-95 delay-500"
              enterTo="opacity-100 scale-100 delay-500"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-[#1a1b1f] p-4 lg:px-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between mb-6">
                  <h3 className="text-xl font-medium">{title}</h3>
                  <button
                    onClick={closeFx || closeModal}
                    className="bg-[rgba(255,255,255,0.08)] rounded-full w-[28px] h-[28px] flex items-center justify-center relative -top-0.5 -right-0.5 transition duration-150 hover:scale-110"
                  >
                    <MdClose
                      size={18}
                      className="text-[rgba(224,232,255,0.6)]"
                    />
                  </button>
                </Dialog.Title>
                <div>{children}</div>

                <div className="mt-6 flex items-center justify-between">
                  <Transition
                    show={!!secondary}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {secondary}
                  </Transition>
                  <Button onClick={closeFx || closeModal} className="!w-fit">
                    Close
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

const MobileNavBar: FC<Props> = ({ onClick, isOpen }) => {
  return (
    <>
      <div
        onClick={onClick}
        className=' w-12 h-12 bg-neutral-50 flex-col justify-center items-center gap-2 inline-flex md:hidden cursor-pointer relative z-20 rounded-full'
      >
        <div
          className={clsx(
            'w-7 h-0.5 bg-neutral-900 dark:bg-gray-200 rounded-3xl transition-transform duration-300 transform',
            isOpen && ' rotate-45 translate-y-[5px]'
          )}
        />
        <div
          className={clsx(
            'w-7 h-0.5 bg-neutral-900 dark:bg-gray-200 rounded-3xl transition-transform duration-300 transform',
            isOpen && ' -rotate-45 -translate-y-[5px]'
          )}
        />
      </div>
      <div
        onClick={onClick}
        className={clsx(
          'fixed h-0 w-screen left-0 top-0 bg-opacity-70 z-10 bg-zinc-400 px-[20px] sm:px-[60px] transition-all duration-300',
          isOpen && 'h-screen'
        )}
      ></div>
      <div
        className={clsx(
          'w-[248px] h-0 bg-neutral-50 mr-0 ml-auto transition-all duration-200 mt-[70px] rounded-3xl absolute z-20 top-0 right-5 sm:right-[60px]',
          isOpen && 'h-[455px]'
        )}
      >
        <ul></ul>
        <div></div>
      </div>
    </>
  );
};

export default MobileNavBar;

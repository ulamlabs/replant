import { IconHome } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { Link } from 'react-router-dom';

export const HomeButton: React.FC<Record<string, never>> = () => {
  const fmtMsg = useFmtMsg();
  return (
    <Link
      style={{ border: '2px solid rgba(0, 0, 0, 0.2)' }}
      className='absolute bg-clip-padding bg-white flex gap-2 hover:opacity-95 items-center left-14 px-3 py-2 rounded top-2.5 z-[1000]'
      to='/'
    >
      <IconHome overrideColors className='fill-black' />
      <span className='hidden sm:inline text-base text-black'>
        {fmtMsg('home')}
      </span>
    </Link>
  );
};

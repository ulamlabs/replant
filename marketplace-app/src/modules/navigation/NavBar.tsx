import { useFmtMsg } from 'modules/intl';
import { NavLink } from 'react-router-dom';
import { ReplantLogo } from '../../common/components/ReplantLogo';
import NavItem from './components/NavItem';

function NavBar() {
  const fmtMsg = useFmtMsg();

  return (
    <nav className='h-[92px] py-5 bg-opacity-90 backdrop-blur-[20px] fixed w-screen top-0'>
      <div className='flex justify-between items-center max-w-[1488px] px-[20px] sm:px-[60px] lg:px-[120px]'>
        <NavLink to='/'>
          <ReplantLogo />
        </NavLink>
        <div className='flex items-center gap-[40px]'>
          <div className='flex gap-3 lg:gap-9 w-auto'>
            <NavItem to='/' name={fmtMsg('home')} />
            <NavItem to='marketplace' name={fmtMsg('marketplace')} />
            <NavItem to='sponsors' name={fmtMsg('sponsors')} />
            <NavItem to='planters' name={fmtMsg('planters')} />
            <NavItem to='impact' name={fmtMsg('impact')} />
          </div>
          <div className='gap-2.5 flex'>
            <button className='px-6 py-3 border border-teal-500 rounded-3xl text-teal-500 text-base font-bold'>
              {fmtMsg('logIn')}
            </button>
            <button className='px-6 py-3 bg-teal-500 text-zinc-100 rounded-3xl text-base font-bold'>
              {fmtMsg('signUp')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

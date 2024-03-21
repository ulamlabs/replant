import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ReplantLogo } from '../../common/components/ReplantLogo';
import NavItem from './components/NavItem';

function NavBar() {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isAuthPath = ['/signup', '/login'].includes(pathname);

  return (
    <nav className=' mx-auto h-[116px] py-8 bg-opacity-90 backdrop-blur-[20px] fixed w-screen top-0 flex align-center justify-center'>
      <div className='flex justify-between items-center max-w-[1728px] px-[20px] sm:px-[60px] lg:px-[120px] w-full'>
        <NavLink to='/'>
          <ReplantLogo />
        </NavLink>
        {!isAuthPath && (
          <div className='flex items-center gap-[40px]'>
            <div className='flex gap-3 lg:gap-9 w-auto'>
              <NavItem to='/' name={fmtMsg('home')} />
              <NavItem to='marketplace' name={fmtMsg('marketplace')} />
              <NavItem to='sponsors' name={fmtMsg('sponsors')} />
              <NavItem to='planters' name={fmtMsg('planters')} />
              <NavItem to='impact' name={fmtMsg('impact')} />
            </div>
            <div className='gap-2.5 flex'>
              <Button onClick={() => navigate('/login')} type='secondary'>
                {fmtMsg('logIn')}
              </Button>
              <Button onClick={() => navigate('/signup')} type='primary'>
                {fmtMsg('signUp')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

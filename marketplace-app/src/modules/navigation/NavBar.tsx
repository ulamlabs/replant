import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { useUser } from 'modules/user';
import { User } from 'modules/user/User';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ReplantLogo } from '../../common/components/ReplantLogo';
import MobileNavBar from './components/MobileNavBar';
import NavItem from './components/NavItem';

function NavBar() {
  const fmtMsg = useFmtMsg();

  const { data: user } = useUser();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isAuthPath = ['/signup', '/login'].includes(pathname);

  return (
    <nav className=' mx-auto h-[71px] md:h-[116px] py-4 md:py-8 bg-opacity-90 backdrop-blur-[20px] fixed w-screen top-0 flex align-center justify-center'>
      <div className='flex justify-between items-center max-w-[1728px] px-[20px] sm:px-[60px] lg:px-[120px] w-full'>
        <NavLink to='/'>
          <ReplantLogo />
        </NavLink>
        <MobileNavBar user={user} navigate={navigate} />
        {!isAuthPath && (
          <div className='items-center gap-[40px] hidden md:flex'>
            <div className='flex gap-3 lg:gap-9 w-auto'>
              <NavItem to='/'>{fmtMsg('home')}</NavItem>
              <NavItem to='marketplace'>{fmtMsg('marketplace')}</NavItem>
              <NavItem to='sponsors'>{fmtMsg('sponsors')}</NavItem>
              <NavItem to='planters'>{fmtMsg('planters')}</NavItem>
              <NavItem to='impact'>{fmtMsg('impact')}</NavItem>
            </div>
            <div className='gap-2.5 flex'>
              {user ? (
                <User user={user} />
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} type='secondary'>
                    {fmtMsg('logIn')}
                  </Button>
                  <Button onClick={() => navigate('/signup')} type='primary'>
                    {fmtMsg('signUp')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

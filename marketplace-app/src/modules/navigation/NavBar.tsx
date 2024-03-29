import { Button } from 'common/components';
import { ReplantLogo } from 'common/components/ReplantLogo';
import { useFmtMsg } from 'modules/intl';
import { User, useUser } from 'modules/user';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import MobileNavBar from './components/MobileNavBar';
import NavItem from './components/NavItem';

function NavBar() {
  const fmtMsg = useFmtMsg();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const { data: user } = useUser();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isAuthPath = ['/signup', '/login'].includes(pathname);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => {
    setIsNavOpen((state) => !state);
  };

  const logOut = () => {
    // handle logout here
  };

  return (
    <nav className='mx-auto h-20 lg:h-28 py-4 lg:py-8 bg-opacity-90 backdrop-blur-xl fixed w-screen top-0 flex align-center justify-center'>
      <div className='flex justify-between items-center max-w-[1728px] px-5 sm:px-16 lg:px-32 w-full'>
        <NavLink to='/'>
          <ReplantLogo />
        </NavLink>
        <MobileNavBar
          user={user}
          navigate={navigate}
          toggleNav={toggleNav}
          open={isNavOpen}
          logOut={logOut}
        />
        {!isAuthPath && (
          <div className='items-center gap-10 hidden lg:flex'>
            <div className='flex gap-5 xl:gap-9 w-auto'>
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
                  <Link to='login'>
                    <Button type='secondary'>{fmtMsg('logIn')}</Button>
                  </Link>
                  <Link to='signup'>
                    <Button type='primary'>{fmtMsg('signUp')}</Button>
                  </Link>
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

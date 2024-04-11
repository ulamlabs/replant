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

  const { data: user, isLoading } = useUser();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isAuthPath = [
    '/signup',
    '/login',
    '/signup-success',
    '/email-confirm',
  ].includes(pathname);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => {
    setIsNavOpen((state) => !state);
  };

  return (
    <nav className='mx-auto h-20 lg:h-24 py-5 lg:py-8 bg-opacity-90 backdrop-blur-xl fixed w-screen top-0 flex align-center justify-center z-20'>
      <div className='flex justify-between items-center max-w-screen-2xl px-5 sm:px-16 lg:px-32 w-full'>
        <NavLink to='/'>
          <ReplantLogo />
        </NavLink>
        <MobileNavBar
          user={user}
          navigate={navigate}
          toggleNav={toggleNav}
          open={isNavOpen}
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
            {!isLoading && (
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
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

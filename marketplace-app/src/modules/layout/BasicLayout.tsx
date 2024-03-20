import { Footer } from 'common/components/Footer';
import NavBar from 'modules/navigation/NavBar';
import { Outlet } from 'react-router-dom';

export const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <div className=' mt-[92px] max-w-[1488px] px-[20px] sm:px-[60px] lg:px-[120px]'>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

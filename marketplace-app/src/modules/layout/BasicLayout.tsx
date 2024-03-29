import { Footer } from 'common/components';
import NavBar from 'modules/navigation/NavBar';
import { Outlet } from 'react-router-dom';

export const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <div className='mx-auto pt-24 max-w-[1728px] px-5 sm:px-16 lg:px-32'>
        <main className='pt-12'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

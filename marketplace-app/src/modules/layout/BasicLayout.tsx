import { Footer } from 'common/components';
import NavBar from 'modules/navigation/NavBar';
import { Outlet } from 'react-router-dom';

export const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <div className='mx-auto min-h-screen pt-20 md:pt-24 max-w-[1728px] px-5 sm:px-16 lg:px-32 flex flex-col justify-between'>
        <main className='pt-2 md:pt-20'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

import { Footer } from 'common/components';
import NavBar from 'modules/navigation/NavBar';
import { Outlet } from 'react-router-dom';

export const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <div className=' mx-auto mt-[92px] max-w-[1728px] px-[20px] sm:px-[60px] lg:px-[120px]'>
        <main className=' pt-20'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

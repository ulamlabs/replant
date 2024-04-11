import { NFTSection } from 'modules/nft';
import { FirstLogin, TopUsersSection, useUser } from 'modules/user';
import { useLocation } from 'react-router-dom';

export const Home = () => {
  useUser();

  const location = useLocation();
  const firstLogin: boolean | undefined = location.state?.firstLogin;

  return (
    <>
      <NFTSection />
      <TopUsersSection />
      {firstLogin && <FirstLogin />}
    </>
  );
};

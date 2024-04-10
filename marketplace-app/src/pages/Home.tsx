import { NFTSection } from 'modules/nft';
import { TopUsersSection, useUser } from 'modules/user';

export const Home = () => {
  useUser();

  return (
    <>
      <NFTSection />
      <TopUsersSection />
    </>
  );
};

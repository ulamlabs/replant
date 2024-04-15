import { useFmtMsg } from 'modules/intl';
import { FC, useState } from 'react';
import { UserType, useUserStore } from '.';
import { UserInfo } from './components';

type Props = {
  user: UserType | undefined;
};

export const ProfileDetailsForm: FC<Props> = ({ user }) => {
  const fmtMsg = useFmtMsg();
  const [editName, setEditName] = useState(false);
  const store = useUserStore();

  return (
    <form>
      {store.editUserDetails ? (
        <div></div>
      ) : (
        <UserInfo
          onClick={() => store.setEditUserDetails(true)}
          name={user!.sponsor.name}
          type={user!.sponsor.type}
        />
      )}
    </form>
  );
};

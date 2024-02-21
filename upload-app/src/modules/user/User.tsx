import { useFmtMsg } from 'modules/intl';
import { useUser } from '.';

export const User: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const { data: user } = useUser();

  return (
    <div className='text-xs space-y-5'>
      <div className='flex flex-col'>
        <span className='font-bold'>{fmtMsg('login')}</span>
        <span>{user?.username}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold'>{fmtMsg('phoneNumber')}</span>
        <span>{user?.phone_number}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold'>{fmtMsg('plantingOrganization')}</span>
        <span>{user?.planting_organization.name}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold'>{fmtMsg('country')}</span>
        <span>{user?.country.name}</span>
      </div>
    </div>
  );
};

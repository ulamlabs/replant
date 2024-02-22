import { LocationIcon, PhoneIcon, UserIcon } from 'common/icons';
import { useUser } from '.';

export const User: React.FC = () => {
  const { data: user } = useUser();

  return (
    <div className='text-base space-y-5'>
      <div className='flex gap-2 items-center'>
        <UserIcon pathClassName='fill-gray-500' svgClassName='w-4 h-4' />
        <span>{user?.username}</span>
      </div>
      <div className='flex gap-2 items-center'>
        <PhoneIcon svgClassName='w-4 h-4' />
        <span>{user?.phone_number}</span>
      </div>
      <div className='flex gap-2 items-center'>
        <span>{user?.planting_organization.name}</span>
      </div>
      <div className='flex gap-2 items-center'>
        <LocationIcon svgClassName='w-4 h-4' />
        <span>{user?.country.name}</span>
      </div>
    </div>
  );
};

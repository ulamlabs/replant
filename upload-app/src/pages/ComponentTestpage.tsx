import { LocationIcon } from 'common/icons/LocationIcon';
import { Button, Header, Input } from 'common/components';

export const ComponentTestpage: React.FC = () => {
  return (
    <div>
      <Button text={'Test big'} size={'BIG'} onClick={() => {}} />
      <Button text={'Test small'} size={'SMALL'} onClick={() => {}} />
      <Input
        label={'Header test'}
        placeholder={'Test placeholder'}
        icon={<LocationIcon />}
        onChange={() => {}}
      />
      <Input
        placeholder={'Test placeholder'}
        icon={<LocationIcon />}
        onChange={() => {}}
        value='Testowa wartość'
      />
      <Header
        text={'Test header'}
        onBack={() => {
          console.log('test back');
        }}
      />
      <Header text={'Test header without back'} />
    </div>
  );
};

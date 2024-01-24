import { LocationIcon } from 'common/icons';
import { Button, Header, Input } from 'common/components';
import { UnauthLayout } from 'modules/layout';

export const ComponentTestpage: React.FC = () => {
  return (
    <UnauthLayout>
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
    </UnauthLayout>
  );
};

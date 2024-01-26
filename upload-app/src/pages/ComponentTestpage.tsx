import { LocationIcon } from 'common/icons';
import { Autocomplete, Button, Header, Input } from 'common/components';
import { UnauthLayout } from 'modules/layout';
import { Alert } from 'common/components/Alert';

export const ComponentTestpage: React.FC = () => {
  return (
    <UnauthLayout>
      <div>
        <Alert text={'Test error alert'} severity={'error'} />
        <Alert text={'Test success alert'} severity={'success'} />
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
        <Autocomplete
          label={'Test select'}
          placeholder={'Test select'}
          icon={<LocationIcon />}
          options={[
            'Firefox',
            'Google Chrome',
            'Microsoft Edge',
            'Safari',
            'Opera',
          ]}
          onChange={() => {}}
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

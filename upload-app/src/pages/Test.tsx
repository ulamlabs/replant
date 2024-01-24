import { UnauthLayout } from 'modules/layout';
import { Button, Header, Input } from 'common/components';
import { LocationIcon } from 'common/icons/LocationIcon';

export const Test: React.FC = () => {
  return (
    <>
      <UnauthLayout>
        <>
          <h1 className='text-3xl font-bold underline text-bisque-400'>
            Hello, Fieldwork App!
          </h1>
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
        </>
      </UnauthLayout>
    </>
  );
};

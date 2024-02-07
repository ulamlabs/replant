import {
  Alert,
  Button,
  Header,
  Input,
  Loader,
  LoaderBox,
  Summary,
  SummaryItem,
} from 'common/components';
import { LocationIcon } from 'common/icons';
import { CountriesAutocomplete } from 'modules/countries';
import { UnauthLayout } from 'modules/layout';

export const ComponentTestpage: React.FC = () => {
  return (
    <UnauthLayout>
      <div className='flex flex-col gap-3'>
        <Alert text={'Test error alert'} severity={'error'} />
        <Alert text={'Test success alert'} severity={'success'} />
        <Button text={'Test big'} size={'big'} onClick={() => {}} />
        <Button text={'Test small'} size={'small'} onClick={() => {}} />
        <Button isLoading text={'Test big'} size={'big'} onClick={() => {}} />
        <Button
          isLoading
          text={'Test small'}
          size={'small'}
          onClick={() => {}}
        />
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
        <CountriesAutocomplete
          options={[
            { id: 1, name: 'Polska' },
            { id: 1, name: 'Czechy' },
            { id: 1, name: 'Chiny' },
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
        <Loader />
        <LoaderBox />
        <Summary>
          <SummaryItem>
            <span>label 1</span>
            <span>value 1</span>
          </SummaryItem>
          <SummaryItem>
            <span>label 2</span>
            <span>value 2</span>
          </SummaryItem>
          <SummaryItem>
            <span>label 3</span>
            <span>value 3</span>
          </SummaryItem>
        </Summary>
      </div>
    </UnauthLayout>
  );
};

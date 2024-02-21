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
import { Layout } from 'modules/layout';

export const ComponentTestpage: React.FC = () => {
  return (
    <Layout navigation>
      <div className='flex flex-col gap-3'>
        <Alert text={'Test error alert'} severity={'error'} />
        <Alert text={'Test success alert'} severity={'success'} />
        <Button text={'Test xl primary'} onClick={() => {}} />
        <Button isLoading text={'Test xl primary load'} onClick={() => {}} />
        <Button
          text={'Test xl secondary'}
          type='secondary'
          onClick={() => {}}
        />
        <Button size={'sm'} text={'Test sm primary'} onClick={() => {}} />
        <Button
          size={'sm'}
          text={'Test sm secondary'}
          type='secondary'
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
    </Layout>
  );
};

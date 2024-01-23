import { IntlProvider } from 'modules/intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'modules/query';
import { LocationIcon } from 'common/icons/LocationIcon';
import { Button, Header, Input } from 'common/components';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <h1 className='text-3xl font-bold underline text-bisque-400'>
                    Hello, Fieldwork App!
                  </h1>
                  <Button text={'Test big'} size={'BIG'} onClick={() => {}} />
                  <Button
                    text={'Test small'}
                    size={'SMALL'}
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
                  <Header
                    text={'Test header'}
                    onBack={() => {
                      console.log('test back');
                    }}
                  />
                  <Header text={'Test header without back'} />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

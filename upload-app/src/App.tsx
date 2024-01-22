import { IntlProvider } from 'modules/intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from './modules/query';
import { Button } from './common/components/Button';

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

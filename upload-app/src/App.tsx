import { IntlProvider } from './modules/intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from './modules/query';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <h1 className='text-3xl font-bold underline text-bisque-400'>
                  Hello world!
                </h1>
              }
            />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;
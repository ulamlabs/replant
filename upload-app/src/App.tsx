import { IntlProvider } from 'modules/intl';
import { QueryClientProvider } from 'modules/query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
                  Hello, Fieldwork App!
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

import { IntlProvider } from 'modules/intl';
import { ComponentTestpage, Home, Signup } from 'pages';
import { QueryClientProvider } from 'modules/query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/testpage' element={<ComponentTestpage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

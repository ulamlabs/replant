import { IntlProvider } from 'modules/intl';
import { ComponentTestpage, Home, Signup, SignupIntoOrganization } from 'pages';
import { QueryClientProvider } from 'modules/query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/testpage' element={<ComponentTestpage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup-org' element={<SignupIntoOrganization />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

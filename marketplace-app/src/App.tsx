import { IntlProvider } from 'modules/intl';
import { BasicLayout } from 'modules/layout/BasicLayout';
import { QueryClientProvider } from 'modules/query';
import {
  Home,
  Impact,
  LogIn,
  Marketplace,
  NotFoundPage,
  Planters,
  SignUpPage,
  SignUpSuccess,
  Sponsors,
} from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BasicLayout />}>
              <Route index element={<Home />} />
              <Route path='marketplace' element={<Marketplace />} />
              <Route path='sponsors' element={<Sponsors />} />
              <Route path='planters' element={<Planters />} />
              <Route path='impact' element={<Impact />} />
              <Route path='login' element={<LogIn />} />
              <Route path='signup' element={<SignUpPage />} />
              <Route path='signup-success' element={<SignUpSuccess />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

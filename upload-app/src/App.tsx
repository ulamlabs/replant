import { IntlProvider } from 'modules/intl';
import {
  ComponentTestpage,
  DashboardPage,
  LoginPage,
  NewSubmissionPage,
  Signup,
  SignupIntoOrganization,
  SubmissionsPage,
  UserPage,
} from 'pages';
import { QueryClientProvider } from 'modules/query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to='/dashboard' />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/new-submission' element={<NewSubmissionPage />} />
            <Route path='/testpage' element={<ComponentTestpage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup-org' element={<SignupIntoOrganization />} />
            <Route path='/submissions' element={<SubmissionsPage />} />
            <Route path='/user' element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

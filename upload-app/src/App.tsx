import { IntlProvider } from 'modules/intl';
import { useInitOffline } from 'modules/offline';
import { QueryClientProvider } from 'modules/query';
import { SnackbarManager } from 'modules/snackbar';
import {
  ComponentTestpage,
  DashboardPage,
  ForgotPasswordPage,
  InstallPage,
  LoginPage,
  NewPlantPage,
  NotFoundPage,
  PlantSubmissionsPage,
  ResetPasswordPage,
  SignupPage,
  UserPage,
} from 'pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  useInitOffline();

  return (
    <QueryClientProvider>
      <IntlProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to='/dashboard' />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/how-to-install' element={<InstallPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/new-plant' element={<NewPlantPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/testpage' element={<ComponentTestpage />} />
            <Route path='/signup-org' element={<SignupPage />} />
            <Route path='/submissions' element={<PlantSubmissionsPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
          <SnackbarManager />
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

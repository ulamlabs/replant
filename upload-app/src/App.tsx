import { IntlProvider } from 'modules/intl';
import { QueryClientProvider } from 'modules/query';
import {
  ComponentTestpage,
  DashboardPage,
  LoginPage,
  NewPlantPage,
  PlantSubmissionsPage,
  SignupPage,
  UserPage,
} from 'pages';
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
            <Route path='/new-plant' element={<NewPlantPage />} />
            <Route path='/testpage' element={<ComponentTestpage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/signup-org' element={<SignupPage />} />
            <Route path='/submissions' element={<PlantSubmissionsPage />} />
            <Route path='/user' element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

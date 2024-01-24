import { IntlProvider } from 'modules/intl';
import { ComponentTestpage } from 'pages';
import { UnauthLayout } from 'modules/layout/UnauthLayout';
import { QueryClientProvider } from 'modules/query';
import { Home } from 'pages/Home';
import { Signup } from 'pages/Signup';
import { Test } from 'pages/Test';
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
            <Route path='/' element={<Test />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

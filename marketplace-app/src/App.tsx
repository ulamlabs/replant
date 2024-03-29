import { Footer } from 'common/components/Footer';
import { IntlProvider } from 'modules/intl';
import { QueryClientProvider } from 'modules/query';
import { Gallery } from 'pages/Gallery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <IntlProvider>
        <div id='root-scroll' className='w-screen h-screen overflow-y-auto'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Gallery />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default App;

import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { Provider } from 'react-redux';
import ModalProvider from './contexts/modalContext';
import DrawerProvider from './contexts/drawerContext';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ModalProvider>
            <DrawerProvider>
              <AppRouter />
            </DrawerProvider>
          </ModalProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ChakraProvider } from './components/provider.tsx';
import './index.css';
import App from './App.tsx';
import { store } from './store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx'
import "./index.css"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>

        <App />


      </QueryClientProvider>
    </ReduxProvider>
  </StrictMode>,
)

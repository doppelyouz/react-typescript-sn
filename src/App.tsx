import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { store } from './store/store';

import Router from "./Router";
import Topbar from './components/topbar/Topbar';

import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Topbar />
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

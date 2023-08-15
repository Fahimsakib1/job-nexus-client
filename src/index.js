import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './Contexts/AuthProvider/AuthProvider';
import { Provider } from 'react-redux';
import store from './app/store';

//Tanstack Query config
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <AuthProvider>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </AuthProvider>
  // </React.StrictMode>





  <QueryClientProvider  client={queryClient}>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </QueryClientProvider>



);

reportWebVitals();

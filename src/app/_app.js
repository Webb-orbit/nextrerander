// pages/_app.js
"use client"
import { Provider } from 'react-redux';
import { store } from './store/store';

function MyApp({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default MyApp;
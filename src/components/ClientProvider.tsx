'use client';

import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from '../app/store';
import { setCart } from '../app/store/cartSlice';

interface LoadCartFromLocalStorageProps {
  children: ReactNode;
}

const LoadCartFromLocalStorage: React.FC<LoadCartFromLocalStorageProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      console.log('Loading cart from localStorage:', parsedCart);
      dispatch(setCart(parsedCart));
    }
  }, [dispatch]);

  return <>{children}</>;
};

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <LoadCartFromLocalStorage>
        {children}
      </LoadCartFromLocalStorage>
    </Provider>
  );
};

export default ClientProvider;
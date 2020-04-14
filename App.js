/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import ShopNavigator from './navigation/ShopNavigator';
import CartProvider from './store/reducers/cart';
import OrderProvider from './store/reducers/orders';
import ProductProvider from './store/reducers/products';
import UserProvider, { useUser } from './store/reducers/user';
import AuthScreen from './screens/user/AuthScreen';

import useAuth from './components/hooks/useAuth';

enableScreens();
const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <CartProvider>
      <OrderProvider>
        <ProductProvider>
          <UserProvider>
            <ErrorBoundary>
              <NavigationContainer>
                <Main />
              </NavigationContainer>
            </ErrorBoundary>
          </UserProvider>
        </ProductProvider>
      </OrderProvider>
    </CartProvider>
  );
}

const Main = () => {
  const { user } = useAuth();
  const [{ user: userData }, userDispatcher] = useUser();

  useEffect(() => {
    console.log('USER_SET');
    userDispatcher({ type: 'SET_USER', user });
  }, [user]);

  return userData ? <ShopNavigator /> : <AuthScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

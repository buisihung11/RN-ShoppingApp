import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import * as Font from 'expo-font';
import ShopNavigator from './navigation/ShopNavigator';
import CartProvider from './store/reducers/cart';
import OrderProvider from './store/reducers/orders';
import ProductProvider from './store/reducers/products';
import AuthScreen from './screens/user/AuthScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);

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
          <ErrorBoundary>
            <NavigationContainer>
              {isLogedIn ? <ShopNavigator /> : <AuthScreen />}
            </NavigationContainer>
          </ErrorBoundary>
        </ProductProvider>
      </OrderProvider>
    </CartProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

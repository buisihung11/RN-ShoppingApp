import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultNavOptions,
      headerRight: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={tintColor}
        />
      ),
    }}
  >
    <Stack.Screen
      component={ProductsOverviewScreen}
      name="ProductsOverview"
      options={(navData) => ({
        headerTitle: 'All Products',
        headerLeft: () => {
          return (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          );
        },
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              onPress={() => {
                navData.navigation.navigate('Cart');
              }}
            />
          </HeaderButtons>
        ),
      })}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={(navData) => ({
        headerTitle: navData.route.params?.productTitle || route.name,
      })}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerTitle: 'Your Cart' }}
    />
  </Stack.Navigator>
);

const OrdersNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultNavOptions,
      headerRight: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={tintColor}
        />
      ),
    }}
  >
    <Stack.Screen
      options={(navData) => ({
        headerTitle: 'Your Orders',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
      })}
      name="Orders"
      component={OrdersScreen}
    />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultNavOptions,
      headerRight: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={tintColor}
        />
      ),
    }}
  >
    <Stack.Screen
      options={(navData) => ({
        headerTitle: 'Your Products',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add"
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              onPress={() => {
                navData.navigation.navigate('EditProduct');
              }}
            />
          </HeaderButtons>
        ),
      })}
      name="UserProducts"
      component={UserProductsScreen}
    />
    <Stack.Screen
      options={(navData) => ({
        headerTitle: navData.route.params?.productId
          ? 'Edit Product'
          : 'Add Product',
      })}
      name="EditProduct"
      component={EditProductScreen}
    />
  </Stack.Navigator>
);

const ShopNavigator = () => (
  <Drawer.Navigator drawerContentOptions={{ activeTintColor: Colors.primary }}>
    <Drawer.Screen name="Products" component={ProductsNavigator} />
    <Drawer.Screen name="Orders" component={OrdersNavigator} />
    <Drawer.Screen name="Admin" component={AdminNavigator} />
  </Drawer.Navigator>
);

const Root = () => (
  <NavigationContainer>
    <ShopNavigator />
  </NavigationContainer>
);

export default Root;

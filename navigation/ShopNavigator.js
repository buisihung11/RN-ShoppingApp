import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultNavOptions,
      headerRight: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={tintColor}
        />
      ),
    }}
  >
    <Stack.Screen name="ProductsOverview" component={ProductsOverviewScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const OrdersNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultNavOptions,
      headerRight: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={tintColor}
        />
      ),
    }}
  >
    <Stack.Screen name="Orders" component={OrdersScreen} />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultNavOptions,
      headerRight: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={tintColor}
        />
      ),
    }}
  >
    <Stack.Screen name="UserProducts" component={UserProductsScreen} />
    <Stack.Screen name="EditProduct" component={EditProductScreen} />
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

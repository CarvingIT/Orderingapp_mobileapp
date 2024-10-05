/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/login/LoginScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import CustomDrawer from './components/customDrawer/CustomDrawer';
import ListofCategory from './screens/category/ListofCategory';
import ListofProduct from './screens/product/ListofProduct';
import ProductDetails from './screens/product/ProductDetails';
import ListofBuisnessProfile from './screens/business/ListofBuisnessProfile';
import ViewBuisnessDetails from './screens/business/ViewBuisnessDetails';
import AddBuisness from './screens/business/AddBuisness';
import Signup from './screens/signUp/SignupScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerTab = () => (
  <Drawer.Navigator
    initialRouteName="Dashbord"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Dashbord" component={DashboardScreen} />
    <Drawer.Screen name="ListOfCategories" component={ListofCategory} />
    {/* <Drawer.Screen name="ListOfProducts" component={ListofProduct} /> */}
    <Drawer.Screen name="ListOfBusiness" component={ListofBuisnessProfile} />
  </Drawer.Navigator>
);

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{gestureEnabled: false, headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signUp" component={Signup} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="AddBuisness" component={AddBuisness} />
        <Stack.Screen name="ListOfProducts" component={ListofProduct} />

        <Stack.Screen
          name="ViewBuisnessDetails"
          component={ViewBuisnessDetails}
        />
        <Stack.Screen name="drawerTab" component={DrawerTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;

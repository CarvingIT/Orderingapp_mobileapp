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
import AnnouncementsScreen from './screens/AnnouncementsScreen/AnnouncementsScreen';
import AnnouncementDetailScreen from './screens/AnnouncementDetailScreen/AnnouncementDetailScreen';

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
import MyBuisnessess from './screens/business/MyBuisnessess';
import MyProducts from './screens/product/MyProducts';
import AddProducts from './screens/product/AddProducts';
import CategoryProductDetails from './screens/product/CategoryProductsDetails';
import ForgotPassword from './screens/login/ForgotPassword';
import ResetPassword from './screens/login/ResetPassword';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerTab = () => (
  <Drawer.Navigator
    initialRouteName="Dashbord" // changed from Login to dashboard
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Dashbord" component={DashboardScreen} />
    <Drawer.Screen name="ListOfCategories" component={ListofCategory} />
    {/* <Drawer.Screen name="ListOfProducts" component={ListofProduct} /> */}
    <Drawer.Screen name="ListOfBusiness" component={ListofBuisnessProfile} />
    <Drawer.Screen name="MyBuisnessess" component={MyBuisnessess} />
    <Drawer.Screen name="MyProducts" component={MyProducts} />


  </Drawer.Navigator>
);

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="drawerTab"
        screenOptions={{gestureEnabled: false, headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signUp" component={Signup} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="AddBuisness" component={AddBuisness} />
        <Stack.Screen name="ListOfProducts" component={ListofProduct} />
        {/* <Stack.Screen name="MyBuisnessess" component={MyBuisnessess} /> */}
        {/* <Stack.Screen name="MyProducts" component={MyProducts} /> */}
        <Stack.Screen name="AddProducts" component={AddProducts} />
        <Stack.Screen name="CategoryProductDetails" component={CategoryProductDetails} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
        <Stack.Screen name="Announcements" component={AnnouncementsScreen} options={{ headerShown: true, title: 'Announcements' }} />
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} options={{ headerShown: true, title: 'Announcement Details' }} />
        


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

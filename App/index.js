/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


import LoginScreen from './screens/login/LoginScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen/AnnouncementsScreen';
import AnnouncementDetailScreen from './screens/AnnouncementDetailScreen/AnnouncementDetailScreen';
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

// --- Drawer Navigator ( main app content after login) ---
export const DrawerTab = () => (
  <Drawer.Navigator
    initialRouteName="Dashbord"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Dashbord" component={DashboardScreen} />
    <Drawer.Screen name="ListOfCategories" component={ListofCategory} />
    <Drawer.Screen name="ListOfBusiness" component={ListofBuisnessProfile} />
    <Drawer.Screen name="MyBuisnessess" component={MyBuisnessess} />
    <Drawer.Screen name="MyProducts" component={MyProducts} />
  </Drawer.Navigator>
);

// --- Main App Navigator (Root Stack) ---
function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ gestureEnabled: false, headerShown: false }}>

        {/* Screens available BEFORE the user logs in */}
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signUp" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        
        {/* The DrawerTab is the main screen AFTER login. */}
        <Stack.Screen name="drawerTab" component={DrawerTab} />

        {/* Other screens that can be navigated to from anywhere */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="AddBuisness" component={AddBuisness} />
        <Stack.Screen name="ListOfProducts" component={ListofProduct} />
        <Stack.Screen name="AddProducts" component={AddProducts} />
        <Stack.Screen name="CategoryProductDetails" component={CategoryProductDetails} />
        <Stack.Screen 
            name="Announcements" 
            component={AnnouncementsScreen} 
            options={{ headerShown: true, title: 'Announcements' }} 
        />
        <Stack.Screen 
            name="AnnouncementDetail" 
            component={AnnouncementDetailScreen} 
            options={{ headerShown: true, title: 'Announcement Details' }} 
        />
        <Stack.Screen
          name="ViewBuisnessDetails"
          component={ViewBuisnessDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;

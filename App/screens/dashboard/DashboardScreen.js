import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Header from '../../components/header/Header';
import {Button, Icon} from '@rneui/base';
import colors from '../../resource/colors';
import styles from './DashboardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SellerRequestAPI } from '../../api/api';
import Toast from 'react-native-simple-toast';

function DashboardScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [user_id, setUserId] = useState('');
  const [sellerRequestText, setSellerRequestText] = useState('I want to become a Seller');



  const RequestSeller = async () => {
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('user_seller_request',user_id);

    SellerRequestAPI(token,formData)
      .then(response => {
          if (response.status == 404) {
            throw new Error('seller not found.');
          }
        return response.json();
      })
      .then(async data => {
        console.log("Data for seller request:",data.Message)
        setSellerRequestText(data.Message);
        Toast.show(JSON.stringify(error), Toast.SHORT);
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };


  useEffect(() => {
 
    async function fetchData() {
      const UserDetails = await AsyncStorage.getItem('userDetails');
      if (UserDetails !== null) {
        setUserName(JSON.parse(UserDetails).name);
        setUserId(JSON.parse(UserDetails).id);
      }
      const role = await AsyncStorage.getItem('userRole');
      if (role !== null) {
        setUserRole(role);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        menuIcon
        isNotification
        navigation={navigation}
        title="Dashboard"
      />
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <Button
            icon={
              <Icon
                type="font-awesome"
                name="user-circle-o"
                size={15}
                color={colors.buttonColor}
              />
            }
            title={userName}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../resource/images/cow.jpg')}
          />
        </View>
        <View style={styles.container}>
          {userRole != 'seller' ? (
            <Button
              title={sellerRequestText}
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => RequestSeller()}
            />
          ) : (
            ''
          )}
          <Button
            title="List of Categories"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('ListOfCategories')}
          />
          {userRole=='seller' &&
          <Button
            title="My Buisnessess"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('MyBuisnessess')}
          />}
          {userRole=='seller' &&
          <Button
            title="My Products"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('MyProducts')}
          />}
          {userRole == 'seller' ?  (
            <Button
              title="List of Businesses"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('ListOfBusiness')}
            />
            
          ) : (
            ''
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardScreen;

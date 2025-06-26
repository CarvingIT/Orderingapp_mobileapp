import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../../components/header/Header'; 
import {Button, Icon} from '@rneui/base';
import colors from '../../resource/colors';
import styles from './DashboardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SellerRequestAPI, ListofAnnouncementsAPI} from '../../api/api';
import Toast from 'react-native-simple-toast';
import {useFocusEffect, useNavigation} from '@react-navigation/native'; 

function DashboardScreen() { 
  
  const navigation = useNavigation(); 

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [user_id, setUserId] = useState('');
  const [sellerRequestText, setSellerRequestText] = useState(
    'I want to become a Seller',
  );
  const [userToken, setUserToken] = useState(null);

  const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [announcementsError, setAnnouncementsError] = useState(null);

  const RequestSeller = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Toast.show('Authentication required to request seller status.', Toast.LONG);
      return;
    }

    const formData = new FormData();
    formData.append('user_seller_request', user_id);

    try {
      const response = await SellerRequestAPI(token, formData);

      console.log('Data for seller request:', response.Message);
      setSellerRequestText(response.Message || 'Request Sent');

      Toast.show(response.Message || 'Seller request processed.', Toast.SHORT);
    } catch (error) {
      console.error('Seller Request API Error:', error);
      Toast.show(error.message || 'Failed to send seller request.', Toast.LONG);
    }
  };

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
    } catch (e) {
      console.error('Failed to load token from AsyncStorage for Dashboard:', e);
    }
  };

  const fetchAnnouncementsCount = async () => {
    if (!userToken) {
      setLoadingAnnouncements(false);
      return;
    }

    setLoadingAnnouncements(true);
    setAnnouncementsError(null);
    try {
      const data = await ListofAnnouncementsAPI(userToken);
      const unreadCount = data.events ? data.events.filter(ann => !ann.isRead).length : 0;
      setUnreadAnnouncementsCount(unreadCount);
    } catch (err) {
      console.error('API Error fetching announcement count:', err);
      setUnreadAnnouncementsCount(0);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadToken();
      const UserDetails = await AsyncStorage.getItem('userDetails');
      if (UserDetails !== null) {
        const parsedDetails = JSON.parse(UserDetails);
        setUserName(parsedDetails.name || '');
        setUserId(parsedDetails.id || '');
      }
      const role = await AsyncStorage.getItem('userRole');
      if (role !== null) {
        setUserRole(role || '');
      }
    }
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userToken) {
        fetchAnnouncementsCount();
      }
      return () => {
        
      };
    }, [userToken])
  );

  const handleAnnouncementsPress = () => {
    console.log('Bell icon pressed!');
    navigation.navigate('Announcements');
  };

  return (
    <View style={{flex: 1}}>
      <Header
        menuIcon
        isNotification={true}
        navigation={navigation} 
        title="Dashboard"
      />

      <TouchableOpacity
        style={dashboardSpecificStyles.announcementBell}
        onPress={handleAnnouncementsPress}>
        <Icon name="bell" type="material-community" size={30} color="#333" />
        {loadingAnnouncements ? (
          <ActivityIndicator
            size="small"
            color="red"
            style={dashboardSpecificStyles.badge}
          />
        ) : (
          unreadAnnouncementsCount > 0 ? (
            <View style={dashboardSpecificStyles.badge}>
              <Text style={dashboardSpecificStyles.badgeText}>
                {unreadAnnouncementsCount}
              </Text>
            </View>
          ) : (
            null 
          )
        )}
      </TouchableOpacity>

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
            title={String(userName)}
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
              title={String(sellerRequestText)}
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => RequestSeller()}
            />
          ) : (
            null
          )}
          <Button
            title="List of Categories"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('ListOfCategories')}
          />
          {userRole == 'seller' && (
            <Button
              title="My Buisnessess"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('MyBuisnessess')}
            />
          )}
          {userRole == 'seller' && (
            <Button
              title="My Products"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('MyProducts')}
            />
          )}
          {userRole == 'seller' ? (
            <Button
              title="List of Businesses"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('ListOfBusiness')}
            />
          ) : (
            null
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardScreen;

const dashboardSpecificStyles = StyleSheet.create({
  announcementBell: {
    position: 'absolute',
    top: 10,
    right: 15,
    padding: 5,
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
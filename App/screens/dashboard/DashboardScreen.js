import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView,TouchableOpacity,StyleSheet,} from 'react-native';
import Header from '../../components/header/Header';
import {Button, Icon} from '@rneui/base';
import colors from '../../resource/colors';
import styles from './DashboardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SellerRequestAPI } from '../../api/api';
import Toast from 'react-native-simple-toast';

// --- NEW: Dummy data for unread count ---
// This sampleAnnouncements array should be the same as the one in AnnouncementsScreen.js
const sampleAnnouncements = [
  { id: '1', title: 'Important System Maintenance', content: 'Our services will be undergoing scheduled maintenance...', date: '2025-06-05T10:00:00Z', isRead: false },
  { id: '2', title: 'New Feature: Dark Mode Available!', content: 'We\'re excited to announce that Dark Mode...', date: '2025-06-03T15:30:00Z', isRead: true },
  { id: '3', title: 'Privacy Policy Update', content: 'Our privacy policy has been updated...', date: '2025-05-28T08:45:00Z', isRead: false },
];
// --- END NEW DUMMY DATA ---

function DashboardScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [user_id, setUserId] = useState('');
  const [sellerRequestText, setSellerRequestText] = useState('I want to become a Seller');

 // --- NEW STATE: For unread announcements count ---
 const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0);

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
    // --- NEW: Populate unread announcements count from dummy data ---
    const count = sampleAnnouncements.filter(ann => !ann.isRead).length;
    setUnreadAnnouncementsCount(count);
  }, []);

   // --- NEW: Function to handle pressing the announcement bell ---
   const handleAnnouncementsPress = () => {
    navigation.navigate('Announcements'); // Navigate to the AnnouncementsScreen
  };
  // --- END NEW FUNCTION ---

  return (
    <View style={{flex: 1}}>
      <Header
        menuIcon
        isNotification
        navigation={navigation}
        title="Dashboard"
      />

      {/* --- NEW: Announcement Bell Icon with Badge --- */}
      {/* Placed using absolute positioning */}
      <TouchableOpacity
        style={dashboardSpecificStyles.announcementBell} 
        onPress={handleAnnouncementsPress}
      >
        {/* Using @rneui/base Icon. */}
        <Icon name="bell" type="material-community" size={30} color="#333" />
        {unreadAnnouncementsCount > 0 && (
          <View style={dashboardSpecificStyles.badge}>
            <Text style={dashboardSpecificStyles.badgeText}>{unreadAnnouncementsCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      {/* --- END NEW BELL ICON --- */}

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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});


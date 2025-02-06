import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image, Linking} from 'react-native';
import styles from './CustomDrawerStyle';
import Resource from '../../resource';
import colors from '../../resource/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Dashbord');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  useEffect(() => {
    async function fetchData() {
      // const UserData = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('userRole');
      if (role !== null) {
        setUserRole(role)
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.closeIconView}>
        <Icon
          name="cross"
          type="entypo"
          onPress={() => navigation.closeDrawer()}
        />
      </View>
      {/* <View style={styles.profileView}>
        <Image source={Resource.tmp} style={styles.profilePic} />
        <Text style={styles.nameLabel}>{userName}</Text>
        <Icon
          name="caretdown"
          type="ant-design"
          size={15}
          style={{marginStart: 5}}
        />
      </View> */}
      <View style={styles.tabView}>
        <TouchableOpacity
          style={[styles.tab, activeTab == 'Dashbord' && styles.activeTab]}
          onPress={() => {
            navigateToScreen('Dashbord');
            setActiveTab('Dashbord');
          }}>
          <Text
            style={[
              {color: activeTab == 'Dashbord' ? colors.white : colors.black},
              styles.tabLabel,
            ]}>
            Dashbord
          </Text>
        </TouchableOpacity>
        {/* {userRole != 'seller' && <TouchableOpacity
          style={[styles.tab, activeTab == 'RequestForSeller' && styles.activeTab]}
          onPress={() => {
            navigateToScreen('RequestForSeller');
            setActiveTab('RequestForSeller');
          }}>
          <Text
            style={[
              {color: activeTab == 'RequestForSeller' ? colors.white : colors.black},
              styles.tabLabel,
            ]}>
            Request For Seller
          </Text>
        </TouchableOpacity>} */}
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab == 'ListOfCategories' && styles.activeTab,
          ]}
          onPress={() => {
            navigateToScreen('ListOfCategories');
            setActiveTab('ListOfCategories');
          }}>
          <Text
            style={[
              {
                color:
                  activeTab == 'ListOfCategories' ? colors.white : colors.black,
              },
              styles.tabLabel,
            ]}>
            List of categories
          </Text>
        </TouchableOpacity>
      
        {/* <TouchableOpacity
          style={[
            styles.tab,
            activeTab == 'ListOfProducts' && styles.activeTab,
          ]}
          onPress={() => {
            navigateToScreen('ListOfProducts');
            setActiveTab('ListOfProducts');
          }}>
          <Text
            style={[
              {
                color:
                  activeTab == 'ListOfProducts' ? colors.white : colors.black,
              },
              styles.tabLabel,
            ]}>
            List of products
          </Text>
        </TouchableOpacity> */}
        {userRole == 'seller' && <TouchableOpacity
          style={[
            styles.tab,
            activeTab == 'ListOfBusiness' && styles.activeTab,
          ]}
          onPress={() => {
            navigateToScreen('ListOfBusiness');
            setActiveTab('ListOfBusiness');
          }}>
          <Text
            style={[
              {
                color:
                  activeTab == 'ListOfBusiness' ? colors.white : colors.black,
              },
              styles.tabLabel,
            ]}>
            List of Business
          </Text>
        </TouchableOpacity>
        }
        {userRole == 'seller' && <TouchableOpacity
          style={[
            styles.tab,
            activeTab == 'MyBuisnessess' && styles.activeTab,
          ]}
          onPress={() => {
            navigateToScreen('MyBuisnessess');
            setActiveTab('MyBuisnessess');
          }}>
          <Text
            style={[
              {
                color:
                  activeTab == 'MyBuisnessess' ? colors.white : colors.black,
              },
              styles.tabLabel,
            ]}>
            My Buisnessess
          </Text>
        </TouchableOpacity>
        }
        {userRole == 'seller' && <TouchableOpacity
          style={[
            styles.tab,
            activeTab == 'MyProducts' && styles.activeTab,
          ]}
          onPress={() => {
            navigateToScreen('MyProducts');
            setActiveTab('MyProducts');
          }}>
          <Text
            style={[
              {
                color:
                  activeTab == 'MyProducts' ? colors.white : colors.black,
              },
              styles.tabLabel,
            ]}>
            My Products
          </Text>
        </TouchableOpacity>
        }
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            AsyncStorage.clear();
            navigateToScreen('login');
          }}>
          <Text style={[styles.tabLabel, {color: colors.black}]}>LogOut</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab == 'Question&Answer' && styles.activeTab,
          ]}
          onPress={() => {
            Linking.openURL(
                  `https://orderingapp.carvingit.com/product-query`,
                );
            // navigateToScreen('Question&Answer');
            setActiveTab('Question&Answer');
          }}>
          <Text
            style={[
              {
                color:
                  activeTab == 'Question&Answer' ? colors.white : colors.black,
              },
              styles.tabLabel,
            ]}>
            Question & Answer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

import {Icon, Text} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../resource/colors';
import scaling from '../../resource/normalize';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header/Header';
import {MyBuisnessessAPI, RemoveBuisnessAPI} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyBuisnessess({navigation}) {
  const [sellers, setsellers] = useState([]);
//   const [user_id, setUser_id] = useState('');

  const MyBuisnessess = async () => {
    const token = await AsyncStorage.getItem('token');

    await MyBuisnessessAPI(token)
      .then(response => {
        if (!response.ok) {
          if (response.status == 404) {
            throw new Error('Product not found.');
          }
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        setsellers(data.sellers);
        handleDelete();
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  useEffect(() => {
    MyBuisnessess();
    const willFocusSubscription = navigation.addListener('focus', () => {
        MyBuisnessess();
    });
    // const fetchData = async () => {
    //   const user_details = await AsyncStorage.getItem('userDetails');
    //   setUser_id(JSON.parse(user_details)?.id);
    // };
    // fetchData();
    return willFocusSubscription;
  }, []);

  const handleDelete = async id => {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('seller_id', id);
    await RemoveBuisnessAPI(token,formData)
      .then(response => {
        if (!response.ok) {
          if (response.status == 404) {
            throw new Error('Product not found.');
          }
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        MyBuisnessess();
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  return (
    <View style={style.containerMain}>
      <Header
        menuIcon
        isAdd
        handleAdd={() => navigation.navigate('AddBuisness')}
        title=" My Buisnesses"
        navigation={navigation}
      />
      <ScrollView>
        {sellers.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('ViewBuisnessDetails', item.id)}>
            <View style={style.container}>
              <View style={{width: scaling.widthScale(260)}}>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Buisness Name:</Text>
                  {item.business_name}
                </Text>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Address:</Text>
                  {item.address}
                </Text>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Description:</Text>
                  {item.description}
                </Text>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Buisness Email:</Text>
                  {item.business_email}
                </Text>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Buisness Phone:</Text>
                  {item.business_phone}
                </Text>
              </View>
              <View>
                  <Icon
                    name="trash-2"
                    type="feather"
                    onPress={() => handleDelete(item.id)}
                  />
                
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    margin: 10,
  },
  container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderWidth: 1,
  },
  text: {
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  isAdd: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
  },
});

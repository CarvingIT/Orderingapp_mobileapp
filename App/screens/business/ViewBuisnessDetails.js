import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../../resource/colors';
import Header from '../../components/header/Header';
import Toast from 'react-native-simple-toast';
import {SaveSellerBuisness, ViewBuisnessDetailsAPI} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input} from '@rneui/base';
import {ScreenStackHeaderSubview} from 'react-native-screens';

export default function ViewBuisnessDetails({navigation, route}) {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [mainUserId, setMainUserId] = useState('');

  const handleSubmit = async () => {
    console.log('Reached step 1');
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('business_name', businessName);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('business_email', businessEmail);
    formData.append('business_phone', businessPhone);
    formData.append('seller_id',sellerId);

    console.log('Reached step 2');
    SaveSellerBuisness(token, formData)
      .then(response => {
        console.log('response >>', response);
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        console.log(data);
        Toast.show('Updated sucessfully', Toast.SHORT);
        navigation.goBack();
      })
      .catch(async error => {
        console.log(JSON.stringify(error));
      });
  };

  const BuisnessDetails = async () => {
    const token = await AsyncStorage.getItem('token');
    await ViewBuisnessDetailsAPI(token, route.params)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        console.log('data >>', data);
        setBusinessName(data.seller.business_name);
        setAddress(data.seller.address);
        setDescription(data.seller.description);
        setBusinessEmail(data.seller.business_email);
        setBusinessPhone(data.seller.business_phone);
        setUserId(data.seller.user_id);
        setSellerId(data.seller.id);
      })
      .catch(async error => {
        Toast.show('Error', Toast.SHORT);
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('userDetails');
      console.log('userDetails', JSON.parse(data).id);
      setMainUserId(JSON.parse(data).id);
      BuisnessDetails();
    }
    fetchData();
  }, []);

  return (
    <View style={style.containerMain}>
      <Header
        isBackIcon
        isNotification
        title="Buisness Details"
        navigation={navigation}
      />

      <View>
        <ScrollView contentContainerStyle={style.container}>
          <View style={style.form}>
            <Text style={style.label}>Buisness Name:</Text>
            <TextInput
              editable={userId == mainUserId}
              style={style.input}
              value={businessName}
              onChangeText={text => setBusinessName(text)}
              placeholder="Enter the Buisness Name"
            />
            <Text style={style.label}> Address:</Text>
            <TextInput
              editable={userId == mainUserId}
              style={style.input}
              value={address}
              onChangeText={text => setAddress(text)}
              placeholder="Enter the Address"
            />
            <Text style={style.label}> Description:</Text>
            <TextInput
              editable={userId == mainUserId}
              style={style.input}
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder="Enter the Description"
            />
            <Text style={style.label}> Buisness Email:</Text>
            <TextInput
              editable={userId == mainUserId}
              style={style.input}
              value={businessEmail}
              onChangeText={text => setBusinessEmail(text)}
              placeholder="Enter the Buisness Email"
            />
            <Text style={style.label}> Buisness Phone:</Text>
            <TextInput
              editable={userId == mainUserId}
              style={style.input}
              value={businessPhone}
              onChangeText={text => setBusinessPhone(text)}
              placeholder="Enter the Buisness Phone"
            />
            {userId == mainUserId ? (
              <Button title="Submit" onPress={() => handleSubmit()} />
            ) : (
              ''
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontWeight: '500',
    color: colors.black,
  },
  form: {
    padding: 20,

    color: colors.black,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: colors.black,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.black,
  },
});

import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '../../resource/colors';
import {SaveSellerBuisness} from '../../api/api';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddBuisness({navigation}) {
  const [buisnessname, setBuisnessName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [buisnessemail, setBuisnessEmail] = useState('');
  const [buisnessphone, setBuisnessPhone] = useState('');

  const handleSubmit = async () => {
    Toast.show('Added sucessfully', Toast.SHORT);
    const token = await AsyncStorage.getItem('token');
    
    
    const formData = new FormData();
    formData.append('business_name', buisnessname);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('business_email', buisnessemail);
    formData.append('business_phone', buisnessphone);

    SaveSellerBuisness(token, formData)
      .then(response => {
        console.log("response >>",response);
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        Toast.show('Added sucessfully', Toast.SHORT);
        navigation.goBack();
      })
      .catch(async error => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <View>
      <Header isBackIcon title="Add Buisness" navigation={navigation} />
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.form}>
          <Text style={style.label}>Buisness Name:</Text>
          <TextInput
            style={style.input}
            value={buisnessname}
            onChangeText={text => setBuisnessName(text)}
            placeholder="Enter the Buisness Name"
            placeholderTextColor={colors.black}
          />
          <Text style={style.label}> Address:</Text>
          <TextInput
            style={style.input}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Enter the Address"
            placeholderTextColor={colors.black}
          />
          <Text style={style.label}> Description:</Text>
          <TextInput
            style={style.input}
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder="Enter the Description"
            placeholderTextColor={colors.black}
          />
          <Text style={style.label}> Buisness Email:</Text>
          <TextInput
            style={style.input}
            value={buisnessemail}
            onChangeText={text => setBuisnessEmail(text)}
            placeholder="Enter the Buisness Email"
            placeholderTextColor={colors.black}
          />
          <Text style={style.label}> Buisness Phone:</Text>
          <TextInput
            style={style.input}
            value={buisnessphone}
            onChangeText={text => setBuisnessPhone(text)}
            placeholder="Enter the Buisness Phone"
            placeholderTextColor={colors.black}
          />
          <Button title="Submit" onPress={()=>handleSubmit()} />
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
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

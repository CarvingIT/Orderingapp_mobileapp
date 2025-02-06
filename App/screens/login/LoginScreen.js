import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './LoginStyle';
import {Icon, Input, Button, CheckBox} from '@rneui/base';
import colors from '../../resource/colors';
import Resource from '../../resource/index';
import {LoginAPI} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import scaling from '../../resource/normalize';


function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleLogin = async () => {
    var formData = new FormData();

    // Add key/value pairs to the FormData object
    formData.append('email', email);
    formData.append('password', password);

    await LoginAPI(formData)
      .then(response => {
        console.log('Login response:', response);
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(async data => {
        console.log('login data is okay', data);
        // Handle successful login
        await AsyncStorage.setItem('token', data.token);
        if (data.role_names.length != 0) {
          await AsyncStorage.setItem('userRole', data.role_names[0]);
        }
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(data.user_details),
        );
        console.log('Login data:', data.user_details);
        navigation.navigate('drawerTab', {screen: 'Dashbord'});
      })
      .catch(async error => {
        console.log(JSON.stringify(error));
        // Toast.show('Error', Toast.SHORT);
      });
  };

  useEffect(() => {
    async function fetchData() {
      const Token = await AsyncStorage.getItem('token');
      if (Token != null) {
        navigation.navigate('drawerTab', {screen: 'Dashbord'});
      }
    }
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Image
          style={styles.image1}
          source={require('../../resource/images/shekhar.jpg')}
        />
        <Image
          style={styles.image2}
          source={require('../../resource/images/bharatmata.jpg')}
        /> */}
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../../resource/images/main.jpg')}
          />
          {/* <Text style={styles.text}>II ॐ सुरभ्यो नम: II </Text> */}
        </View>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Email</Text>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            errorStyle={{margin: 0}}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            errorStyle={{margin: 0}}
            value={password}
            secureTextEntry={passwordVisible}
            onChangeText={text => setPassword(text)}
            rightIcon={
              <Icon
                color={colors.black}
                name={!passwordVisible ? 'eye' : 'eye-with-line'}
                type="entypo"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
          <View
            style={{alignItems: 'flex-end', width: scaling.widthScale(260)}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forget}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view}>
            <CheckBox
              containerStyle={{padding: 0, marginStart: 0}}
              checked={isRemember}
              title="Remember Me"
              checkedColor={colors.buttonColor}
              onPress={() => setIsRemember(!isRemember)}
            />
          </View>

          <Button
            title="LogIn"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => handleLogin()}
          />
          <Text style={styles.text}>
            Don’t have an account ?{' '}
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate('signUp')}>
              Register here
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;

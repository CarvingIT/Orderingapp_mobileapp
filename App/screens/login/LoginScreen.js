import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, CheckBox, Icon } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from './LoginStyle';
import colors from '../../resource/colors';
import { LoginAPI } from '../../api/api';
import scaling from '../../resource/normalize';


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  
  const handleLogin = async () => {
    console.log("handleLogin function started. Attempting to log in with email:", email);

    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await LoginAPI(formData);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Login API failed with status: ${response.status}`, errorText);
        throw new Error('Login failed. Check server response in logs.');
      }

      const data = await response.json();
      console.log('Login successful. API data received:', data);

      
      await AsyncStorage.setItem('userToken', data.token);

      if (data.role_names && data.role_names.length > 0) {
        await AsyncStorage.setItem('userRole', data.role_names[0]);
      }
      if (data.user_details) {
        await AsyncStorage.setItem('userDetails', JSON.stringify(data.user_details));
      }

      console.log('Token and user details saved. Navigating to dashboard...');
      // Using navigation.replace to prevent the user from going back to the login screen.
      navigation.replace('drawerTab', { screen: 'Dashbord' });

    } catch (error) {
      console.error('An error occurred during the login process:', error);
      // Alert.alert('Login Error', 'Could not log in. Please check your credentials and try again.');
    }
  };

  //checking if already logged in.
  useEffect(() => {
    async function fetchData() {
      const Token = await AsyncStorage.getItem('userToken'); 
      if (Token != null) {
        navigation.replace('drawerTab', { screen: 'Dashbord' });
      }
    }
    fetchData();
  }, []);

  // The return statement contains the JSX to render the component.
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../../resource/images/main.jpg')}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Email</Text>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            errorStyle={{ margin: 0 }}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            errorStyle={{ margin: 0 }}
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
            style={{ alignItems: 'flex-end', width: scaling.widthScale(260) }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forget}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view}>
            <CheckBox
              containerStyle={{ padding: 0, marginStart: 0 }}
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
            onPress={handleLogin} 
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

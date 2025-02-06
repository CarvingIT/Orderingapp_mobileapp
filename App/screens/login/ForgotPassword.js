import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import colors from '../../resource/colors';
import Resource from '../../resource/index';
import {ForgotPasswordAPI} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');

  const handleForget = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    await ForgotPasswordAPI(formData)
      .then(response => {
        console.log('response', response);
        if (!response.ok) {
          if (response.status == 404) {
            throw new Error('Email not found.');
          }
         Alert.alert('Error','This email is not registered.');
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        Alert.alert('Success', 'Password reset link sent to your email');
        setEmail('');
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.instructions}>
        Enter your registered email below to receive password reset
        instructions.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleForget}>
        <Text style={styles.buttonText}>Email Password Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.black,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: colors.black,

  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    alignSelf: 'center',
  },
  linkText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
});

export default ForgotPassword;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
//   import PhoneNumberInput from '../Components/PhoneNumberInput/PhoneNumberInput';
import {SignupAPI} from '../../api/api';
import {Button, CheckBox, Icon, Input} from '@rneui/base';
import colors from '../../resource/colors';
import scaling from '../../resource/normalize';
import Toast from 'react-native-simple-toast';

export default function Signup({navigation}) {
  const [Name, setName] = useState('');
  // const [Mobilenum, setMobilenum] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ConfirmpasswordError, setConfirmPasswordError] = useState('');

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorcount = 0;
    if (Email.length == 0) {
      setEmailError('please enter email');
      errorcount++;
      // } else if (!emailRegex.test(email)) {
      // setEmailError("please enter valid email");
      //errorcount++;
    }
    if (Password.length == 0) {
      setPasswordError('please enter password');
      errorcount++;
    } else if (Password.length < 7) {
      setPasswordError('password must be greater than 8 character');
      errorcount++;
    }
    if (errorcount == 0) {
      const formData = new FormData();
      formData.append('name', Name);
      //   formData.append('mobile', Mobilenum);
      formData.append('email', Email);
      formData.append('password', Password);

      await SignupAPI(formData)
        .then(response => {
          if (!response.ok) {
            throw new Error('Login failed');
          }
          return response.json();
        })
        .then(async data => {
          // await AsyncStorage.setItem('token',data.token)
          Toast.show('Signup Successfully', Toast.SHORT);

          navigation.navigate('login');
        })
        .catch(async error => {
          console.log(JSON.stringify(error));
        });
    }
  };

  return (
    <ScrollView>
      <Text style={style.heading}>Register</Text>
      <View style={style.imgContainer}>
        <Image
          style={style.image}
          source={require('../../resource/images/cow.jpg')}
        />
      </View>
      <View style={style.container}>
        <View style={style.form}>
          <Text style={style.label}> Name </Text>
          <TextInput style={style.input} value={Name} onChangeText={setName} />
          {/* <Text style={style.label}> Mobile Number </Text>
            <TextInput
              style={style.input}
              value={Mobilenum}
              onChangeText={setMobilenum}
            /> */}
          <Text style={style.label}>Email</Text>
          <TextInput
            style={style.input}
            value={Email}
            onChangeText={setEmail}
          />
          <Text style={style.label}>Password</Text>
          <Input
            containerStyle={style.inputContainer}
            inputContainerStyle={style.input}
            style={style.text}
            errorStyle={{margin: 0}}
            value={Password}
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
          <Text>{passwordError}</Text>
          <Text style={style.text}>
            Password should contain -{'\n'}
            1. Minimum 8 characters.{'\n'}
            2. Atleast one upper case letter.{'\n'}
            3. Atleast one special character.
          </Text>

          <Text style={style.label}>Confirm Password</Text>
          <Input
            containerStyle={style.inputContainer}
            inputContainerStyle={style.input}
            errorStyle={{margin: 0}}
            value={ConfirmPassword}
            secureTextEntry={passwordVisible}
            onChangeText={text => setConfirmPassword(text)}
            rightIcon={
              <Icon
                color={colors.black}
                name={!passwordVisible ? 'eye' : 'eye-with-line'}
                type="entypo"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
          <Text>{ConfirmpasswordError}</Text>

          <Button
            title="Signup"
            titleStyle={style.buttonTitle}
            buttonStyle={style.button}
            onPress={() => handleSignup()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    margin: 15,
    backgroundColor: '#f5f5f5',
  },
  image:{
    width:150,
    height:200,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    color: colors.black,
  },
  text: {
    color: colors.black,
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
  buttonTitle: {
    color: colors.white,
    fontSize: scaling.normalize(14),
  },
  button: {
    backgroundColor: colors.buttonColor,
    marginTop: scaling.heightScale(15),
    width: scaling.widthScale(260),
    borderRadius: 5,
  },
  inputContainer: {paddingHorizontal: 0, width: scaling.widthScale(260)},
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: scaling.heightScale(4),
    borderColor: colors.line,
  },
});

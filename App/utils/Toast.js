import Toast from 'react-native-toast-message';

const ShowToast = (type1, message1, message2) => {
  Toast.show({
    type: type1,
    text1: message1,
    text2: message2,
  });
};

export default ShowToast;
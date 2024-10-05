import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import scaling from '../../resource/normalize';

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical:10,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  button: {
    marginTop: scaling.heightScale(15),
    width: scaling.widthScale(300),
    borderColor: colors.buttonColor,
    backgroundColor: colors.white,
    borderRadius: scaling.heightScale(25),
    borderWidth:1
  },
  buttonTitle: {
    color: colors.buttonColor,
    fontSize: scaling.normalize(14),
    marginHorizontal: scaling.widthScale(10)
  },
  image:{
    width:300,
    height:400,
  },
});

export default styles;

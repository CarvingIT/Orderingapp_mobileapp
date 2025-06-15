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
  announcementBell: {
    position: 'absolute', 
    top: 10, 
    right: 15,
    padding: 5,
    zIndex: 10, 
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default styles;

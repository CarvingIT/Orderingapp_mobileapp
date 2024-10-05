import { StyleSheet } from 'react-native';
import scaling from '../../resource/normalize';
import colors from '../../resource/colors';

const styles = StyleSheet.create({
  view: {
    height: scaling.heightScale(35),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaling.widthScale(12),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  ProfileImage: {
    height: scaling.widthScale(23),
    width: scaling.widthScale(23),
    borderRadius: scaling.widthScale(23),
  },
  btnContainer: {
    backgroundColor: 'rgba(39, 131, 243, 0.4)',
  },
  titleView: {
    alignItems: 'center',
    width: scaling.widthScale(200)
  },
  HeaderTxt: {
    color: colors.black,
    fontSize: scaling.normalize(21),
    fontFamily: 'Raleway-SemiBold',
  },
  headerSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    marginRight: scaling.widthScale(7),
  },
  backTouchable: {
    marginRight: scaling.heightScale(5),
  },
  userIconView: {
    height: scaling.widthScale(20),
    width: scaling.widthScale(20),
    borderRadius: scaling.widthScale(20),
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: scaling.widthScale(30),
    height: scaling.widthScale(30),
    color: colors.buttonColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NotificationDotView: {
    backgroundColor: colors.red,
    height: scaling.widthScale(8),
    width: scaling.widthScale(8),
    borderRadius: scaling.widthScale(4),
    position: 'absolute',
    right: scaling.widthScale(5),
    top: scaling.heightScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

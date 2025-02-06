import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import scaling from '../../resource/normalize';

const styles = StyleSheet.create({
  ScrollViewStyle:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    // paddingHorizontal: 20,
    backgroundColor: '#eee',
    alignItems: 'center'
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems:'center',
    // marginTop: 75,
    backgroundColor: '#f5f5f5',
  },
  image:{
    width:520,
    height:310,
  },
  image1:{
    width:60,
    height:60,
    marginStart:10,
    marginTop:5,
   position:'absolute',
   left: 0,
           right: 0,
           top: 0,
           bottom: 0,
  },
  image2:{
    width:60,
    height:60,
    marginEnd:10,
    marginTop:5,
   position:'absolute',
   right: 0,
           right: 0,
           top: 0,
           bottom: 0,
  },
  form: {
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: scaling.heightScale(8),
    // backgroundColor:'#febd59',
    padding: 20,
    borderRadius: 10,
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  inputLabel: {
    fontSize: scaling.normalize(12),
    color: colors.black,
    alignSelf: 'flex-start',
  },
  inputContainer: {paddingHorizontal: 0, width: scaling.widthScale(260)},
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: scaling.heightScale(4),
    borderColor: colors.line,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    width: scaling.widthScale(260),
    // backgroundColor:'#febd59',
  },
  forgetText: {
    color: colors.buttonColor,
    fontSize: scaling.normalize(12),
  },
  button: {
    backgroundColor:'#febd59',
    marginTop: scaling.heightScale(15),
    width: scaling.widthScale(260),
    borderRadius: 5,
  },
  buttonTitle: {
    color: colors.white,
    fontSize: scaling.normalize(14),
  },
  text: {
    color: colors.black,
    fontSize: scaling.normalize(12),
    marginTop: scaling.heightScale(20),
    fontWeight:'bold',
  },
  registerText: {
    color: colors.buttonColor,
    fontSize: scaling.normalize(12),
    fontWeight: '600',
  },
  forget:{
    color: colors.black,
    textAlign:'right',
    color:'black',
  }
});

export default styles;

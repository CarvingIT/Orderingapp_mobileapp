/**
 * central file to support different size screens
 */
import { Dimensions } from 'react-native';
import { width, height } from './device';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const orientation = screenHeight > screenWidth ? 'PORTRAIT' : 'LANDSCAPE';

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = orientation === 'PORTRAIT' ? 320 : 568;
const guidelineBaseHeight = orientation === 'PORTRAIT' ? 568 : 320;

const widthScale = (size) => (width / guidelineBaseWidth) * size;
const heightScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (widthScale(size) - size) * factor;
function normalize(size, factor = 0.5) {
  return size + (widthScale(size) - size) * factor;
}

export default {
  normalize,
  widthScale,
  heightScale,
  moderateScale,
};

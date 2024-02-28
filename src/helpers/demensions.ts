import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {
  moderateScale as MODERATE_SCALE,
  scale as SCALE,
  verticalScale as VERTICAL_SCALE,
} from 'react-native-size-matters';

// Will return a linear scaled result of the provided size, based on your device's screen width. (width)
export const scale = SCALE;

// Will return a linear scaled result of the provided size, based on your device's screen height. (height)
export const verticalScale = VERTICAL_SCALE;

// Sometimes you don't want to scale everything in a linear manner, that's where moderateScale comes in.
// The cool thing about it is that you can control the resize factor (default is 0.5).
// If normal scale will increase your size by +2X, moderateScale will only increase it by +X, for example: (padding)
export const moderateScale = MODERATE_SCALE;

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

// Если есть вырез снизу
export const HAS_NOTCH = DeviceInfo.hasNotch();

// Если есть вырез сверху
export const HAS_ISLAND = DeviceInfo.hasDynamicIsland();

// SIZE
export const NAV_PADDING_VERTICAL = scale(HAS_NOTCH ? 10 : 10);
export const NAV_PADDING_TOP = verticalScale(HAS_NOTCH ? 0 : 5);
export const NAV_PADDING_BOTTOM = verticalScale(HAS_NOTCH ? 30 : 8);
export const NAV_HEIGHT = verticalScale(HAS_NOTCH ? 75 : 65);
export const PADDING_HORIZONTAL = scale(9);

export const CONTENT_PADDING_TOP = verticalScale(HAS_NOTCH ? 0 : 25);
export const CONTENT_PADDING_HORIZONTAL = scale(20);

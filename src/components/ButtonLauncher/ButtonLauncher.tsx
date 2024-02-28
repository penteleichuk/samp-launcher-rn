import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { styles } from './ButtonLauncherStyles';

type ButtonLauncherType = TouchableOpacityProps & {
  hide?: boolean;
  disabled?: boolean;
  IconLeft?: any;
  IconRight?: any;
  btnWidth?: string;
  background?: string;
  children: React.ReactNode;
};

export const ButtonLauncher = React.memo((props: ButtonLauncherType) => {
  const {
    hide = false,
    disabled = false,
    onPress,
    IconLeft,
    IconRight,
    btnWidth = 'auto',
    background = '#a568dc',
  } = props;

  const display = { display: hide ? 'none' : 'flex' } as ViewStyle;
  const backgroundColor = { backgroundColor: background };
  const width = { width: btnWidth };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, backgroundColor, width, display]}>
      {IconLeft && (
        <IconLeft
          style={styles.icon}
          width={verticalScale(17)}
          height={verticalScale(17)}
          fill={'#FFF'}
        />
      )}
      <Text style={styles.text}>{props.children}</Text>
      {IconRight && (
        <IconRight
          style={styles.iconRight}
          width={verticalScale(17)}
          height={verticalScale(17)}
          fill={'#FFF'}
        />
      )}
    </TouchableOpacity>
  );
});

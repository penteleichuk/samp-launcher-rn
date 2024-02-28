import React from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputEndEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { styles } from './InputLauncherStyle';

type InputLauncherType = {
  title?: string;
  placeholder?: string;
  Icon?: any;
  value?: string;
  onChangeText: ((text: string) => void) | undefined;
  onEndEditing?:
    | ((e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void)
    | undefined;
};

export const InputLauncher = React.memo((props: InputLauncherType) => {
  const { placeholder, title, Icon, value, onChangeText, onEndEditing } = props;

  return (
    <View style={styles.input}>
      <TouchableOpacity style={styles.inputOpacity} activeOpacity={1}>
        {title && <Text style={styles.title}>{title}</Text>}
        {Icon && (
          <Icon
            style={styles.icon}
            width={scale(18)}
            height={verticalScale(18)}
            fill={'rgba(255, 255, 255, 0.7)'}
          />
        )}

        <TextInput
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          placeholder={placeholder}
          style={[styles.inputText, Icon ? { paddingLeft: scale(40) } : {}]}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          value={value}
        />
      </TouchableOpacity>
    </View>
  );
});

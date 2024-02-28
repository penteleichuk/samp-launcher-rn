import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-switch';
import { styles } from './SwitchLauncherStyle';

type SwitchLauncherType = {
  title: string;
  value: number;
  onValueChange?: (value: boolean) => void;
};

export const SwitchLauncher = React.memo((props: SwitchLauncherType) => {
  const { title, value, onValueChange } = props;

  return (
    <View style={styles.switch}>
      <Text style={styles.title}>{title}</Text>
      <Switch
        circleSize={24}
        barHeight={31}
        switchLeftPx={2.4}
        switchRightPx={2.4}
        switchWidthMultiplier={2.1}
        backgroundActive={'#575c9b7f'}
        backgroundInactive={'#575c9b7f'}
        circleActiveColor={'#6b8afd'}
        circleInActiveColor={'#b6c4ee7f'}
        circleBorderWidth={0}
        renderActiveText={false}
        renderInActiveText={false}
        changeValueImmediately={true}
        onValueChange={onValueChange}
        value={value === 1}
      />
    </View>
  );
});

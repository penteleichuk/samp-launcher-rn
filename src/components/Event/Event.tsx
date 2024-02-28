import React from 'react';
import { Text } from 'react-native';
import { styles } from './EventStyle';

type EventType = {
  color: 'green' | 'blue' | 'red' | 'orange' | 'light';
  children: React.ReactNode;
};

export const Event = React.memo((props: EventType) => {
  const { color, children } = props;

  return <Text style={[styles.event, styles[color]]}>{children}</Text>;
});

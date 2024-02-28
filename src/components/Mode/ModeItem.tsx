import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './ModeItemStyle';

type ModeItemType = {
  id: number;
  onPress: (value: number) => void;
  text: string;
  color: string[];
  image: ImageSourcePropType;
};

export const ModeItem = React.memo((props: ModeItemType) => {
  const { id, onPress, text, image, color } = props;

  return (
    <TouchableOpacity onPress={() => onPress(id)} style={styles.body}>
      <ImageBackground style={styles.item} resizeMode={'cover'} source={image}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          colors={color}
          style={styles.linear}>
          <Text style={styles.title}>{text}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
});

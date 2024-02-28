import Lottie, { AnimationObject } from 'lottie-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './TabStyle';

type TabType = {
  id: number;
  category: number;
  anims: AnimationObject;
  onPressCategoryHandler: (id: number) => void;
};

export const Tab = React.memo((props: TabType) => {
  const { anims, id, category, onPressCategoryHandler } = props;

  return (
    <TouchableOpacity onPress={() => onPressCategoryHandler(id)}>
      <LinearGradient
        style={[styles.tab, category === id ? styles.active : null]}
        end={{ x: 0.0, y: 1.1 }}
        colors={['#fdc7ff38', '#b045b440']}>
        <Lottie
          style={styles.anim}
          source={anims}
          resizeMode={'cover'}
          autoPlay
          loop
        />
      </LinearGradient>
    </TouchableOpacity>
  );
});

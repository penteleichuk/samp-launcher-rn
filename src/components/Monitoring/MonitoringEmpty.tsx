import Lottie from 'lottie-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Anims from '../../assets/anims';
import { styles } from './MonitoringStyle';

export const MonitoringEmpty = React.memo(() => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.body}>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        colors={['#414673c9', '#262839']}
        style={styles.item}>
        <View style={styles.content}>
          <View style={styles.anims}>
            <Lottie
              style={styles.anim}
              resizeMode="cover"
              source={Anims.Soon}
              autoPlay
              loop
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.subtitle}>CRMP</Text>
            <View style={styles.static}>
              <Text style={styles.online}>Coming soon</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
});

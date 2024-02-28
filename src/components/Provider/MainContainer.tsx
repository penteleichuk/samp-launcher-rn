import React from 'react';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appBackground } from '../../assets/images';
import { PADDING_HORIZONTAL, verticalScale } from '../../helpers/demensions';
import { styles } from '../../styles/MainStyle';
import { AlertProtectedFile } from '../AlertScreen/AlertProtectedFile';
import { AlertSound } from '../AlertScreen/AlertSound';
import { AlertSpace } from '../AlertScreen/AlertSpace';
import { AlertUpdate } from '../AlertScreen/AlertUpdate';
import { AlertUserName } from '../AlertScreen/AlertUserName';

type MainContainerType = {
  children: React.ReactNode;
  image?: boolean;
  paddingHorizontal?: number;
};

export const MainContainer = React.memo((props: MainContainerType) => {
  const {
    children,
    image = true,
    paddingHorizontal = PADDING_HORIZONTAL,
  } = props;

  return (
    <View style={[styles.container]}>
      {image && (
        <LinearGradient
          style={[{ flex: 1 }]}
          end={{ x: 0.0, y: 1.1 }}
          colors={['#00000025', '#3a393e59']}>
          <ImageBackground
            imageStyle={{ opacity: 0.4 }}
            blurRadius={20}
            style={styles.imageBackground}
            source={appBackground}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.wrapper}>
                <View
                  style={[
                    styles.body,
                    { paddingHorizontal: verticalScale(paddingHorizontal) },
                  ]}>
                  <View style={styles.content}>{props.children}</View>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </LinearGradient>
      )}
      {!image && (
        <LinearGradient
          style={[{ flex: 1 }]}
          end={{ x: 0.0, y: 1.0 }}
          colors={['#403E48', '#141318']}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.wrapper}>
              <View style={styles.body}>
                <View style={styles.content}>{children}</View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      )}
      <AlertProtectedFile />
      <AlertSound />
      <AlertUserName />
      <AlertUpdate />
      <AlertSpace />
    </View>
  );
});

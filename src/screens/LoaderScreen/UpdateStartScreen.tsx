import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { DownloadSvg } from '../../assets/svg/index';
import { ButtonLauncher, LoaderContainer } from '../../components';
import { usePermisionFile } from '../../hooks/usePermisionFile';
import { useSpaceDownlload } from '../../hooks/useSpaceDownload';
import { styles } from '../../styles/LoaderStyle';

type InitiationScreenType = NativeStackScreenProps<any>;

// Обновление кеша
export const UpdateStartScreen = React.memo(
  ({ navigation }: InitiationScreenType) => {
    const { fetchPermision } = usePermisionFile();
    const { fetchSpace } = useSpaceDownlload();

    const onPressDownload = () => {
      if (!fetchPermision()) {
        return;
      }

      if (!fetchSpace()) {
        return;
      }

      return navigation.replace('UpdateScreen');
    };

    return (
      <LoaderContainer>
        <Text style={styles.title}>Доступно обновление!</Text>
        <Text style={styles.alert}>
          Нажмите
          <Text style={styles.accent}> обновить</Text>, чтобы подтвердить
          {'\n'} загрузку файлов.
        </Text>
        <View style={styles.buttons}>
          <ButtonLauncher
            btnWidth={'100%'}
            background={'#5476db'}
            IconLeft={DownloadSvg}
            onPress={onPressDownload}>
            Обновить
          </ButtonLauncher>
        </View>
      </LoaderContainer>
    );
  },
);

import React from 'react';
import { Text, View } from 'react-native';
import { InstallSvg } from '../../assets/svg/index';
import { ButtonLauncher, LoaderContainer } from '../../components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { styles } from '../../styles/LoaderStyle';
import { installLauncher } from '../../thunks/launcherTunks';

// Обновление лаунчера (скрин установки)
export const LauncherUpdateScreen = React.memo(() => {
  const dispatch = useAppDispatch();

  const installHandler = React.useCallback(() => {
    dispatch(installLauncher());
  }, []);

  return (
    <LoaderContainer>
      <Text style={[styles.title, styles.titleUppercase]}>
        Обновление лаунчера
      </Text>
      <Text style={styles.alert}>
        Нажмите
        <Text style={styles.accent}> обновить</Text>, чтобы подтвердить
        {'\n'} обновление лаунчера.
      </Text>
      <View style={styles.buttons}>
        <ButtonLauncher
          background={'#5476db'}
          btnWidth={'100%'}
          IconLeft={InstallSvg}
          onPress={installHandler}>
          Обновить
        </ButtonLauncher>
      </View>
    </LoaderContainer>
  );
});

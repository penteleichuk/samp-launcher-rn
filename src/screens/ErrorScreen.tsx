import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { ButtonLauncher, LoaderContainer } from '../components';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { styles } from '../styles/LoaderStyle';
import { fetchInitialApp } from '../thunks/appThunks';
import { setInitial } from './../actions/appActions';

type InitiationScreenType = NativeStackScreenProps<any>;

export const ErrorScreen = React.memo(
  ({ navigation }: InitiationScreenType) => {
    const dispatch = useAppDispatch();

    const reloadHandler = useCallback(() => {
      dispatch(setInitial({ initial: false }));
      dispatch(fetchInitialApp());
      navigation.replace('Initiation');
    }, []);

    return (
      <LoaderContainer>
        <Text style={styles.title}>
          Не удаётся подключиться{'\n'}
          <Text>к ресурсам лаунчера</Text>
        </Text>
        <Text style={styles.alert}>
          Проверьте интернет соединение на устройстве, или попробуйте зайти
          позже.
        </Text>
        <View style={styles.buttons}>
          <ButtonLauncher
            btnWidth={'100%'}
            background={'#5476db'}
            onPress={reloadHandler}>
            Повторить попытку
          </ButtonLauncher>
        </View>
      </LoaderContainer>
    );
  },
);

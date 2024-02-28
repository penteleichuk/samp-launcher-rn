import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { verticalScale } from 'react-native-size-matters';
import { LoaderContainer } from '../components';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectInitial } from '../selectors/appSelectors';
import {
  selectIsSuccessDownload,
  selectRejectCount,
} from '../selectors/loaderSelectors';
import { styles } from '../styles/LoaderStyle';
import { fetchInitialApp } from '../thunks/appThunks';
import { autoUpdateLauncher } from '../thunks/launcherTunks';
const width = Dimensions.get('window').width;

type InitiationScreenType = NativeStackScreenProps<any>;

export const InitiationScreen = React.memo(
  ({ navigation }: InitiationScreenType) => {
    const dispatch = useAppDispatch();
    const isInitial = useAppSelector(selectInitial);
    const isSuccessDownload = useAppSelector(selectIsSuccessDownload);
    const rejectCount = useAppSelector(selectRejectCount);

    useEffect(() => {
      dispatch(fetchInitialApp());
    }, []);

    useEffect(() => {
      if (isInitial) {
        if (rejectCount) {
          if (isSuccessDownload === false && rejectCount) {
            return navigation.replace('DownloadStartScreen');
          }

          if (rejectCount) {
            return navigation.replace('UpdateStartScreen');
          }
        }

        // Обновление лаунчера
        dispatch(autoUpdateLauncher());
      }
    }, [isInitial, isSuccessDownload, rejectCount]);

    useFocusEffect(
      React.useCallback(() => {
        if (isInitial) {
          return navigation.replace('Main');
        }

        return () => {};
      }, [isInitial]),
    );

    return (
      <LoaderContainer>
        <View style={styles.progress}>
          <Text style={styles.starting}>ИДЕТ ЗАГРУЗКА ПРИЛОЖЕНИЯ...</Text>
          <View style={styles.progressPercent}>
            {!isInitial && (
              <Progress.Bar
                style={{ marginTop: 20 }}
                animated={true}
                useNativeDriver={true}
                indeterminate={true}
                borderWidth={0}
                // color={'#222122'}
                color={'#647fd3'}
                unfilledColor={'#2f3545'}
                borderRadius={20}
                height={10}
                width={width - verticalScale(40)}
              />
            )}
          </View>
        </View>
      </LoaderContainer>
    );
  },
);
